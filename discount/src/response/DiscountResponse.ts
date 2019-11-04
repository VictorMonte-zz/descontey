import Discount from "../domain/discount/discount";

class DiscountResponse {
    porcent: number;
    valueInCents: number;

    constructor(discount: Discount) {
        this.porcent = discount.getPorcent();
        this.valueInCents = discount.getValueInCents();
    }
}

export default DiscountResponse;