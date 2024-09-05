import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppState } from "../../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private tokenExpTimer: any;

  constructor(private store: Store<AppState>) {}

  setLogoutTimer(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout());
    }, expDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
      this.tokenExpTimer = null;
    }
  }
}
