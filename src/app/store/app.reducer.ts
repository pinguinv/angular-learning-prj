import { ActionReducerMap } from "@ngrx/store";

import * as fromShoppingList from "../components/shopping/shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../components/auth/store/auth.reducer";
import * as fromRecipes from "../components/recipes/store/recipe.reducer";

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer,
};
