package main

import (
	"context"
	"io"
	"log"
	"os"
	"strings"

	cohere "github.com/cohere-ai/cohere-go/v2"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

type MyReader struct {
	io.Reader
	name string
}

func (m *MyReader) Name() string {
	return m.name
}

func main() {
	co := client.NewClient(client.WithToken(os.Getenv("CO_API_KEY")))

	resp, err := co.Datasets.Create(
		context.TODO(),
		&cohere.DatasetsCreateRequest{
			Name:     "embed-dataset",
			Type:     cohere.DatasetTypeEmbedInput,
			Data:     &MyReader{Reader: strings.NewReader(`{"text": "The quick brown fox jumps over the lazy dog"}`), name: "test.jsonl"},
			EvalData: &MyReader{Reader: strings.NewReader(""), name: "a.jsonl"},
		},
	)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", resp)
}
