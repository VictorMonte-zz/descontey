import { Discount } from "./Discount";

class BlackfridayDiscount extends Discount {
    constructor(price: number) {
        super(10);
        super.calculateDiscount(price);
    }
}

export default BlackfridayDiscount;
