import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "src/app/shared/ingredient.model";
import {
  addIngredient,
  deleteIngredient,
  stopEdit,
  updateIngredient,
} from "../store/shopping-list.actions";
import * as fromShoppingList from "../store/shopping-list.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") slForm!: NgForm;
  editMode = false;
  editedIngredient: Ingredient | null = null;
  subscription?: Subscription;

  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select("shoppingList")
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedIngredient = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedIngredient!.name,
            amount: this.editedIngredient!.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  submitForm(form: NgForm) {
    const val = form.value;
    if (Number.isNaN(val.amount) || val.amount <= 0) {
      alert("Please enter correct amount!");
      this.resetForm();
      return;
    }
    const newIngredient = new Ingredient(val.name, val.amount);
    if (this.editMode && this.editedIngredient) {
      this.store.dispatch(
        updateIngredient({
          ingredient: newIngredient,
        })
      );
      // this.shoppingListService.updateIngredient(
      //   this.editedIngredientIndex,
      //   newIngredient
      // );
    } else {
      this.store.dispatch(addIngredient({ ingredient: newIngredient }));
      // this.shoppingListService.addIngredient(newIngredient);
    }
    this.resetForm();
  }

  clearForm() {
    this.resetForm();
  }

  deleteIngredient() {
    if (this.editMode) {
      this.store.dispatch(deleteIngredient());
      // this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
      this.resetForm();
    }
  }

  private resetForm() {
    this.editMode = false;
    this.editedIngredient = null;
    this.slForm.reset();
    this.store.dispatch(stopEdit());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.store.dispatch(stopEdit());
  }
}
