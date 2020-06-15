import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


import { Product } from '../model/product';
import { ProductService } from '../service/product.service';


@Component({
  templateUrl: './product-edit.component.html'
})

export class ProductEditComponent implements OnInit {

  errorMessage = '';
  product: Product;

    constructor( private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) {

    }

     ngOnInit(): void {
     this.route.paramMap
      .switchMap((params: ParamMap) => this.productService.getProduct(+params.get('id')))
      .subscribe(
        product => this.product = product,
        error => this.errorMessage = <any>error);

  }
 save(): void {
    this.productService.update(this.product)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}

