import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AppStateService} from "../service/app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router,private _authState:AppStateService) {}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
    if (this._authState.authState.isAuthenticate) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
