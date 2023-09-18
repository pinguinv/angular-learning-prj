import { createReducer, on } from "@ngrx/store";

import { Ingredient } from "src/app/shared/ingredient.model";
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
  updateIngredient,
} from "./shopping-list.actions";

export interface AppState {
  shoppingList: State;
}

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
  on(addIngredient, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.ingredient],
    };
  }),
  on(addIngredients, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.ingredients],
    };
  }),
  on(updateIngredient, (state, action) => {
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
  on(deleteIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter(
        (ing, index) => index !== state.editedIngredientIndex
      ),
      editedIngredientIndex: -1,
      editedIngredient: null,
    };
  }),
  on(startEdit, (state, action) => {
    return {
      ...state,
      editedIngredient: { ...state.ingredients[action.index] },
      editedIngredientIndex: action.index,
    };
  }),
  on(stopEdit, (state, action) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  })
);
