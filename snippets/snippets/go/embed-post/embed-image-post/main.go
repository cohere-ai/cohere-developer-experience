package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"io"
	"log"
	"net/http"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	// Fetch the image
	resp, err := http.Get("https://cohere.com/favicon-32x32.png")
	if err != nil {
		log.Println("Error fetching the image:", err)
		return
	}
	defer resp.Body.Close()

	// Read the image content
	buffer, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("Error reading the image content:", err)
		return
	}

	stringifiedBuffer := base64.StdEncoding.EncodeToString(buffer)
	contentType := resp.Header.Get("Content-Type")
	imageBase64 := fmt.Sprintf("data:%s;base64,%s", contentType, stringifiedBuffer)

	co := client.NewClient(client.WithToken("<<apiKey>>"))

	embed, err := co.Embed(
		context.TODO(),
		&cohere.EmbedRequest{
			Images:         []string{imageBase64},
			Model:          cohere.String("embed-english-v3.0"),
			InputType:      cohere.EmbedInputTypeImage.Ptr(),
			EmbeddingTypes: []cohere.EmbeddingType{cohere.EmbeddingTypeFloat},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", embed)
}
