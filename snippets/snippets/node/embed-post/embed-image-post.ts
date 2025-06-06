const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({});

(async () => {
  const image = await fetch('https://cohere.com/favicon-32x32.png');
  const buffer = await image.arrayBuffer();
  const stringifiedBuffer = Buffer.from(buffer).toString('base64');
  const contentType = image.headers.get('content-type');
  const imageBase64 = `data:${contentType};base64,${stringifiedBuffer}`;

  const embed = await cohere.embed({
    model: 'embed-v4.0',
    inputType: 'image',
    embeddingTypes: ['float'],
    images: [imageBase64],
  });
  console.log(embed);
})();
