import { Test } from '@nestjs/testing';
import { GetDiscountService } from './discounts.service';
import { GetDiscountQuery } from '../query/getDiscountQuery';
import { getModelToken } from '@nestjs/mongoose';
import { exec } from 'child_process';
import { when } from 'jest-when'
import BirthdayDiscount from 'src/domain/birthdayDiscount';



describe('GetDiscountService', () => {

  let discountService: GetDiscountService;
  
  // mocks
  const user = {
    get: jest.fn()
  }

  const product = {
    get: jest.fn()
  }

  const userModel = {
    findOne: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(user)
  };

  const productModel = {
    findOne: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(product)
  };

  beforeEach(async () => {

    const module = await Test.createTestingModule({
      providers: [
        GetDiscountService,
        {
          provide: getModelToken('USER_MODEL'),
          useValue: userModel,
        },
        {
          provide: getModelToken('PRODUCT_MODEL'),
          useValue: productModel,
        },
      ],
    }).compile();

    discountService = module.get<GetDiscountService>(GetDiscountService);
  });

  describe('get birthday discount', () => {

    const today = new Date();

    it('should return discount porcent', async () => {

      const expectedPorcent = 5;
      
      // arrange
      when(user.get).calledWith('dateOfBirth').mockReturnValue(today);
      when(user.get).calledWith('id').mockReturnValue(1);
      when(product.get).calledWith('priceInCents').mockReturnValue(25000);
      const query = new GetDiscountQuery('1', '2')

      // act
      const result = await discountService.get(query);

      // assert
      expect(result.porcent).toBe(expectedPorcent);

    });

    it('should return discount value in cents', async () => {

      const expectedValueInCents = 1250;

      // arrange
      when(user.get).calledWith('dateOfBirth').mockReturnValue(today);
      when(user.get).calledWith('id').mockReturnValue(1);
      when(product.get).calledWith('priceInCents').mockReturnValue(25000);
      const query = new GetDiscountQuery('1', '2')

      // act
      const result = await discountService.get(query);

      // assert
      expect(result.valueInCents).toBe(expectedValueInCents);

    });

  });
});