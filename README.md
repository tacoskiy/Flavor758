# Flavor758

A Django project created for TechJam named "Flavor758".

## Environment

* Django (backend)
* Next.js (frontend)
* PostgreSQL (DB)

## Prerequisites

* Obtain the `.env` file from the team leader and place it in the project root.

## How to use

### Build containers and database (only first time)

```bash
make build
```

This runs `docker-compose up --build --remove-orphans` and builds the containers.

### Start containers (after the first build)

```bash
make up
```

Starts the containers in detached mode.

### Shut down containers

```bash
make down
```

Stops and removes all containers defined in the `docker-compose.yml`.

---

## Notes

* The backend Django API is accessible at [http://localhost:8000](http://localhost:8000).
* The frontend Next.js app runs at [http://localhost:3000](http://localhost:3000).
* PostgreSQL runs as a service in Docker, no separate install needed.

---
