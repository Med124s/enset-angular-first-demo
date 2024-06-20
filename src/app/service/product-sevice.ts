import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductSevice {
  private _host:string = "http://localhost:8089/Products";
  constructor(private http:HttpClient) { }

  public searchProducts = (keyword: any, page: number | undefined, size: number | undefined) =>{
    return this.http.get<Product[]>(`${this._host}?name_like=${keyword}&_page=${page}&_limit=${size}`,
      {observe:'response'});
  }
  public updateCheckedProduct = (product:Product):Observable<Product> =>{
    return this.http.patch<Product>(`${this._host}/${product.id}`,{
      checked:!product.checked
    });
  }
  public deleteProduct = (product:Product):Observable<Product> =>{
    return this.http.delete<Product>(`${this._host}/${product.id}`);
  }
  public saveProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this._host}`,product);
  }
  getProductById(id: number):Observable<Product> {
    return this.http.get<Product>(`${this._host}/${id}`);
  }
  editProduct = (product:Product):Observable<Product>=>{
    return this.http.put<Product>(`${this._host}/${product.id}`,product);

  }
}
