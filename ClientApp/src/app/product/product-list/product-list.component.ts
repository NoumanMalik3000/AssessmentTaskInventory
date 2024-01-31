import { Component } from '@angular/core';
import { IProduct } from '../product.interface';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  public productList: IProduct[] = [];
  constructor(private readonly productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProductList();
  }

  private getProductList(): void {
    this.productService.getAll().subscribe({
      next: (res) => {
        this.productList = res;
      }
    });
  }

  public deleteProduct(productID: number): void {
    this.productService.delete(productID).subscribe({
      next: (res) => {
        if (res)
          this.getProductList();
      }, error: (err) => {
        console.log('err: ', err);
      }
    })
  }
}
