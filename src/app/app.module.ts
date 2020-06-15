import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent} from './dashboard/dashboard.component'
import { ProductListComponent} from './product/product-list.component'
import { ProductDetailComponent} from './product/product-detail.component'
import { ProductEditComponent} from './product/product-edit.component'
import { ProductService } from './service/product.service';
import { APP_BASE_HREF } from '@angular/common';



@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService), 
    AppRoutingModule],
  declarations: [ AppComponent,
    DashboardComponent, 
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent ],
  providers: [ 
    ProductService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
