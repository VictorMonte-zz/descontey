package e2e

import com.victormonte.catalog.CatalogApplication
import org.junit.Assert
import org.junit.Ignore
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.util.LinkedMultiValueMap


@Ignore
@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = [CatalogApplication::class])
class GetDiscountIIntegrationTest {

    @Autowired
    lateinit var testRestTemplate: TestRestTemplate

    @LocalServerPort
    private var port: Int = 0

    @Test
    fun should_ReturnOK_When_GetProductsWithDiscount_For_UserId() {
        val headers = LinkedMultiValueMap<String, String>()
        headers.add("x-user-id", "1")

        val result =
                testRestTemplate.exchange(
                        "http://localhost:$port/product",
                        HttpMethod.GET,
                        HttpEntity<Any>(headers),
                        Any::class.java)

        Assert.assertNotNull(result)
        Assert.assertEquals(HttpStatus.OK, result.statusCode)
    }
}