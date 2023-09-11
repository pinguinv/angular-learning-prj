import { Component, OnDestroy, OnInit } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientChanged.subscribe(
      (ingredientsArr: Ingredient[]) => {
        this.ingredients = ingredientsArr;
      }
    );
  }

  editIngredient(index: number) {
    this.shoppingListService.editing.next(index);
  }

  ngOnDestroy(): void {
    this.shoppingListService.ingredientChanged.unsubscribe();
  }
}
