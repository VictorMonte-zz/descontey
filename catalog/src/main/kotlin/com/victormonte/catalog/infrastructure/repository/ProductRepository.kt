package com.victormonte.catalog.infrastructure.repository

import com.victormonte.catalog.domain.Discount
import com.victormonte.catalog.domain.Product
import org.springframework.boot.CommandLineRunner
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import java.util.*

@Repository
interface ProductRepository: ReactiveCrudRepository<Product, String>

internal fun init(repository: ProductRepository) = CommandLineRunner {

    val discount = Discount(5f, 1250)

    Flux.just(
            Product(UUID.randomUUID().toString(), 25000, "Death Stranding", "Best Kojima Game", discount),
            Product(UUID.randomUUID().toString(), 25000, "Cyberpunk 2077", "Futuristic Game", discount),
            Product(UUID.randomUUID().toString(), 25000, "Ghost of Tsushima", "Samurai Game - Hard Core", discount)
    ).flatMap { repository.save(it) }
            .thenMany(repository.findAll())
            .subscribe { println(it) }
}