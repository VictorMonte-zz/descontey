# Catalog Microservice

## Stack

- Catalog microservice
    - Kotlin
    - Spring Webflux (non-blocking and async)
    - MongoDB (NoSQL)
    - Spring Data Reactive MongoDB (non-blocking back pressure)
    - Hystrix (Circuit Breaker)

## Build and Run

```
./gradlew generateProto
```

```
./gradlew bootRun
```