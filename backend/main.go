package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// Load config file into environment variables
	err := godotenv.Load()
	panicIfErr(err)
	logFileName := os.Getenv("LOG_FILE")
	if logFileName == "" {
		logFileName = "server.log"
	}
	// Set up logger
	file, err := os.OpenFile(logFileName, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
	panicIfErr(err)
	log.SetOutput(file)

}

func panicIfErr(err error) {
	if err != nil {
		log.Fatal(err)
		panic(err)
	}
}
