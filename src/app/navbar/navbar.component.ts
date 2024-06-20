import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppStateService} from "../service/app-state.service";
import {LoadingService} from "../service/loading.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
public setCurrentAction:any;

public actions:Array<any> = [];
  constructor(private _router:Router,
    public loading:LoadingService,
              public appState:AppStateService) {}

  ngOnInit(): void {
    this.actions = [
      {title:"Home",route:"/admin/home",icon:"house"},
      {title:"Product",route:"/admin/products",icon:"search"},
      {title:"NewProduct",route:"/admin/newProduct",icon:"safe"},

    ]
    this.setCurrentAction = this.actions[0];
  }
  goAction(action:any){
    this._router.navigateByUrl(action.route);
    this.setCurrentAction = action;

  }

  logout() {
    this.appState.authState = {};
    this._router.navigateByUrl("/login");
  }

  login() {
    this._router.navigateByUrl("/login");
  }
}
