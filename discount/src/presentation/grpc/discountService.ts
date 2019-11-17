import { Observable } from "rxjs";

export interface DiscountService {
    get(data: {
        userId: number;
        productId: number;
    }): Observable<any>;
}
