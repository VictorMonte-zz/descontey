import Discount from "./discount";

class WithoutDiscount extends Discount {
    constructor() {
        super(0);
    }
}

export default WithoutDiscount;