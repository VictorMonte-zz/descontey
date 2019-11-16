import { Test } from '@nestjs/testing';
import { GetDiscountService } from './discounts.service';
import { GetDiscountQuery } from '../query/getDiscountQuery';
import { getModelToken } from '@nestjs/mongoose';
import { when } from 'jest-when'
import { BlackFridayService } from './blackFriday.service';

describe('GetDiscountService', () => {

  let discountService: GetDiscountService;
  let blackFridayService: BlackFridayService;

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
          provide: getModelToken('User'),
          useValue: userModel,
        },
        {
          provide: getModelToken('Product'),
          useValue: productModel,
        },
        BlackFridayService
      ],
    }).compile();

    discountService = module.get<GetDiscountService>(GetDiscountService);
    blackFridayService = module.get<BlackFridayService>(BlackFridayService);
  });

  describe('get birthday discount', () => {

    const today = new Date();

    it('should return discount porcent', async () => {

      const expectedPorcent = 5;

      when(user.get).calledWith('dateOfBirth').mockReturnValue(today);
      when(user.get).calledWith('id').mockReturnValue(1);
      when(product.get).calledWith('priceInCents').mockReturnValue(25000);
      jest.spyOn(blackFridayService, 'isToday').mockImplementation(() => false);
      const query = new GetDiscountQuery('1', '2')

      const result = await discountService.get(query);

      expect(result.porcent).toBe(expectedPorcent);

    });

    it('should return discount value in cents', async () => {

      const expectedValueInCents = 1250;

      when(user.get).calledWith('dateOfBirth').mockReturnValue(today);
      when(user.get).calledWith('id').mockReturnValue(1);
      when(product.get).calledWith('priceInCents').mockReturnValue(25000);
      jest.spyOn(blackFridayService, 'isToday').mockImplementation(() => false);
      const query = new GetDiscountQuery('1', '2')

      const result = await discountService.get(query);

      expect(result.valueInCents).toBe(expectedValueInCents);

    });
  });

  describe('get black friday discount', () => {

    const today = new Date('1990-11-14');

    it('should return discount porcent', async () => {

      const expectedPorcent = 10;

      when(user.get).calledWith('dateOfBirth').mockReturnValue(today);
      when(user.get).calledWith('id').mockReturnValue(1);
      when(product.get).calledWith('priceInCents').mockReturnValue(25000);
      jest.spyOn(blackFridayService, 'isToday').mockImplementation(() => true);
      const query = new GetDiscountQuery('1', '2')

      const result = await discountService.get(query);

      expect(result.porcent).toBe(expectedPorcent);

    });

    it('should return discount value in cents', async () => {

      const expectedValueInCents = 2500;

      when(user.get).calledWith('dateOfBirth').mockReturnValue(today);
      when(user.get).calledWith('id').mockReturnValue(1);
      when(product.get).calledWith('priceInCents').mockReturnValue(25000);
      jest.spyOn(blackFridayService, 'isToday').mockImplementation(() => true);
      const query = new GetDiscountQuery('1', '2')

      const result = await discountService.get(query);

      expect(result.valueInCents).toBe(expectedValueInCents);

    });
  });

});