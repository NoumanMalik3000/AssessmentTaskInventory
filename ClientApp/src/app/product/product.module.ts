import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: "", redirectTo: 'list', pathMatch: 'full' },
  { path: "create", component: ProductComponent },
  { path: "edit/:id", component: ProductComponent },
  { path: "list", component: ProductListComponent },
];

@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers: [ProductService],
  exports: [RouterModule]
})
export class ProductModule { }
