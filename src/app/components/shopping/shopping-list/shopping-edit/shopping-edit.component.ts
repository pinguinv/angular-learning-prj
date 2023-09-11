import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") slForm!: NgForm;
  editMode = false;
  editedIngredientIndex?: number;
  editedIngredient?: Ingredient;
  subscription?: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.editing.subscribe(
      (index: number) => {
        this.editedIngredientIndex = index;
        this.editMode = true;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount,
        });
      }
    );
  }

  submitForm(form: NgForm) {
    const val = form.value;
    if (Number.isNaN(val.amount) || val.amount <= 0) {
      alert("Please enter correct amount!");
      this.resetForm();
      return;
    }
    const newIngredient = new Ingredient(val.name, val.amount);
    if (
      this.editMode &&
      this.editedIngredientIndex != null &&
      this.editedIngredient
    ) {
      this.shoppingListService.updateIngredient(
        this.editedIngredientIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.resetForm();
  }

  clearForm() {
    this.resetForm();
  }

  deleteIngredient() {
    if (this.editMode && this.editedIngredientIndex != null) {
      this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
      this.resetForm();
    }
  }

  private resetForm() {
    this.editMode = false;
    this.editedIngredient = undefined;
    this.editedIngredientIndex = undefined;
    this.slForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
