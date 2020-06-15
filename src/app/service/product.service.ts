import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Product } from '../model/product';

@Injectable()
export class ProductService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private productsUrl = 'api/products';  // URL to web api

  constructor(private http: Http) {
  }

  getProducts(): Promise<Product[]> {
    return this.http.get(this.productsUrl)
        .toPromise()
        .then(response => response.json().data as Product[])
        .catch(this.handleError);
  }


  getProduct(id: number): Promise<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Product)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  create(name: string): Promise<Product> {
    return this.http
        .post(this.productsUrl, JSON.stringify({ name: name }), { headers: this.headers })
        .toPromise()
        .then(res => res.json().data as Product)
        .catch(this.handleError);
  }

  update(hero: Product): Promise<Product> {
    const url = `${this.productsUrl}/${hero.id}`;
    return this.http
        .put(url, JSON.stringify(hero), { headers: this.headers })
        .toPromise()
        .then(() => hero)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

