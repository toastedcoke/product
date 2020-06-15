import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


import { Product } from '../model/product';
import { ProductService } from '../service/product.service';


@Component({
  templateUrl: './product-edit.component.html'
})

export class ProductEditComponent implements OnInit {
  products: Product[];
  errorMessage = '';
  product: Product;

    constructor( private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) {

    }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;

      if (id == 0) {
        this.product = new Product();
        this.product.id = 0;
        this.product.description = '';
        this.product.productName = '';
        this.product.productCode = '';
        this.product.quantity = 0;
        this.product.price = 0;
        this.getProducts();
      } else {
          this.route.paramMap
          .switchMap((params: ParamMap) => this.productService.getProduct(+params.get('id')))
          .subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
      }
    }

    

 

  }
  save(): void {

    if (this.product.id == 0) {
      this.productService.create(this.product)
        .then(
          () => {
            this.onSaveComplete();
            this.goBack();
          },
          (error: any) => this.errorMessage = <any>error
        );
    } else {
      this.productService.update(this.product)
        .then(() => this.goBack());
    }

    
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .then(products => this.products = products);
  }

  onSaveComplete(): void {
    this.products.push(this.product);
  }




  goBack(): void {
    this.router.navigate(['/products']);
  }
}

