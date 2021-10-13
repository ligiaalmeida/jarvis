#!/bin/bash

if [ $1 == "--dev" ]; then

  echo "Iniciando ambiente de desenvolvimento..."

  echo "Desconstruindo containers, caso existam..."
  docker-compose down

  echo "Construindo containers de desenvolvimento..."
  docker-compose up -d --build

fi
