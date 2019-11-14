import Discount from "../../domain/discount";

class GetDiscountResponse {
    porcent: number;
    valueInCents: number;

    constructor(discount: Discount) {
        this.porcent = discount.getPorcent();
        this.valueInCents = discount.getValueInCents();
    }
}

export default GetDiscountResponse;