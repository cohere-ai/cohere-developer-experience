import cohere
import requests
import base64

co = cohere.ClientV2()

image = requests.get("https://cohere.com/favicon-32x32.png")
stringified_buffer = base64.b64encode(image.content).decode("utf-8")
content_type = image.headers["Content-Type"]
image_base64 = f"data:{content_type};base64,{stringified_buffer}"

image_inputs = [
    {
        "content": [
            {
                "type": "image_url",
                "image_url": {"url": image_base64}
            }
        ]
    }
]

response = co.embed(
    model="embed-v4.0",
    input_type="image",
    embedding_types=["float"],
    inputs=image_inputs
)

print(response)
