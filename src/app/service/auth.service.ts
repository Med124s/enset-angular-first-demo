import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient,private _stateUser:AppStateService) { }

  public async login(username:string, password:string){
    //firstValueFrom : function return promise, convert observable to promise
    try {
      let user: any = await firstValueFrom(this._http.get(`http://localhost:8089/users/${username}`));

      if (atob(user.password) == password) {
        let decodeJwt: any = jwtDecode(user.token);

        this._stateUser.setAuthState({
          username: decodeJwt.sub,
          roles: decodeJwt.roles,
          password: decodeJwt.password,
          token: user.token,
          isAuthenticate: true
        });
        return Promise.resolve(true)
      } else {
        return Promise.reject("Bad Credentials");
      }
    }
    catch (e){
      return Promise.reject("Network Error")
    }
  }
}
