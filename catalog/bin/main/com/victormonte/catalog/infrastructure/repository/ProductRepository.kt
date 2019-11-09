package com.victormonte.catalog.infrastructure.repository

import com.victormonte.catalog.domain.Product
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository: ReactiveCrudRepository<Product, String>