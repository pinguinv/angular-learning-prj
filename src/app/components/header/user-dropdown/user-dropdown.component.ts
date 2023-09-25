import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppState } from "src/app/store/app.reducer";
import * as AuthActions from "../../auth/store/auth.actions";
import * as RecipeActions from "../../recipes/store/recipe.actions";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
  styleUrls: ["./user-dropdown.component.css"],
})
export class UserDropdownComponent {
  constructor(private store: Store<AppState>) {}

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
}
