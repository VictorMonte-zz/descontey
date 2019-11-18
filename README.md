# Descontey

Reactive Microservices to get products with discounts.

## Microservices

You can check details in the links bellow:

[Catalog Microservice](https://github.com/VictorMonte/descontey/tree/master/catalog)

[Discount Microservice](https://github.com/VictorMonte/descontey/tree/master/discount)

### Archicture and Decisions

Before all, business specification said that these microservices must be more resilient and partition tolerant than consistent (AP), following CAP theorem.

![alt text](https://miro.medium.com/max/888/1*WPnv_6sG9k4oG3S1A09MDA.jpeg)

They're all about returning products and if possible discounts.

So, with that in mind, I chose some technnologies as:

- MongoDB
As no demands for ACID operations, only reading/querying operations, Mongo is a great choise.
With it I can escalate easily, have a dinamyc structure to hold my data since its schemaless and also achieve reactive stack with, for example, Spring WebFlux to incresae my reading performance.

- Kotlin and Spring Webflux
For *catalog microservice*. Considering that Kotlin is under JVM (solid/robust fundations) is ideal for a core application, also I could achieve resilience through *Hystrix*(Relisilient netflix lib) and reactive calls with Spring WebFlux.

- NodeJS, Typescript, NestJS
Since *discount microservice* is more flexible I chose Typescript, considering that I would work with mostly JS developers, so TS would give softier transition for all and guarantee no problems with mathematic precisions.
NestJS is a progressive framework for TS world, it helps me with some very imporant features, as IoC, Grpc, Testing, considering TS being a typed language.

- GRPC and Docker
As requested communication between microservices as resolved through grpc. Also, Nestjs has a module to make it easier generate files from protos, bind ts classes and consolidate in a "grpc controller".

### Prerequisites

```
Docker
```

## Getting Started

```
docker-compose up --build -d
```

## Testing

```
curl -X GET \
  http://localhost:8080/product \
  -H 'Accept: */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Host: localhost:8080' \
  -H 'Postman-Token: 29845267-9f33-447f-ba00-f5917bb4e3e6,75af540b-e7cf-461b-9fbb-e3a7e8ef0a24' \
  -H 'User-Agent: PostmanRuntime/7.11.0' \
  -H 'accept-encoding: gzip, deflate' \
  -H 'cache-control: no-cache' \
  -H 'x-user-id: 1'
```

### To Improve

- Service Mesh (Envoy Istio)
- Kubernetes
- ELK
- Cloud configuration
- Unit Tests
- E2E
- Test Coverage
- CI/CD