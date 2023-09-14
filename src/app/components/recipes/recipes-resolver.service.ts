import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

export const RecipesResolverFn: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  dataStorageService: DataStorageService = inject(DataStorageService),
  recipeService: RecipeService = inject(RecipeService)
) => {
  const recipes = recipeService.getRecipes();

  if (recipes.length === 0) {
    return dataStorageService.fetchRecipes();
  }
  return recipes;
};

// @Injectable({
//   providedIn: "root",
// })
// export class RecipesResolverService implements Resolve<Recipe[]> {
//   constructor(private dataStorageService: DataStorageService) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.dataStorageService.fetchRecipes();
//   }
// }
