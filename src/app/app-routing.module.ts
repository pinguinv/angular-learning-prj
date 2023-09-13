import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipesResolver } from "./components/recipes/recipes-resolver.service";

import { RecipesComponent } from "./components/recipes/recipes.component";
import { ShoppingListComponent } from "./components/shopping/shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./components/recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./components/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./components/recipes/recipe-edit/recipe-edit.component";
import { AuthComponent } from "./components/auth/auth.component";
import { authGuardFn } from "./components/auth/auth.guard";

const appRoutes: Routes = [
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [authGuardFn],
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":index",
        component: RecipeDetailComponent,
        // resolve: [RecipesResolverService],
        resolve: [RecipesResolver],
      },
      {
        path: ":index/edit",
        component: RecipeEditComponent,
        // resolve: [RecipesResolverService],
        resolve: [RecipesResolver],
      },
    ],
  },
  { path: "shopping-list", component: ShoppingListComponent, children: [] },
  // { path: "", redirectTo: "recipes", pathMatch: "full" },
  { path: "auth", component: AuthComponent },
  { path: "**", redirectTo: "recipes" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
