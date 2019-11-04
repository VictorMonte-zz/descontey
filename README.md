# Descontey

Applications to provide product catalog with discounts.

## Microservices

## Catalog

- Catalog microservice
    - Kotlin
    - Spring Webflux (non-blocking and async)
    - MongoDB (NoSQL)
    - Spring Data Reactive MongoDB (non-blocking back pressure)

Generate file from proto

```
./gradlew generateProto
```

```
./gradlew bootRun
```

## Discount

- Discount
    - NodeJS
    - Typescript
    - MongoDB


Generate file from proto
```
../node_modules/.bin/rxjs-grpc -o grpc-namespaces.ts *.proto
```

```
npm run server
```

## Getting Started

```
docker-compose up -d
```

### Prerequisites

```
Docker
```

### Installing

## Running the tests