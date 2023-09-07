import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent {
  @ViewChild("nameInput") nameRef!: ElementRef;
  @ViewChild("amountInput") amountRef!: ElementRef;
  name: string = "";
  amount: number = 0;

  constructor(private shoppingListService: ShoppingListService) {}

  addIngredient() {
    this.name = this.nameRef.nativeElement.value;
    this.amount = parseFloat(this.amountRef.nativeElement.value);
    if (Number.isNaN(this.amount) || this.amount <= 0) {
      alert("Please enter correct amount!");
      return;
    }
    this.shoppingListService.addIngredient(
      new Ingredient(this.name, this.amount)
    );
  }
}
