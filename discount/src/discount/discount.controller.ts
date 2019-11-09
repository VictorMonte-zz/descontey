import { Controller, OnModuleInit } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { GetDiscountService } from "src/service/discounts.service";
import { GetDiscountQuery as GetDiscountQuery } from "src/query/getDiscountQuery";

export interface DiscountService {
    get(data: { userId: number, productId: number }): Observable<any>;
}

export interface GetDiscountRequest {
    userId: string,
    productId: string
}

export interface GetDiscountReply {
    porcent: number,
    valueInCents: number
}

@Controller()
export class DiscountController implements OnModuleInit {
    
    constructor(private readonly getDiscountService: GetDiscountService){ }

    onModuleInit() { }

    @GrpcMethod('DiscountService', 'Get')
    Get(request: GetDiscountRequest): GetDiscountReply {

        let command = new GetDiscountQuery(request.userId, request.productId);
        this.getDiscountService.get(command);

        return { porcent: 1, valueInCents: 1 };
    }
}