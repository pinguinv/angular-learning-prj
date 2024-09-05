import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { map, of, switchMap, take } from "rxjs";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";

import { AppState } from "../../store/app.reducer";
import * as RecipeActions from "../recipes/store/recipe.actions";

export const RecipesResolverFn: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  store: Store<AppState> = inject(Store),
  actions$: Actions = inject(Actions)
) => {
  return store.select("recipes").pipe(
    take(1),
    map((recipesState) => recipesState.recipes),
    switchMap((recipes) => {
      if (recipes.length === 0) {
        store.dispatch(RecipeActions.fetchRecipes());
        return actions$.pipe(ofType(RecipeActions.setRecipes), take(1));
      } else {
        return of(recipes);
      }
    })
  );
};
