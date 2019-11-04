import Discount from '../discount/Discount';
import UserModel from '../user/User';
import ProductModel from '../product/Product';

class DiscountService {

    public async get(userId: String, productId: String): Promise<Discount> {

        console.log('Requesting discount for user ' + userId + ' and product ' + productId);

        var discount = new Discount(0, 0);

        const user = await UserModel.findOne({id: userId});

        if(this.isUserBirthday(user)) {

            const product = await ProductModel.findOne({id: productId});
            
            const price = (product.priceInCents / 100);
            const porcent = 5;
            const valueInCents = (price * ( porcent / 100 )) * 100;

            discount = new Discount(porcent, valueInCents);
        }

        return discount;
    }

    private isUserBirthday(user) {
        let today = new Date();
        return today.getDay() === user.dateOfBirth.getDay() && today.getMonth() === user.dateOfBirth.getMonth();
    }
}

export default DiscountService;