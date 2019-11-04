import Discount from "./Discount";

class WithoutDiscount extends Discount {
    constructor() {
        super(0);
    }
}

export default WithoutDiscount;