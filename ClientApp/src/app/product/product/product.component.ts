import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../product.interface';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm!: FormGroup;
  products: IProduct[] = [];
  productID!: number;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.productID = this.activatedRoute.snapshot.params['id'];
    this.initProductForm();
  }

  private initProductForm(): void {
    this.productForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  private resetForm(): void {
    this.productForm.reset();
  }

  public getProductByID(productID: number): void {
    this.productService.getByID(productID).subscribe({
      next: (res) => {
        this.productForm.patchValue(res);
      }, error: (err) => {
        console.log('err: ', err);
      }
    })
  }

  public onSubmit(): void {
    if (this.productForm.valid) {
      if (this.productID) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
      this.resetForm();
    }
  }

  private addProduct(): void {
    this.productService.create(this.productForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/product/list'])
      }, error: (err) => {
        console.log('err: ', err);
      }
    })
  }

  private updateProduct(): void {
    this.productService.edit(this.productID, this.productForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/product/list'])
      }, error: (err) => {
        console.log('err: ', err);
      }
    })
  }

}
