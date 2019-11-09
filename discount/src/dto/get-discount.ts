export class GetDiscountDto {

    constructor(private userId: String, private productId: String) { }

    getUserId(): String {
        return this.userId;
    }

    getProductId(): String {
        return this.productId;
    }

}