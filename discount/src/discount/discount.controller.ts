import { Controller, OnModuleInit, Get } from "@nestjs/common";
import { GrpcMethod, Client, ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { grpcClientOptions } from '../grpc-client-options';

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
    
    onModuleInit() {
        
    }

    @GrpcMethod('DiscountService', 'Get')
    Get(data: GetDiscountRequest): GetDiscountReply {
        return { porcent: 1, valueInCents: 1 };
    }
}