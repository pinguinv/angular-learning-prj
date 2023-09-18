import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription, of } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "src/app/shared/ingredient.model";
import { LoggingService } from "src/app/logging.service";
import * as fromShoppingList from "./store/shopping-list.reducer";
import { startEdit } from "./store/shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private subscription?: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromShoppingList.AppState>
  ) {
    this.ingredients = this.store.select("shoppingList");
  }

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientChanged.subscribe({
    //   next: (ingredientsArr: Ingredient[]) => {
    //     this.ingredients = ingredientsArr;
    //   },
    // });

    this.loggingService.printLog("yo, ShoppingListComponent ngOnInit");
  }

  editIngredient(index: number) {
    // this.shoppingListService.editing.next(index);
    this.store.dispatch(startEdit({ index: index }));
  }

  ngOnDestroy(): void {
    // this.subscription?.unsubscribe();
  }
}
