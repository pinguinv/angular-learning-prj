import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { AlertComponent } from "src/app/shared/alert/alert.component";
import { PlaceholderDirective } from "src/app/shared/placeholder/placeholder.directive";
import { AppState } from "src/app/store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });
  isLoginMode = true;
  isLoading = false;
  error: string = "";
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;
  private closeSub?: Subscription;
  private storeSub?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store.select("auth").subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    const email = this.authForm.value.email!;
    const password = this.authForm.value.password!;

    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(
        AuthActions.loginStart({
          email: email,
          password: password,
        })
      );
    } else {
      this.store.dispatch(
        AuthActions.signupStart({
          email: email,
          password: password,
        })
      );
    }

    this.authForm.reset();
  }

  closeError() {
    this.store.dispatch(AuthActions.clearError());
  }

  private showErrorAlert(message: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const cmpRef = hostViewContainerRef.createComponent(AlertComponent);
    cmpRef.instance.message = message;
    this.closeSub = cmpRef.instance.close.subscribe(() => {
      this.closeSub?.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
