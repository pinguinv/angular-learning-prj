import { Component, Input } from "@angular/core";

@Component({
  selector: "app-nav-dropdown",
  templateUrl: "./nav-dropdown.component.html",
  styleUrls: ["./nav-dropdown.component.css"],
})
export class NavDropdownComponent {
  @Input() isAuthenticated!: boolean;
}
