import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, map } from "rxjs";
import { Store } from "@ngrx/store";

import { User } from "../auth/user.model";
import { AppState } from "src/app/store/app.reducer";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub?: Subscription;
  isAuthenticated = false;
  navDropdown = false;
  userDropdown = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select("auth")
      .pipe(map((authState) => authState.user))
      .subscribe({
        next: (user: User | null) => {
          this.isAuthenticated = !!user;
        },
      });
  }

  toggleNavDropdown() {
    this.navDropdown = !this.navDropdown;
  }

  toggleUserDropdown() {
    this.userDropdown = !this.userDropdown;
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
