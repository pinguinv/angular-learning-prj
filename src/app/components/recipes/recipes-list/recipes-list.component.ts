import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, map } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState } from "../../../store/app.reducer";
import { Recipe } from "../recipe.model";

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
    private router: Router,
    private currentRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select("recipes")
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe({
        next: (recipesArr: Recipe[]) => {
          this.recipes = recipesArr;
        },
      });
  }

  newRecipe() {
    this.router.navigate(["new"], { relativeTo: this.currentRoute });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
