import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping/shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  public recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "Pierogi Ruskie",
      "Opis pierogów",
      "https://4.bp.blogspot.com/-CqTHCJBlMXY/W8XsYbyOW1I/AAAAAAAAIZI/4t22Iw8QyDojz2XrZsfxgh1E-5KSnhivACLcBGAs/s1600/Pierogi_Berlin.JPG",
      [new Ingredient("ciasto", 1), new Ingredient("farsz", 1)]
    ),
    new Recipe(
      "Bakłażan",
      "Opis bakłażana",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.PwenmTB6-cVf4kenVTvaewHaFZ%26pid%3DApi&f=1&ipt=33677d6c402200c8d9607505b8e270fdfc3a6a779e735480d1f69999691d851b&ipo=images",
      [new Ingredient("bakłażan", 1), new Ingredient("oliwa", 1)]
    ),
  ];

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    const recipe = this.recipes[index];
    if (!recipe) {
      this.router.navigate(["/"]);
    }
    return recipe;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredientsArr: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredientsArr);
  }

  // deleteIngredient(recipeIndex: number, ingredientIndex: number) {
  //   console.log(this.recipes[recipeIndex].ingredients[ingredientIndex]);
  //   this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
  // }
}
