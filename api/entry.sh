#!/usr/bin/env bash

echo "cp .env ..."
cp $ENV_FILE $(pwd)/.env
source $(pwd)/.env

echo "Migrations:"
npm run typeorm:migration:run

echo "Running web server"
npm run start
