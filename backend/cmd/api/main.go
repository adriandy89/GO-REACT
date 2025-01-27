package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8080

type application struct {
	Domain string
}

func main() {
	// set application configuration
	var app application

	// read from command line arguments

	// connect to database

	app.Domain = "http://localhost:8080"
	log.Printf("Starting server on %s", app.Domain)

	// register routes
	http.HandleFunc("/", Hello)

	// start web server
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		fmt.Println("server failed to start")
		log.Fatal(err)
	}
}
