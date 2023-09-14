import { NgModule } from "@angular/core";

import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { ShoppingListService } from "./components/shopping/shopping-list/shopping-list.service";
import { RecipeService } from "./components/recipes/recipe.service";
import { AuthInterceptorService } from "./components/auth/auth-interceptor.service";

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
