import User from '../../infrastructure/dataModel/User';
import Product from '../../infrastructure/dataModel/Product';
import BirthdayDiscount from '../../domain/discount/BirthdayDiscount';
import BlackfridayDiscount from '../../domain/discount/BlackfridayDiscount';
import DiscountResponse from '../response/DiscountResponse';
import { injectable } from 'inversify';
import IDiscountService from './IDiscountService';
import GetDiscountCommand from '../command/GetDiscountCommand';
import Discount from '../../domain/discount/discount';

@injectable()
class DiscountService implements IDiscountService {

    public async get(command: GetDiscountCommand): Promise<DiscountResponse> {

        console.log('Requesting discount for user ' + command.getUserId() + ' and product ' + command.getProductId());

        var discount = new Discount(0);

        const user = await User.findOne({id: command.getUserId()});

        if(this.isBirthday(user)) {
            const product = await Product.findOne({id: command.getProductId()});
            discount = new BirthdayDiscount(product.priceInCents);
        }

        if(this.isBlackfriday()) {
            const product = await Product.findOne({id: command.getProductId()});
            discount = new BlackfridayDiscount(product.priceInCents);
        }

        return new DiscountResponse(discount);
    }

    private isBirthday(user: any) {
        const today = new Date();
        return today.getDay() === user.dateOfBirth.getDay() 
            && today.getMonth() === user.dateOfBirth.getMonth();
    }

    private isBlackfriday(): boolean {
        const today = new Date();
        return today.getDay() === 25 && today.getMonth() === 11;
    }
}

export default DiscountService;