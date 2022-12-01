#!/usr/bin/env bash

echo "Creating symlink from shared/.env to /app/.env"
cp $ENV_FILE $(pwd)/.env
#source $(pwd)/.env

echo "Running web server"
service nginx start
npm run start -- -p 3000
