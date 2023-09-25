import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavDropdownComponent } from "./components/header/nav-dropdown/nav-dropdown.component";
import { UserDropdownComponent } from "./components/header/user-dropdown/user-dropdown.component";

import { appReducer } from "./store/app.reducer";
import { AuthEffects } from "./components/auth/store/auth.effects";
import { RecipeEffects } from "./components/recipes/store/recipe.effects";

import { environment } from "src/environments/environment.development";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavDropdownComponent,
    UserDropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(appReducer, {}),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
