#!/usr/bin/env bash
docker run -p 49131:8080 -e API_URL=http://localhost:8080/api-docs.json -d swaggerapi/swagger-ui
