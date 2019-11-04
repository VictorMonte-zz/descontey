import Discount from './discount';
import User from '../../model/user';
import Product from '../../model/product';
import BirthdayDiscount from './birthdayDiscount';
import BlackfridayDiscount from './blackfridayDiscount';
import DiscountResponse from '../../response/discountResponse';
import WithoutDiscount from './withoutDiscount';
import { injectable } from 'inversify';

@injectable()
class DiscountService {

    public async get(userId: String, productId: String): Promise<DiscountResponse> {

        console.log('Requesting discount for user ' + userId + ' and product ' + productId);

        var discount = new WithoutDiscount();

        const user = await User.findOne({id: userId});

        if(user.isBirthday()) {
            const product = await Product.findOne({id: productId});
            discount = new BirthdayDiscount(product.priceInCents);
        }

        if(this.isBlackfriday()) {
            const product = await Product.findOne({id: productId});
            discount = new BlackfridayDiscount(product.priceInCents);
        }

        return new DiscountResponse(discount);
    }

    private isBlackfriday(): boolean {
        const today = new Date();
        return today.getDay() === 25 && today.getMonth() === 11;
    }
}

export default DiscountService;