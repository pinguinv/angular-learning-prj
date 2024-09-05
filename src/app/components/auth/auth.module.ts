import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";

import { AuthComponent } from "./auth.component";
import { AntiAuthGuardFn } from "./anti-auth.guard";

const routes: Routes = [
  { path: "", component: AuthComponent, canActivate: [AntiAuthGuardFn] },
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
