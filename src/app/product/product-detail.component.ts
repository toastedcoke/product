import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { ProductService } from '../service/product.service';
import { Product } from '../model/product';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {

  errorMessage = '';
  product: Product | undefined;

    constructor(private route: ActivatedRoute,
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


  goBack(): void {
    this.router.navigate(['/products']);
  }
}


