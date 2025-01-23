import os
import re
from pathlib import Path
import black

DEFAULT_LINE_LENGTH = 70
BASE_DIR = Path(__file__).resolve().parent
MDX_DIR = BASE_DIR / "../../fern/pages"
FILE_PATTERN = re.compile(r"\.mdx$")
EXCLUDE_DIRS = ["cookbooks"]  # Add directory names to exclude


def find_files_by_pattern(directory, pattern, exclude_dirs=None):
    """
    Finds all files in the given directory that match the provided regex pattern.
    Skips directories listed in exclude_dirs.
    """
    exclude_dirs = exclude_dirs or []
    directory = Path(directory).resolve()

    if not directory.is_dir():
        raise ValueError(f"Provided directory {directory} is not valid.")

    matching_files = []
    for root, dirs, files in os.walk(directory):
        # Remove excluded directories from the walk
        dirs[:] = [d for d in dirs if d not in exclude_dirs]

        for file_name in files:
            file_path = Path(root) / file_name
            if pattern.search(file_name):
                matching_files.append(file_path)

    return matching_files


def format_python_snippets_in_mdx(file_path, line_length=DEFAULT_LINE_LENGTH):
    """
    Formats Python code snippets inside MDX files using Black.
    """
    black_mode = black.FileMode(line_length=line_length)
    code_block_pattern = re.compile(r"(`{3,4})(python|python PYTHON)\n(.*?)\n\1", re.DOTALL)

    with open(file_path, 'r', encoding='utf-8') as file:
        original_content = file.read()

    def format_with_black(match):
        """
        Formats the matched Python code block using Black
        """
        backtick_count = match.group(1)  # Preserve the backtick count (``` or ````)
        block_label = match.group(2)  # Capture the label (python or python PYTHON)
        code = match.group(3)

        # Comment out lines starting with '!' or '%' for formatting
        processed_code = re.sub(r"^\s*(!|%)(.*)", r"# TEMP_COMMENT_\1\2", code, flags=re.MULTILINE)

        # Format the processed code using Black
        try:
            formatted_code = black.format_str(processed_code, mode=black_mode)
        except black.NothingChanged:
            return match.group(0)  # Return the original block if nothing changed

        # Revert the temporary comments back to their original form
        reverted_code = re.sub(r"^\s*# TEMP_COMMENT_(!|%)(.*)", r"\1\2", formatted_code, flags=re.MULTILINE)

        # Return the fully formatted and reverted block
        return f"{backtick_count}{block_label}\n{reverted_code.strip()}\n{backtick_count}"

    new_content = code_block_pattern.sub(format_with_black, original_content)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(new_content)

    return original_content, new_content


def process_mdx_files(directory, file_pattern, exclude_dirs=None, line_length=DEFAULT_LINE_LENGTH, check_changes=False):
    """
    Processes all MDX files in the directory, formatting Python code snippets.

    Args:
        directory (Path or str): Path to the directory containing MDX files.
        file_pattern (re.Pattern): Regex pattern to match MDX files.
        exclude_dirs (list): List of directories to exclude.
        line_length (int): Line length to use for Black formatting.
        check_changes (bool): If True, raises an exception if changes are detected.
    """
    matching_files = find_files_by_pattern(directory, file_pattern, exclude_dirs)
    files_changed = []

    for file_path in matching_files:
        original_content, new_content = format_python_snippets_in_mdx(file_path, line_length)

        if original_content != new_content:
            files_changed.append(file_path)

    if check_changes and files_changed:
        raise RuntimeError(
            f"The following files were modified during the run:\n"
            + "\n".join(str(file) for file in files_changed)
        )


if __name__ == "__main__":
    import sys

    path = sys.argv[1] if len(sys.argv) > 1 else MDX_DIR
    line_length = int(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_LINE_LENGTH
    check_changes = os.getenv("CI") == "true"  # Set to True in CI pipeline

    if Path(path).is_dir():
        process_mdx_files(path, FILE_PATTERN, EXCLUDE_DIRS, line_length, check_changes)
    elif Path(path).is_file():
        if FILE_PATTERN.search(path):
            process_mdx_files(Path(path).parent, FILE_PATTERN, EXCLUDE_DIRS, line_length, check_changes)
        else:
            print("The specified file does not match the MDX pattern.")
    else:
        print("Provided path is not valid.")
