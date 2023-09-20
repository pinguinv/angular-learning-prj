import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, map } from "rxjs";
import { Store } from "@ngrx/store";

import { User } from "../auth/user.model";
import { AppState } from "src/app/store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipeActions from "../recipes/store/recipe.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub?: Subscription;
  isAuthenticated = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select("auth")
      .pipe(map((authState) => authState.user))
      .subscribe({
        next: (user: User | null) => {
          this.isAuthenticated = !!user;
        },
      });
  }

  saveData() {
    // this.dataStorageService.saveRecipes();
    this.store.dispatch(RecipeActions.saveRecipes());
  }

  fetchData() {
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

  logoutUser() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
