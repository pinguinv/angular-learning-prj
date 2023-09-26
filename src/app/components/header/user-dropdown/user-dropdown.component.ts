import { Component, EventEmitter, Output } from "@angular/core";
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
  @Output() closeDropdown = new EventEmitter();

  constructor(private store: Store<AppState>) {}

  closeDd() {
    this.closeDropdown.emit();
  }

  saveData() {
    // this.dataStorageService.saveRecipes();
    this.store.dispatch(RecipeActions.saveRecipes());
    this.closeDd();
  }

  fetchData() {
    this.store.dispatch(RecipeActions.fetchRecipes());
    this.closeDd();
  }

  logoutUser() {
    this.store.dispatch(AuthActions.logout());
    this.closeDd();
  }
}
