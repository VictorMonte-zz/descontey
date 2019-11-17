import { Controller, OnModuleInit, Logger } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { GetDiscountQuery as GetDiscountQuery } from "../../application/query/getDiscountQuery";
import { GetDiscountService } from "../../application/service/discounts.service";
import { GetDiscountRequest } from "../grpc/getDiscountRequest";
import { GetDiscountReply } from "../grpc/getDiscountReply";

@Controller()
export class DiscountController implements OnModuleInit {
    
    private readonly logger = new Logger(DiscountController.name);

    constructor(private readonly getDiscountService: GetDiscountService){ }

    onModuleInit() { }

    @GrpcMethod('DiscountService', 'Get')
    async Get(request: GetDiscountRequest): Promise<GetDiscountReply> {

        const command = new GetDiscountQuery(request.userId, request.productId);

        this.logger.log("Requesting discount for user " + command.getUserId() + " and product " + command.getProductId());

        const result =  await this.getDiscountService.get(command);

        this.logger.log("Responding with " + result.porcent + " discount and " + result.valueInCents + " value in cents");

        return { porcent: result.porcent, valueInCents: result.valueInCents };
    }
}