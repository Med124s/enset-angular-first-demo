import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductSevice} from "../service/product-sevice";
import {Product} from "../model/product";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  public productId:number = 0;
  public EditProductForm!:FormGroup;
  constructor(private _activatedRoute:ActivatedRoute,
              private _fb:FormBuilder,
              private _serviceProduct:ProductSevice) {
  }
  ngOnInit(): void {
    this.productId = this._activatedRoute.snapshot.params["id"];
    this._serviceProduct.getProductById(this.productId).subscribe({
      next:(product)=>{
        this.EditProductForm = this._fb.group({
          id:this._fb.control(product.id,[Validators.required]),
          name:this._fb.control(product.name,[Validators.required]),
          price:this._fb.control(product.price,[Validators.required]),
          checked:this._fb.control(product.checked)
        })
      }
    })

  }

  editProduct() {
    let product:Product = this.EditProductForm.value;

    this._serviceProduct.editProduct(product).subscribe({
      next:product => {
        alert(JSON.stringify(product))
      },
      error:err => {
        console.error(err.message())
      }
    })
  }
}
