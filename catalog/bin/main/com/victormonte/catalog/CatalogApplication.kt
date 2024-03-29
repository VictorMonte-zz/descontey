package com.victormonte.catalog

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@SpringBootApplication
@EnableReactiveMongoRepositories
@EnableCircuitBreaker
class CatalogApplication

	fun main(args: Array<String>) {
		runApplication<CatalogApplication>(*args)
	}


