import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.css"],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  @Output() detailsEmitter = new EventEmitter<Recipe>();
  recipes: Recipe[] = [];
  subscription?: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipesArr: Recipe[]) => {
        this.recipes = recipesArr;
      }
    );
  }

  newRecipe() {
    this.router.navigate(["new"], { relativeTo: this.currentRoute });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
