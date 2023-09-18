import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const addIngredient = createAction(
  "[Shopping-list] addIngredient",
  props<{ ingredient: Ingredient }>()
);

export const addIngredients = createAction(
  "[Shopping-list] addIngredients",
  props<{ ingredients: Ingredient[] }>()
);

export const updateIngredient = createAction(
  "[Shopping-list] updateIngredient",
  props<{ ingredient: Ingredient }>()
);

export const deleteIngredient = createAction(
  "[Shopping-list] deleteIngredient"
);

export const startEdit = createAction(
  "[Shopping-list] startEdit",
  props<{ index: number }>()
);

export const stopEdit = createAction("[Shopping-list] stopEdit");
