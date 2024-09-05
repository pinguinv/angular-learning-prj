import { createReducer, on } from "@ngrx/store";

import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatos", 15)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.ingredient],
    };
  }),
  on(ShoppingListActions.addIngredients, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.ingredients],
    };
  }),
  on(ShoppingListActions.updateIngredient, (state, action) => {
    const ingredient = state.ingredients[state.editedIngredientIndex];
    const updatedIngredient = {
      ...ingredient,
      ...action.ingredient,
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredientIndex: -1,
      editedIngredient: null,
    };
  }),
  on(ShoppingListActions.deleteIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter(
        (ing, index) => index !== state.editedIngredientIndex
      ),
      editedIngredientIndex: -1,
      editedIngredient: null,
    };
  }),
  on(ShoppingListActions.startEdit, (state, action) => {
    return {
      ...state,
      editedIngredient: { ...state.ingredients[action.index] },
      editedIngredientIndex: action.index,
    };
  }),
  on(ShoppingListActions.stopEdit, (state, action) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  })
);
