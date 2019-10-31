# Descontey

Applications to provide product catalog with discounts.

## Architecture

### Stack

- Catalog microservice
    - Kotlin
    - Spring Webflux (non-blocking and async)
    - MongoDB (NoSQL)
    - Spring Data Reactive MongoDB (non-blocking back pressure)
- Discount
    - ???

### Decisions

Following CAP theorem, catalog and descount microservice will be AP.

They'll be partition tolerance and highly available, as mentioned by business case documentation.

Catalog api must be up 100% of the time, even if descount microservice collapse.
Also it may be a service responsable for only read operations.

Leading us to a possible NoSQL as MongoDB (document structured NoSQL).

## Getting Started

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system