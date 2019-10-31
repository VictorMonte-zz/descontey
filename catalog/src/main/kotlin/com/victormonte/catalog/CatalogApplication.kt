package com.victormonte.catalog

import com.victormonte.catalog.infrastructure.repository.ProductRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@SpringBootApplication
@EnableReactiveMongoRepositories
class CatalogApplication

@Autowired
lateinit var productRepository: ProductRepository

fun main(args: Array<String>) {
	runApplication<CatalogApplication>(*args)
}
