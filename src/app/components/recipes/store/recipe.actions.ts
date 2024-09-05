import { createAction, props } from "@ngrx/store";

import { Recipe } from "../recipe.model";

export const setRecipes = createAction(
  "[Recipes] Set Recipes",
  props<{ recipes: Recipe[] }>()
);

export const saveRecipes = createAction("[Recipes] Save Recipes");

export const fetchRecipes = createAction("[Recipes] Fetch Recipes");

export const addRecipe = createAction(
  "[Recipes] Add Recipes",
  props<{ recipe: Recipe }>()
);

export const updateRecipe = createAction(
  "[Recipes] Update Recipes",
  props<{ index: number; recipe: Recipe }>()
);

export const deleteRecipe = createAction(
  "[Recipes] Delete Recipes",
  props<{ index: number }>()
);
