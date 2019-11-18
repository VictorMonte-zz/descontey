package com.victormonte.catalog.service

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand
import discount.Discount
import discount.DiscountServiceGrpc
import io.grpc.ManagedChannelBuilder
import org.springframework.stereotype.Service

@Service
class DiscountService {

    @HystrixCommand(fallbackMethod = "getDefaultDiscount")
    fun get(userId: String, productId: String): Discount.GetDiscountReply? {

        val result: Discount.GetDiscountReply?
        val channel = ManagedChannelBuilder
                        .forAddress("discount", 50051)
                        .usePlaintext()
                        .build()
        try {

            val discountServiceGrpc = DiscountServiceGrpc.newBlockingStub(channel)

            val request = Discount.GetDiscountRequest
                    .newBuilder()
                    .setUserId(userId)
                    .setProductId(productId)
                    .build()

            result = discountServiceGrpc.get(request)

        } finally {
            channel.shutdownNow()
        }

        return result
    }

    fun getDefaultDiscount(userId: String, productId: String): Discount.GetDiscountReply? {
        return Discount
                .GetDiscountReply
                .newBuilder()
                .setPorcent(0f)
                .setValueInCents(0)
                .build()
    }
}