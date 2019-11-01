# Descontey

Applications to provide product catalog with discounts.

## Microservices

## Catalog

- Catalog microservice
    - Kotlin
    - Spring Webflux (non-blocking and async)
    - MongoDB (NoSQL)
    - Spring Data Reactive MongoDB (non-blocking back pressure)

## Discount

- Discount
    - ???

```
npm start
```

### Decisions

Following CAP theorem, catalog and descount microservice will be AP.

They'll be partition tolerance and highly available, as mentioned by business case documentation.

Catalog api must be up 100% of the time, even if descount microservice collapse.
Also it may be a service responsable for only read operations.

Leading us to a possible NoSQL as MongoDB (document structured NoSQL).

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