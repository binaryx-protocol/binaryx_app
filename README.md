#Binaryx Official Repository

https://binaryx.com/

_(Development in progress)_

### Dev

```sh
cp .env.example .env
docker-compose up
docker-compose exec web yarn lint
docker-compose exec web yarn test
docker-compose exec web yarn test:request
docker-compose exec web yarn build
docker run -it -v $PWD:/e2e -w /e2e --entrypoint=cypress cypress/included:10.0.3 run --config-file cypress.docker.config.ts
```

### Useful commands

Nest CLI:
```
docker-compose exec web yarn nest -- --help
```

TypeORM CLI:
```
docker-compose exec web yarn typeorm -- --help
```

