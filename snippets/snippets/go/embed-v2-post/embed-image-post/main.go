package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	cohere "github.com/cohere-ai/cohere-go/v2"
	"github.com/cohere-ai/cohere-go/v2/client"
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

	co := client.NewClient(client.WithToken(os.Getenv("CO_API_KEY")))

	embed, err := co.V2.Embed(
		context.TODO(),
		&cohere.V2EmbedRequest{
			Images:         []string{imageBase64},
			Model:          "embed-v4.0",
			InputType:      cohere.EmbedInputTypeImage,
			EmbeddingTypes: []cohere.EmbeddingType{cohere.EmbeddingTypeFloat},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", embed)
}
