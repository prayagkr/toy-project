import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface CanDeactivateInterface {
    canDeactivate(
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
}
