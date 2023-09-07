import { EventEmitter } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";

export class ShoppingListService {
  public ingredientChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatos", 15),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredientsArr: Ingredient[]) {
    this.ingredients.push(...ingredientsArr);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
