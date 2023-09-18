import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../components/recipes/recipe.service";
import { Recipe } from "../components/recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../components/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();

    // można tu dać return i subscribe w headerze żeby pokazać jakąś ikonkę ładowania czy cuś
    this.http
      .put<Recipe[]>(
        "https://angular-lrn-prjct-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
        recipes
      )
      .subscribe({
        next: (response) => {
          // console.log(response);
        },
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        "https://angular-lrn-prjct-default-rtdb.europe-west1.firebasedatabase.app/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
