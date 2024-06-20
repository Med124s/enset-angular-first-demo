import {Component, OnInit} from '@angular/core';
import {ProductSevice} from "../service/product-sevice";
import {Product} from "../model/product";
import {Router} from "@angular/router";
import {AppStateService} from "../service/app-state.service";
import {LoadingService} from "../service/loading.service";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers:[ProductSevice]
})
export class ProductsComponent implements OnInit{

   public totalProducts:number = 0;
   public countCheckedProd:number = 0;
  constructor(private _productService:ProductSevice,
              private _route:Router,
              public appState:AppStateService,
           ) {
  }
  ngOnInit(): void {
    this.searchProducts();
  }
  searchProducts = () => {
     //this.appState.setProductState({statusProd:"LOADING"});
     this.countCheckedProd = 0;

     return this._productService.searchProducts(this.appState.productState.keyword,
      this.appState.productState.currentPage,
      this.appState.productState.pageSize)
      .subscribe({
        next: (resp) => {
          let products:Product[] = <Product[]>resp.body;
          // @ts-ignore
          this.totalProducts = parseInt(resp.headers.get('X-Total-Count')!);
          // @ts-ignore
          let totalPages = Math.floor(this.totalProducts / this.appState.productState.pageSize);

          // @ts-ignore
          if (this.totalProducts % this.appState.productState.pageSize != 0) {
            ++totalPages;
          }
          this.appState.setProductState({
            products:products,
            totalProducts:this.totalProducts,
            totalPages:totalPages,
            statusProd:"LOADED"
          });

        },
      error:err => {
        console.log(err);
        //this.appState.setProductState({statusProd:"ERROR",errMessage:err.message})
      }
    });
  }
  handleProductCheck = (product:Product) =>{
    this._productService.updateCheckedProduct(product).subscribe({
      next:prodValue => {
        product.checked = prodValue.checked;
        if(prodValue.checked){
          // @ts-ignore
          this.appState.setProductState({countChecking:++this.appState.productState.countChecking})
        }
        else
          // @ts-ignore
          this.appState.setProductState({countChecking:--this.appState.productState.countChecking})
      },
      error:err => {
        console.log(err)
      }
    });
  }
  deleteProduct = (product:Product) => {
    if (confirm("Etes-vous sure?")) {
      this._productService.deleteProduct(product).subscribe({
        next: (prodValue) => {
          this.appState.getProductState().products=  this.appState.getProductState().products?.filter((p: Product) => p.id != product.id);
          // @ts-ignore
          this.appState.setProductState({countChecking:--this.appState.productState.countChecking})
          // @ts-ignore
          this.appState.setProductState({totalProducts:--this.appState.productState.totalProducts})
        },
        error: err => {
          console.log(err)
        }
      });
    }
  }
  handlePagination(page:number) {
    this.appState.setProductState({currentPage:page});
     this.searchProducts();
  }
  updateProduct(p: Product) {
    this._route.navigateByUrl("admin/editProduct/"+p.id)
  }
}
