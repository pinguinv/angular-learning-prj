import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";

import { shoppingListReducer } from "./components/shopping/shopping-list/store/shopping-list.reducer";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }, {}),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
