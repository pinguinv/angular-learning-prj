import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { map, take, tap } from "rxjs";

export const AntiAuthGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authService: AuthService = inject(AuthService),
  router: Router = inject(Router)
) => {
  return authService.userSubj.pipe(
    take(1),
    map((user) => {
      const isAuth = !user;
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(["/recipes"]);
    })
    // map((user) => !user),
    // tap((isAuth) => {
    //   if (!isAuth) {
    //     router.navigate(["/recipes"]);
    //   }
    // })
  );
};
