import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { ShoppingListComponent } from "./components/shopping/shopping-list/shopping-list.component";
import { RecipesListComponent } from "./components/recipes/recipes-list/recipes-list.component";
import { RecipeItemComponent } from "./components/recipes/recipes-list/recipe-item/recipe-item.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { RecipeDetailComponent } from "./components/recipes/recipe-detail/recipe-detail.component";
import { ShoppingEditComponent } from "./components/shopping/shopping-list/shopping-edit/shopping-edit.component";
import { FormsModule } from "@angular/forms";
import { DropdownDirective } from "./shared/dropdown.directive";
import { ShoppingListService } from "./components/shopping/shopping-list/shopping-list.service";

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
  ],
  imports: [BrowserModule, FormsModule],
  providers: [ShoppingListService],
  bootstrap: [AppComponent],
})
export class AppModule {}
