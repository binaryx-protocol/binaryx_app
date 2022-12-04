#!/usr/bin/env bash

echo "Creating symlink from shared/.env to /app/.env"
cp $ENV_FILE $(pwd)/.env

echo "Running web server"
npm run start
