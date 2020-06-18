import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit {
  products: Product[];
  errorMessage = '';
  product: Product;
  productForm: FormGroup;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

    constructor( private route: ActivatedRoute,
    private router: Router,
      private productService: ProductService) {

      this.productForm = new FormGroup({
        productName: new FormControl(),
        code: new FormControl(),
        description: new FormControl(),
        quantity: new FormControl(),
        price: new FormControl()
      });

      this.validationMessages = {
        productName: {
          required: 'Product name is required.',
          minlength: 'Product name must be at least three characters.',
          maxlength: 'Product name cannot exceed 50 characters.'
        },
        productCode: {
          required: 'Product code is required.'
        }
      };

      

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
    if (this.productForm.valid) {
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

