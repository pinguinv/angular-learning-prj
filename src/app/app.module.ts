import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { ShoppingListComponent } from "./components/shopping/shopping-list/shopping-list.component";
import { RecipesListComponent } from "./components/recipes/recipes-list/recipes-list.component";
import { RecipeItemComponent } from "./components/recipes/recipes-list/recipe-item/recipe-item.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { RecipeDetailComponent } from "./components/recipes/recipe-detail/recipe-detail.component";
import { ShoppingEditComponent } from "./components/shopping/shopping-list/shopping-edit/shopping-edit.component";

import { ShoppingListService } from "./components/shopping/shopping-list/shopping-list.service";

import { DropdownDirective } from "./shared/dropdown.directive";
import { AppRoutingModule } from "./app-routing.module";
import { RecipeStartComponent } from "./components/recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./components/recipes/recipe-edit/recipe-edit.component";
import { RecipeService } from "./components/recipes/recipe.service";

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
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  providers: [ShoppingListService, RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
