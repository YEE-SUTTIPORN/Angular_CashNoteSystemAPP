import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    if (typeof window === 'undefined') {
      // SSR: อนุญาตทุกหน้าเพื่อไม่ให้ error ระหว่าง prerender
      return of(true);
    }
    return combineLatest([
      this.authService.authChecked$,
      this.authService.currentUser
    ]).pipe(
      // ✅ สำคัญ: รอจน authChecked === true ก่อนค่อยดำเนินการ
      filter(([authChecked, _]) => authChecked),
      take(1),
      map(([_, user]) => {
        return !!user
          ? true
          : this.router.createUrlTree(['/login'], {
            queryParams: { returnUrl: state.url }
          });
      })
    );
  }
}
