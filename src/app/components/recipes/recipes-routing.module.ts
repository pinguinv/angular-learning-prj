import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

import { AuthGuardFn } from "../auth/auth.guard";
import { RecipesResolverFn } from "./recipes-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: RecipesComponent,
    canActivate: [AuthGuardFn],
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":index",
        component: RecipeDetailComponent,
        resolve: [RecipesResolverFn],
      },
      {
        path: ":index/edit",
        component: RecipeEditComponent,
        resolve: [RecipesResolverFn],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingMoudle {}
