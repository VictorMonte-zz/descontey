import Discount from "./discount"

export class WithoutDiscount extends Discount {
    constructor() {
        super(0);
    }
}