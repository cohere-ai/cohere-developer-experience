import yaml
import nbformat
from pathlib import Path
from nbconvert import MarkdownExporter
from jinja2 import Environment, FileSystemLoader
import frontmatter 
import re
from base64 import b64encode


BASE_PATH = Path(__file__).resolve().parents[3]
COOKBOOKS_PATH = BASE_PATH / "fern/pages/cookbooks"
BUILD_COOKBOOKS_PATH = BASE_PATH / "scripts/build-cookbooks"
REGISTRY_FILE = BUILD_COOKBOOKS_PATH / "registry.yaml"
AUTHORS_FILE = BUILD_COOKBOOKS_PATH / "authors.yaml"
TEMPLATES_PATH = BUILD_COOKBOOKS_PATH / "templates"
MARKDOWN_IMAGE_IMPORT_PATTERN = re.compile(r"!\[(.*?)\]\((.*?)\)")
TITLE_PATTERN = re.compile(r"(?m)^#\s.*\n", re.MULTILINE)
SCRIPT_PATTERN = re.compile(r"<script.*?</script>", re.DOTALL)


def _format_bytes_as_base64(data: bytes) -> str:
    return b64encode(data).decode("utf-8")

env = Environment(loader=FileSystemLoader(TEMPLATES_PATH))
template = env.get_template('cookbook.md') 

def _post_process(body: str, resources: dict[str]) -> str:
    """Perform any transformations to the generated body Markdown."""
    
    body = re.sub(TITLE_PATTERN, "", body, count=1)
    body = re.sub(SCRIPT_PATTERN, "", body)

    # Convert the image data to base64 encoded strings
    outputs = resources["outputs"]
    pngs = [k for k in outputs.keys() if k.endswith(".png")]
    png_src_dict = {
        k: f"data:image/png;base64,{_format_bytes_as_base64(outputs[k])}" for k in pngs
    }

    # Replace markdown image links with img tags that include the appropriate base64 data
    for k, v in png_src_dict.items():
        body = body.replace(k, v)

    # Format as img tags
    def _sub(match):
        alt, src = match.groups()
        html = f'<img alt="png" src="{src}" alt="{alt}"/>'
        return html

    body = re.sub(MARKDOWN_IMAGE_IMPORT_PATTERN, _sub, body)

    return body

def build_cookbooks():
    with open(REGISTRY_FILE, 'r') as file:
        registry = yaml.safe_load(file)
        
        
    # Open author metadata DB
    with open(AUTHORS_FILE, "r") as f:
        _authors: dict[dict] = yaml.safe_load(f)

    md_exporter = MarkdownExporter()

    for entry in registry:
        if not entry.get("publish", True):
            continue
        
        author_email_list = entry.get("authors", list())
        authors = [
            dict(
                name=_authors[email]["name"],
                img=_authors[email]["img"],
                email=email,
            )
            for email in author_email_list
            if email in _authors
        ]

        notebook_path = BASE_PATH / entry["path"]
        with open(notebook_path, 'r') as f:
            notebook_content = nbformat.read(f, as_version=4)
        body, resources = md_exporter.from_notebook_node(notebook_content)
        
        # Post-process content
        body = _post_process(body, resources)

        slug = f"/page/{entry['slug']}"
        output_file_path = COOKBOOKS_PATH / f"{entry['slug']}.mdx"

        if output_file_path.exists():
            with open(output_file_path, 'r', encoding='utf-8') as file:
                post = frontmatter.load(file)
            existing_metadata = post.metadata
        else:
            existing_metadata = {}

        # Prepare data for rendering the template
        body_data = {
            'title': entry.get('title', existing_metadata.get('title', 'Default Title')),
            'slug': slug,
            'description': entry.get('description', existing_metadata.get('description', '')),
            'image': entry.get('image', existing_metadata.get('image', '')),
            'keywords': entry.get('keywords', existing_metadata.get('keywords', '')),
            'body': body,
            'authors': authors,
            'cookbook_path': entry.get('path', '')
        }

        # Render the template with the data
        content = template.render(body_data)

        # Ensure the directory exists
        output_file_path.parent.mkdir(parents=True, exist_ok=True)

        # Write to file
        with open(output_file_path, 'w', encoding='utf-8') as file:
            file.write(content)

if __name__ == "__main__":
    build_cookbooks()
