import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeInfo?: Recipe;
  index: number = -1;

  constructor(
    private recipeService: RecipeService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentRoute.params.subscribe((params: Params) => {
      this.index = params["index"];
      this.recipeInfo = this.recipeService.getRecipe(+this.index);
    });
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.recipeInfo!.ingredients
    );
  }

  editRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.currentRoute });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(["../"], { relativeTo: this.currentRoute });
  }
}
