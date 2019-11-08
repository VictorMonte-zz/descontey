import user from "../../infrastructure/dataModel/User";

class GetDiscountCommand {
    private userId: String;
    private productId: String;

    constructor(userId: String, productId: String) {
        this.userId = userId;
        this.productId = productId
    }

    getUserId(): String {
        return this.userId;
    }

    getProductId(): String {
        return this.productId;
    }
}

export default GetDiscountCommand;