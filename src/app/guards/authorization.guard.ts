import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {AppStateService} from "../service/app-state.service";


@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {

  constructor(private router: Router,private _authState:AppStateService) {}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
    if (this._authState.authState.roles?.includes(route.data["requiredRole"])) {
      return true;
    } else {
      this.router.navigate(['/admin/not-authorize']);
      return false;
    }
  }
}
