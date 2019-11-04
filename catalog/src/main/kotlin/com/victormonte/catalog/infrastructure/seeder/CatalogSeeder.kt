package com.victormonte.catalog.infrastructure.seeder

import com.victormonte.catalog.domain.Discount
import com.victormonte.catalog.domain.Product
import com.victormonte.catalog.infrastructure.repository.ProductRepository
import org.springframework.boot.CommandLineRunner
import reactor.core.publisher.Flux
import java.util.*


internal fun init(repository: ProductRepository) = CommandLineRunner {

    val discount = Discount(5f, 1250)

    repository.deleteAll().block()

    Flux.just(
            Product(UUID.randomUUID().toString(),"1", 25000, "Death Stranding", "Best Kojima Game", discount),
            Product(UUID.randomUUID().toString(), "2", 25000, "Cyberpunk 2077", "Futuristic Game", discount),
            Product(UUID.randomUUID().toString(), "3", 25000, "Ghost of Tsushima", "Samurai Game - Hard Core", discount)
    ).flatMap { repository.save(it) }
            .thenMany(repository.findAll())
            .subscribe { println(it) }
}