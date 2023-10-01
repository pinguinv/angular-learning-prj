import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState } from "../../../store/app.reducer";
import { Recipe } from "../recipe.model";
import * as RecipesActions from "../store/recipe.actions";
import * as ShoppingListActions from "../../shopping/shopping-list/store/shopping-list.actions";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeInfo?: Recipe;
  index: number = -1;
  showDropdown = false;

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.currentRoute.params
      .pipe(
        map((params) => +params["index"]),
        switchMap((index) => {
          this.index = index;
          return this.store.select("recipes");
        }),
        map((recipesState) =>
          recipesState.recipes.find((recipe, index) => index === this.index),
        ),
      )
      .subscribe({
        next: (recipe) => {
          this.recipeInfo = recipe;
        },
      });
  }

  private addToShoppingList() {
    this.store.dispatch(
      ShoppingListActions.addIngredients({
        ingredients: this.recipeInfo!.ingredients,
      }),
    );
  }

  private editRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.currentRoute });
  }

  private deleteRecipe() {
    // this.recipeService.deleteRecipe(this.index);
    this.store.dispatch(RecipesActions.deleteRecipe({ index: this.index }));
    this.router.navigate(["../"], { relativeTo: this.currentRoute });
  }

  onEmit(event: "addToShoppingList" | "editRecipe" | "deleteRecipe") {
    switch (event) {
      case "addToShoppingList":
        this.addToShoppingList();
        break;
      case "editRecipe":
        this.editRecipe();
        break;
      case "deleteRecipe":
        this.deleteRecipe();
        break;
    }
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
