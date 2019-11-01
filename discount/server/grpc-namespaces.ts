import * as grpc from 'grpc';
import { Observable } from 'rxjs';
/** Namespace discount. */
export namespace discount {

    /** Contains all the RPC service clients. */
    export interface ClientFactory {

        /**
         * Returns the DiscountService service client.
         */
        getDiscountService(): discount.DiscountService;
    }

    /** Builder for an RPC service server. */
    export interface ServerBuilder {

        /**
         * Adds a DiscountService service implementation.
         * @param impl DiscountService service implementation
         */
        addDiscountService(impl: discount.DiscountService): discount.ServerBuilder;
    }

    /** Constructs a new DiscountService service. */
    export interface DiscountService {

        /**
         * Calls Get.
         * @param request GetDiscountRequest message or plain object
         * @param metadata Optional metadata
         * @returns Promise
         */
        get(request: discount.GetDiscountRequest, metadata?: grpc.Metadata): Observable<discount.GetDiscountReply>;
    }

    /** Properties of a GetDiscountRequest. */
    export interface GetDiscountRequest {

        /** GetDiscountRequest userId */
        userId?: (string|null);

        /** GetDiscountRequest productId */
        productId?: (string|null);
    }

    /** Properties of a GetDiscountReply. */
    export interface GetDiscountReply {

        /** GetDiscountReply porcent */
        porcent?: (string|null);

        /** GetDiscountReply valueInCents */
        valueInCents?: (string|null);
    }
}
