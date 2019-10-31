package com.victormonte.catalog.service

import com.victormonte.catalog.domain.Product
import com.victormonte.catalog.infrastructure.repository.ProductRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

@Service
class ProductService(val productRepository: ProductRepository) {

    fun get(userId: String) : Flux<Product> {
        return productRepository.findAll()
    }
}
