import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../service/product.service';
import { Product } from '../model/product';

@Component({
  selector: 'my-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  pageTitle = 'Product List';
  errorMessage = '';

  products: Product[];
  selectedProduct: Product;

    _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService,
              private router: Router) {
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
    getProducts(): void {
    this.productService
        .getProducts()
        .then(products => {
        this.products = products;
        this.filteredProducts = this.products;
      });
  }

    delete(product: Product): void {
    this.productService
        .delete(product.id)
        .then(() => {
          this.products = this.products.filter(h => h !== product);
          this.filteredProducts = this.products 
        });
  }

  ngOnInit(): void {
    this.getProducts();
  }
  
}