#!/bin/bash

cd docker && \
docker pull jeramdev/backend:latest && \
docker-compose up -d