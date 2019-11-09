# Descontey

Reactive Microservices to get products with discounts.

## Microservices

[Catalog Microservice](https://github.com/VictorMonte/descontey/tree/master/catalog)

[Discount Microservice](https://github.com/VictorMonte/descontey/tree/master/discount)

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