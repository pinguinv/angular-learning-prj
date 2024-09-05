import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";
import { User } from "../user.model";
import { AuthService } from "../auth.service";
import * as AuthActions from "./auth.actions";

interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuth = (resData: AuthResponseData) => {
  const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
  const user = new User(
    resData.localId,
    resData.email,
    resData.idToken,
    expDate
  );

  localStorage.setItem("userData", JSON.stringify(user));

  return AuthActions.authenticateSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate: expDate,
    redirect: true,
  });
};

const handleError = (errorResponse: any) => {
  let errorMessage = "An unknown error occured!";

  if (!errorResponse.error || !errorResponse.error.error) {
    return of(AuthActions.autenticateFail({ message: errorMessage }));
  }
  switch (errorResponse.error.error.message) {
    case "EMAIL_EXISTS":
      errorMessage = "This email exists already";
      break;
    case "EMAIL_NOT_FOUND":
      errorMessage = "There is no user record corresponding to this identifier";
      break;
    case "INVALID_PASSWORD":
      errorMessage =
        "The password is invalid or the user does not have a password";
      break;
    case "INVALID_LOGIN_CREDENTIALS":
      errorMessage = "Login credentials are invalid or user does not exist";
      break;
  }
  return of(AuthActions.autenticateFail({ message: errorMessage }));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap((signupAction) => {
        const reqBody = {
          email: signupAction.email,
          password: signupAction.password,
          returnSecureToken: true,
        };
        return this.http
          .post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
              environment.firebaseAPIKey,
            reqBody
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map(handleAuth),
            catchError(handleError)
          );
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
              environment.firebaseAPIKey,
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map(handleAuth),
            catchError(handleError)
          );
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap((authSuccessAction) => {
          if (authSuccessAction.redirect) {
            this.router.navigate(["/"]);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userDataStr = localStorage.getItem("userData");

        if (!userDataStr) {
          return { type: "dummy" };
        }

        const userData: {
          id: string;
          email: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(userDataStr);

        if (userData._token) {
          const expDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();

          this.authService.setLogoutTimer(expDuration);

          return AuthActions.authenticateSuccess({
            email: userData.email,
            userId: userData.id,
            token: userData._token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false,
          });
          // const expDuration =
          //   new Date(userData._tokenExpirationDate).getTime() -
          //   new Date().getTime();
          // this.autoLogout(expDuration);
        }
        return { type: "dummy" };
      })
    )
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem("userData");
          this.router.navigate(["/auth"]);
        })
      ),
    { dispatch: false }
  );
}
