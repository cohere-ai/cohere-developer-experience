---
title: {{ title }}
slug: {{ slug }}

description: "{{ description }}"
image: "{{ image }}"
keywords: "{{ keywords }}"
---

import { AuthorsContainer } from "../../components/authors-container";
import { CookbookHeader } from "../../components/cookbook-header";

{% if authors -%}
<AuthorsContainer
  authors={[
    {%- for author in authors %}
    {
      name: "{{ author.name }}",
      imageSrc: "https://fern-image-hosting.s3.amazonaws.com/cohere/{{ author.img }}"
    }{{ ", " if not loop.last }}
    {%- endfor %}
  ]}
/>
{% endif %}

<CookbookHeader href="https://github.com/cohere-ai/notebooks/blob/main/{{ cookbook_path }}" />

{{ body }}
