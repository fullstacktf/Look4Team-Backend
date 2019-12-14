#!/bin/bash

cd docker && \
docker run --rm -d backend jeramdev/backend && \
docker-compose up