import { Component } from '@angular/core';
import {AppStateService} from "../service/app-state.service";
import {Product} from "../model/product";

@Component({
  selector: 'app-dashoard',
  templateUrl: './dashoard.component.html',
  styleUrl: './dashoard.component.css'
})
export class DashoardComponent {
  constructor(public appState:AppStateService) {
  }

  handleCheckedProducts = ()=>{
    let productChecked:Product[] = this.appState.productState.products!.filter((p:Product)=>p.checked);
    return productChecked.length;
  }
}
