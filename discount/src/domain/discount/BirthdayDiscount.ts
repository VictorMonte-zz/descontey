import { Discount } from "./Discount";

class BirthdayDiscount extends Discount {
    constructor(price: number) {
        super(5);
        super.calculateDiscount(price);
    }
}

export default BirthdayDiscount;
