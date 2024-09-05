import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs";

import { AuthService } from "./auth.service";
import { AppState } from "src/app/store/app.reducer";

export const AntiAuthGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authService: AuthService = inject(AuthService),
  router: Router = inject(Router),
  store: Store<AppState> = inject(Store)
) => {
  return store.select("auth").pipe(
    take(1),
    map((authState) => authState.user),
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
