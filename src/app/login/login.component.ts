import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public loginForm!:FormGroup;
  public errorMessage = undefined;
  constructor(private _fb:FormBuilder,
              private _router:Router,
              private _auth:AuthService) {
  }
  ngOnInit(): void {
     this.loginForm = this._fb.group({
       username:this._fb.control(''),
       password:this._fb.control(''),
     })
  }

  handleLogin() {
    console.log(this.loginForm.value)
    this._auth.login(this.loginForm.value.username,this.loginForm.value.password)
      .then(resp=>{
          this._router.navigateByUrl("/admin");
      } )
      .catch(err=>{this.errorMessage = err})
  }
}
