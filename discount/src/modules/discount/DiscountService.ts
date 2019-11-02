import UserRepository from '../user/UserRepository';
import Discount from '../discount/Discount';

class DiscountService {

    public get(userId: String, productId: String) : Discount {

        console.log(userId);

        UserRepository
            .findOne({id: userId})
            .then(user => {
                
                

            })
            .catch(err => {
                console.log(err);
            })

        return new Discount(5, 10);
    }
}

export default DiscountService;