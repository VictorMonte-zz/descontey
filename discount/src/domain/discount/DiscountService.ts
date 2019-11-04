import Discount from './Discount';
import UserModel from '../../model/User';
import ProductModel from '../../model/Product';
import BirthdayDiscount from './BirthdayDiscount';
import BlackfridayDiscount from './BlackfridayDiscount';
import DiscountResponse from '../../response/DiscountResponse';
import WithoutDiscount from './WithoutDiscount';
import { injectable } from 'inversify';

@injectable()
class DiscountService {

    public async get(userId: String, productId: String): Promise<DiscountResponse> {

        console.log('Requesting discount for user ' + userId + ' and product ' + productId);

        var discount = new WithoutDiscount();

        const user = await UserModel.findOne({id: userId});

        if(user.isBirthday()) {
            const product = await ProductModel.findOne({id: productId});
            discount = new BirthdayDiscount(product.priceInCents);
        }

        if(this.isBlackfriday()) {
            const product = await ProductModel.findOne({id: productId});
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