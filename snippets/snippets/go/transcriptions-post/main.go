//go:build ignore
// +build ignore

package main

import (
	"context"
	"log"
	"os"

	audio "github.com/cohere-ai/cohere-go/v2/audio"
	client "github.com/cohere-ai/cohere-go/v2/client"
)

func main() {
	co := client.NewClient(client.WithToken(os.Getenv("CO_API_KEY")))

	file, err := os.Open("./sample.wav")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	transcription, err := co.Audio.Transcriptions.Create(
		context.TODO(),
		file,
		&audio.TranscriptionsCreateRequest{
			Model:    "cohere-transcribe-03-2026",
			Language: "en",
		},
	)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("%+v", transcription)
}
