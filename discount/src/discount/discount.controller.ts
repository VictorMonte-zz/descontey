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
    async Get(request: GetDiscountRequest): Promise<GetDiscountReply> {

        const command = new GetDiscountQuery(request.userId, request.productId);
        const result =  await this.getDiscountService.get(command);

        console.log(result);

        return { porcent: result.porcent, valueInCents: result.valueInCents };
    }
}