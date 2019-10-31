package com.victormonte.catalog.domain

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "product")
data class Product(
        @Id val id: String,
        val price_in_cents: Int,
        val title: String,
        val description: String,
        val discount: Discount)