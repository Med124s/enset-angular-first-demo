import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductSevice} from "../service/product-sevice";
import {AppStateService} from "../service/app-state.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  public ProductForm!:FormGroup
  constructor(private _fb:FormBuilder,
              private _productService:ProductSevice,
              public appState:AppStateService) {
  }
  saveProduct() {
    this._productService.saveProduct(this.ProductForm.value).subscribe({
      next:value => {
        alert("Product Save Successfully");
      }
    })
  }

  ngOnInit(): void {
    this.ProductForm = this._fb.group({
      name:this._fb.control('',[Validators.required]),
      price:this._fb.control(0,[Validators.required]),
      checked:this._fb.control(false)
    })
  }
}
