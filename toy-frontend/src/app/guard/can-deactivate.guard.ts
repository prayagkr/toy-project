import { Injectable } from '@angular/core';
import { CanDeactivate , ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateInterface } from '../shared/model/can-deactivate.model';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard<T extends CanDeactivateInterface> implements CanDeactivate<T>  {
  canDeactivate(
    component: T,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return component.canDeactivate ? component.canDeactivate(currentRoute, currentState, nextState) : true;
  }
}
