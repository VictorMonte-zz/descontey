package com.victormonte.catalog.controller

import com.victormonte.catalog.domain.Product
import com.victormonte.catalog.service.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux

@RestController
@RequestMapping("product")
class ProductController @Autowired constructor(var productService: ProductService) {

    @GetMapping
    fun get(@RequestHeader("x-user-id") userId: String): ResponseEntity<Flux<Product>> {

        val products = productService.get(userId)

        return ResponseEntity(products, HttpStatus.OK)
    }

}