import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { LoggingService } from "./logging.service";
import { AppState } from "./store/app.reducer";
import * as AuthActions from "./components/auth/store/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private loggingService: LoggingService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
    this.loggingService.printLog("yo, AppComponent ngOnInit");
  }
}
