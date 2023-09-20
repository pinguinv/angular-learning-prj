import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription, map } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState } from "../../../store/app.reducer";
import { Recipe } from "../recipe.model";
import * as RecipesActions from "../store/recipe.actions";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  index: number = -1;
  editMode = false;
  recipeForm: FormGroup = new FormGroup({});

  private storeSub?: Subscription;

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.currentRoute.params.subscribe({
      next: (params: Params) => {
        this.index = +params["index"];
        this.editMode = params["index"] != null;
        this.initForm();
      },
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  submitForm() {
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.index, newRecipe);
      this.store.dispatch(
        RecipesActions.updateRecipe({ index: this.index, recipe: newRecipe })
      );
    } else {
      // this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(RecipesActions.addRecipe({ recipe: newRecipe }));
    }
    this.navigateOut();
  }

  private initForm() {
    const recipeCtrls = {
      name: "",
      imagePath: "",
      description: "",
      ingredients: new FormArray<any>([]),
    };

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.index);
      this.storeSub = this.store
        .select("recipes")
        .pipe(
          map((recipesState) =>
            recipesState.recipes.find((recipe, index) => index === this.index)
          )
        )
        .subscribe({
          next: (recipe) => {
            if (!recipe) {
              return;
            }

            recipeCtrls.name = recipe.name;
            recipeCtrls.imagePath = recipe.imagePath;
            recipeCtrls.description = recipe.description;
            if (recipe.ingredients) {
              for (let ingredient of recipe.ingredients) {
                recipeCtrls.ingredients.push(
                  new FormGroup({
                    name: new FormControl(ingredient.name, Validators.required),
                    amount: new FormControl(ingredient.amount, [
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/),
                    ]),
                  })
                );
              }
            }
          },
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeCtrls.name, Validators.required),
      imagePath: new FormControl(recipeCtrls.imagePath, Validators.required),
      description: new FormControl(
        recipeCtrls.description,
        Validators.required
      ),
      ingredients: recipeCtrls.ingredients,
    });
  }

  navigateOut() {
    this.router.navigate(["../"], { relativeTo: this.currentRoute });
  }

  deleteIngredient(ingredientIndex: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(ingredientIndex);
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
