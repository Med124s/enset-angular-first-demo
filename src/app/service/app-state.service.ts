import { Injectable } from '@angular/core';
import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})

export class AppStateService {

  public productState: stateProd = {
    products:[],
    totalPages:3,
    pageSize:2,
    keyword:"",
    totalProducts:0,
    countChecking:0,
    currentPage: 0,
    statusProd:"",
    errMessage:""
  };
  public authState:stateUser = {
    username:undefined,
    password:undefined,
    token:undefined,
    roles:[],
    isAuthenticate:false
  }

  constructor() {}

  public setProductState(state: stateProd) {
    this.productState =  {...this.productState, ...state};
  }
  public getProductState():stateProd {
    return this.productState;
  }
  public setAuthState(state: stateUser) {
    this.authState =  {...this.authState, ...state};
  }
  public getAuthState():stateUser {
    return this.authState;
  }


}
type stateProd = {
  products?: Array<Product>;
  totalPages?: number;
  pageSize?: number;
  countChecking?: number;
  keyword?: string;
  totalProducts?:number;
  currentPage?: number;
  statusProd?: string;
  errMessage?:string
}
type stateUser = {
  username?:string;
  password?:string;
  token?:string;
  roles?:string[];
  isAuthenticate?:boolean
}
