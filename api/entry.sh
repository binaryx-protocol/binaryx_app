#!/usr/bin/env bash

#source $(pwd)/.env

echo "Migrations:"
npm run typeorm:migration:run

echo "Running web server"
npm run start
