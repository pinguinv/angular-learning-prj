import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { ShoppingListComponent } from "./components/shopping/shopping-list/shopping-list.component";
import { RecipesListComponent } from "./components/recipes/recipes-list/recipes-list.component";
import { RecipeItemComponent } from "./components/recipes/recipes-list/recipe-item/recipe-item.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { RecipeDetailComponent } from "./components/recipes/recipe-detail/recipe-detail.component";
import { ShoppingEditComponent } from "./components/shopping/shopping-list/shopping-edit/shopping-edit.component";
import { RecipeStartComponent } from "./components/recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./components/recipes/recipe-edit/recipe-edit.component";
import { AuthComponent } from "./components/auth/auth.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { AlertComponent } from "./shared/alert/alert.component";

import { ShoppingListService } from "./components/shopping/shopping-list/shopping-list.service";
import { RecipeService } from "./components/recipes/recipe.service";
import { AuthInterceptorService } from "./components/auth/auth-interceptor.service";

import { DropdownDirective } from "./shared/dropdown.directive";
import { PlaceholderDirective } from "./shared/placeholder/placeholder.directive";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipesListComponent,
    RecipeItemComponent,
    RecipesComponent,
    RecipeDetailComponent,
    ShoppingEditComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
