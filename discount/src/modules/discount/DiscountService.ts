import UserRepository from '../user/UserRepository';
import ProductRepository from '../product/ProductRepository';
import Discount from '../discount/Discount';

class DiscountService {

    public get(userId: String, productId: String) : Discount {
        
        console.log(userId);
        console.log(productId);

        UserRepository
            .find({id: userId})
            .then(user => {

                ProductRepository
                    .find({id: productId})
                    .then(product => {
                        
                        console.log(user);
                        console.log(product);

                    });
            });
            
        return new Discount(0, 0);
    }
}

export default DiscountService;