import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "recipes", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("./components/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "recipes",
    loadChildren: () =>
      import("./components/recipes/recipes.module").then(
        (m) => m.RecipesModule
      ),
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./components/shopping/shopping-list/shopping-list.module").then(
        (m) => m.ShoppingListModule
      ),
  },
  // { path: "**", redirectTo: "recipes" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
