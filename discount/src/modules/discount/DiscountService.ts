import Discount from '../discount/Discount';
import UserModel from '../user/User';
import ProductModel from '../product/Product';

class DiscountService {

    public async get(userId: String, productId: String): Promise<Discount> {

        console.log('Requesting discount for user ' + userId + ' and product ' + productId);

        var discount = new Discount(0, 0);

        const user = await UserModel.findOne({id: userId});

        let today = new Date();
        if(this.isUserBirthday(today, user)) {

            const product = await ProductModel.findOne({id: productId});

            let price = (product.priceInCents / 100);
            let discountPorcent = 5;

            discount = new Discount(discountPorcent, price * ( discountPorcent / 100 ));
        }

        return discount;
    }

    private isUserBirthday(today: Date, user) {
        return today.getDay() === user.dateOfBirth.getDay() && today.getMonth() === user.dateOfBirth.getMonth();
    }
}

export default DiscountService;