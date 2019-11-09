import GetDiscountCommand from "../command/GetDiscountCommand";
import DiscountResponse from "../response/DiscountResponse";

interface IDiscountService {
    get(command: GetDiscountCommand): Promise<DiscountResponse>;
}

export default IDiscountService;