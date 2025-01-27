# Go-React App

This repository contains a web application built with React for the frontend and Go (Golang) for the backend.

## Features

- **React**: A JavaScript library for building user interfaces.
- **Golang**: A statically typed, compiled programming language designed for simplicity and efficiency.
- **REST API**: Backend services are exposed via RESTful endpoints.
- **Docker**: Containerized application for easy deployment.
- **PostgreSQL**: Database.

## Prerequisites

- Node.js
- Go (Golang)
- Docker (optional)

## Getting Started

### Backend (Go)

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Install dependencies:
    ```sh
    go mod tidy
    ```
3. Run the server:
    ```sh
    go run main.go
    ```

### Frontend (React)

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm start
    ```

## Docker

To run the application using Docker:

1. Build the Docker images:
    ```sh
    docker-compose build
    ```
2. Start the containers:
    ```sh
    docker-compose up
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.