# Pub/Sub Local Test App

This is a lightweight Node.js application to test Google Pub/Sub locally using the emulator.

## Features
- Initializes topics and subscriptions in Pub/Sub emulator
- Publishes messages with configurable payloads
- Simple REST API to trigger message publishing
- Swagger UI for testing endpoints

## Requirements
- Docker & Docker Compose
- Node.js >= 18
- npm (or yarn)

## Project Structure

```
pubsub-local/
  ├── index.js # Main entry point
  ├── pubsub
    ├── publisher.js # Publishes messages to Pub/Sub
    ├── initializer.js # Initializes topics/subscriptions
  ├── config.js # Topics/subscriptions configuration
  ├── package.json # Node.js project file
  ├── package-lock.json # Exact dependency versions
  ├── .gitignore # Files/folders to ignore in git
  ├── README.md # This file
  └── docker-compose.yaml # Local services setup
```

## Setup

1. Clone the repo:
```bash
git clone https://github.com/nikolakabasaj/gcp-pubsub-publisher
cd pubsub-local
```

Install dependencies:
```bash
npm install
```

Start services with Docker Compose:
```bash
docker compose up
```

Necessary URLs
```
Pub/Sub emulator: localhost:8085
Node app: localhost:3000
Swagger UI: http://localhost:3000/api-docs
```

## Environment Variables

In Docker Compose for the Node app:

```env
PUBSUB_EMULATOR_HOST=pubsub:8085
GOOGLE_CLOUD_PROJECT=test-project
```



