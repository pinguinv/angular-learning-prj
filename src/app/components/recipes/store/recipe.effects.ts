import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";

import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipe.actions";
import { AppState } from "../../../store/app.reducer";

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  fetchRecipes = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          "https://angular-lrn-prjct-default-rtdb.europe-west1.firebasedatabase.app/recipes.json"
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => RecipesActions.setRecipes({ recipes: recipes }))
    );
  });

  saveRecipes = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RecipesActions.saveRecipes),
        withLatestFrom(this.store.select("recipes")),
        switchMap(([actionData, recipesState]) => {
          return this.http.put<Recipe[]>(
            "https://angular-lrn-prjct-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
            recipesState.recipes
          );
        })
      );
    },
    { dispatch: false }
  );
}
