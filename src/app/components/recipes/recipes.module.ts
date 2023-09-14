import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { RecipesRoutingMoudle } from "./recipes-routing.module";

import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipeItemComponent } from "./recipes-list/recipe-item/recipe-item.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";

@NgModule({
  declarations: [
    RecipesListComponent,
    RecipeItemComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    RecipesRoutingMoudle,
    SharedModule,
  ],
})
export class RecipesModule {}
