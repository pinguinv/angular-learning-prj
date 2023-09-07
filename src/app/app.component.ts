import { Component } from "@angular/core";
import { Subsite } from "./shared/local-types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  subsite: Subsite = "recipes";

  setSubsite(site: Subsite) {
    this.subsite = site;
  }
}
