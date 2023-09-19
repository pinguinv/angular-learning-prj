import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Store } from "@ngrx/store";

import { User } from "./user.model";
import { environment } from "../../../environments/environment";
import { AppState } from "../../store/app.reducer";
import { login, logout } from "./store/auth.actions";

export interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // userSubj = new BehaviorSubject<User | null>(null);
  private tokenExpTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}

  signup(email: string, password: string) {
    const reqBody = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          environment.firebaseAPIKey,
        reqBody
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.localId,
            resData.email,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    const reqBody = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          environment.firebaseAPIKey,
        reqBody
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.localId,
            resData.email,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userDataStr = localStorage.getItem("userData");

    if (!userDataStr) {
      return;
    }

    const userData: {
      id: string;
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(userDataStr);

    // const loadedUser = new User(
    //   userData.id,
    //   userData.email,
    //   userData._token,
    //   new Date(userData._tokenExpirationDate)
    // );

    if (userData._token) {
      // this.userSubj.next(loadedUser);
      this.store.dispatch(
        login({
          email: userData.email,
          userId: userData.id,
          token: userData._token,
          expirationDate: new Date(userData._tokenExpirationDate),
        })
      );
      const expDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expDuration);
    }
  }

  logout() {
    // this.userSubj.next(null);
    this.store.dispatch(logout());
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogout(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }

  private handleAuth(
    userId: string,
    email: string,
    token: string,
    expiresIn: number
  ) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(userId, email, token, expDate);
    // this.userSubj.next(user);
    this.store.dispatch(
      login({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expDate,
      })
    );
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error occured!";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage =
          "There is no user record corresponding to this identifier";
        break;
      case "INVALID_PASSWORD":
        errorMessage =
          "The password is invalid or the user does not have a password";
        break;
    }
    return throwError(() => errorMessage);
  }
}
