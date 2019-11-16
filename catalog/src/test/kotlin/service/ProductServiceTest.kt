package service

import com.victormonte.catalog.domain.Discount
import com.victormonte.catalog.domain.Product
import com.victormonte.catalog.infrastructure.repository.ProductRepository
import com.victormonte.catalog.service.DiscountService
import com.victormonte.catalog.service.ProductService
import junit.framework.Assert.assertEquals
import org.junit.Before
import org.junit.Test
import org.mockito.ArgumentMatchers
import org.mockito.Mockito
import org.mockito.Mockito.mock
import reactor.core.publisher.Flux
import java.util.*
import kotlin.collections.ArrayList

class ProductServiceTest {

    private lateinit var productService: ProductService

    private lateinit var productRepository: ProductRepository

    private lateinit var discountService: DiscountService

    @Before
    fun setup() {

        productRepository = mock(ProductRepository::class.java)
        discountService = mock(DiscountService::class.java)

        productService = ProductService(productRepository, discountService)
    }

    @Test
    fun should_ReturnDiscountPorcent_When_GetProductDiscount() {

        val expectedDiscount = discount.Discount.GetDiscountReply.newBuilder().setPorcent(5f).setValueInCents(1250).build()

        val discountDefault = Discount(pct = 0f, value_in_cents = 0)
        val product = Product(
                _id = UUID.randomUUID().toString(),
                id = "1",
                priceInCents = 25000,
                description = "Kill giants and then regret yourself",
                title = "Shadow of the Colossus",
                discount = discountDefault)

        Mockito.`when`(productRepository.findAll()).thenReturn(Flux.just(product))
        Mockito.`when`(discountService.get("1", "1")).thenReturn(expectedDiscount)

        val result = productService.get("1").blockFirst()

        assertEquals(expectedDiscount.porcent, result.discount.pct)

    }

    @Test
    fun should_ReturnValueInCentsDiscount_When_GetProductDiscount() {

        val expectedDiscount = discount.Discount.GetDiscountReply.newBuilder().setPorcent(5f).setValueInCents(1250).build()

        val discountDefault = Discount(pct = 0f, value_in_cents = 0)
        val product = Product(
                _id = UUID.randomUUID().toString(),
                id = "1",
                priceInCents = 25000,
                description = "Kill giants and then regret yourself",
                title = "Shadow of the Colossus",
                discount = discountDefault)

        Mockito.`when`(productRepository.findAll()).thenReturn(Flux.just(product))
        Mockito.`when`(discountService.get("1", "1")).thenReturn(expectedDiscount)

        val result = productService.get("1").blockFirst()

        assertEquals(expectedDiscount.valueInCents, result.discount.value_in_cents)

    }

    @Test
    fun should_ReturnThreeProducts_When_GetProduct_For_User() {

        val expectedProductCount = 3

        val products = getFakeProducts(expectedProductCount)
        val discount = discount.Discount.GetDiscountReply.newBuilder().setPorcent(5f).setValueInCents(1250).build()
        Mockito.`when`(productRepository.findAll()).thenReturn(Flux.fromIterable(products))
        Mockito.`when`(discountService.get(ArgumentMatchers.anyString(), ArgumentMatchers.anyString())).thenReturn(discount)

        val result = productService.get("1")

        assertEquals(expectedProductCount.toString(), result.count().block().toString())

    }

    private fun getFakeProducts(expectedProductCount: Int): ArrayList<Product> {
        val products = ArrayList<Product>()
        val discountDefault = Discount(pct = 0f, value_in_cents = 0)
        for (id in 1..expectedProductCount) {

            val product = Product(
                    _id = UUID.randomUUID().toString(),
                    id = id.toString(),
                    priceInCents = id * 250,
                    description = "Description" + id.toString(),
                    title = "Game" + id.toString(),
                    discount = discountDefault)

            products.add(product)
        }
        return products
    }
}