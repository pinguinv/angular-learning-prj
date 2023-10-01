import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-manage-dropdown",
  templateUrl: "./manage-dropdown.component.html",
  styleUrls: ["./manage-dropdown.component.css"],
})
export class ManageDropdownComponent {
  @Output() manageEmitter = new EventEmitter<
    "addToShoppingList" | "editRecipe" | "deleteRecipe"
  >();

  addToShoppingList() {
    this.manageEmitter.emit("addToShoppingList");
  }

  editRecipe() {
    this.manageEmitter.emit("editRecipe");
  }

  deleteRecipe() {
    this.manageEmitter.emit("deleteRecipe");
  }
}
