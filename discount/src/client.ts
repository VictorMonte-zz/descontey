import { clientFactory } from 'rxjs-grpc';

import { discount } from './grpc-namespaces';

async function main() {
  type ClientFactory = discount.ClientFactory;
  const Services = clientFactory<ClientFactory>('src/discount.proto', 'discount');

  const services = new Services('localhost:50051');
  const service = services.getDiscountService();

  await service.get({userId: '1', productId: '2'}).forEach(response => {
    console.log(`Test: ${response.porcent}`);
  });
}

main().catch(error => console.error(error));
