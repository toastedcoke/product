import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      {
        'id': 1,
        'productName': 'Shampoo',
        'productCode': 'GDN-0011',
        'description': 'Shampoo for anti hair fall',
        'price': 19.95,
        'quantity': 122,
        'imageUrl': 'https://openclipart.org/image/2000px/svg_to_png/304246/1531809666.png'
      },
      {
        'id': 2,
        'productName': 'Hand Wash Soap',
        'productCode': 'GDN-0023',
        'description': 'Anti-bacterial hand wash soap with moisturizer',
        'price': 32.99,
        'quantity': 1000,
        'imageUrl': 'https://openclipart.org/image/2000px/svg_to_png/27202/laobc-Liquid-soap.png'
      },
      {
        'id': 5,
        'productName': 'Desk Fan',
        'productCode': 'TBX-0048',
        'description': 'Desk Fan - 15 inches with 3 speed',
        'price': 8.9,
        'quantity': 230,
        'imageUrl': 'https://openclipart.org/image/2000px/svg_to_png/315908/1551276237.png'
      },
      {
        'id': 8,
        'productName': 'Hair Dryer',
        'productCode': 'TBX-0022',
        'description': 'Three button speed with hot or cool fan',
        'price': 11.55,
        'quantity': 60,
        'imageUrl': 'https://openclipart.org/image/800px/svg_to_png/284901/publicdomainq-hair_dryer.png'
      },
      {
        'id': 10,
        'productName': 'Electric Toothbrush',
        'productCode': 'GMG-0042',
        'description': 'Battery operated electric toothbrush',
        'price': 35.95,
        'quantity': 90,
        'imageUrl': 'https://openclipart.org/image/800px/svg_to_png/305049/1534127836.png'
      }
    ];
    return { products };
  }
}
