import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "src/app/shared/ingredient.model";
import { LoggingService } from "src/app/logging.service";
import { startEdit } from "./store/shopping-list.actions";
import * as fromApp from "../../../store/app.reducer";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {
    this.ingredients = this.store.select("shoppingList");
  }

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");

    this.loggingService.printLog("yo, ShoppingListComponent ngOnInit");
  }

  editIngredient(index: number) {
    this.store.dispatch(startEdit({ index: index }));
  }
}
