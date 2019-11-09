import { Test } from '@nestjs/testing';
import { GetDiscountService } from './discounts.service';
import { GetDiscountQuery } from '../query/getDiscountQuery';
import { getModelToken } from '@nestjs/mongoose';

describe('GetDiscountService', () => {
  let discountService: GetDiscountService;
  let mockUserModel = {

  };
  let mockProductModel = {

  };
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
        providers: [
            {
                provide: getModelToken('USER_MODEL'),
                useValue: mockUserModel
            },
            {
                provide: getModelToken('PRODUCT_MODEL'),
                useValue: mockUserModel
            },
            GetDiscountService
        ]
    }).compile();

    discountService = module.get<GetDiscountService>(GetDiscountService);

  });

  describe('get discount', () => {
    it('should return discount', async () => {
      expect(await discountService.get(new GetDiscountQuery('1', '2'))).toBe(null);
    });
  });
});