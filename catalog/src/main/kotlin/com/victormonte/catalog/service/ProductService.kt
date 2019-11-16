package com.victormonte.catalog.service

import com.victormonte.catalog.domain.Product
import com.victormonte.catalog.infrastructure.repository.ProductRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

@Service
class ProductService(private val productRepository: ProductRepository,
                     private val discountService: DiscountService) {

    fun get(userId: String) : Flux<Product> {

        return productRepository
                .findAll()
                .map {
                    var discount = discountService.get(userId, it.id)
                    Product(
                            it._id,
                            it.id,
                            it.priceInCents,
                            it.title,
                            it.description,
                            com.victormonte.catalog.domain.Discount(discount!!.porcent, discount.valueInCents))
                }

    }
}
