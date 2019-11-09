import { Discount } from "./discount";

class BirthdayDiscount extends Discount {
    constructor(price: number) {
        super(5);
        super.calculateDiscount(price);
    }
}

export default BirthdayDiscount;
