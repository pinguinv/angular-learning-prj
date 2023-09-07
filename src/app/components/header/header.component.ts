import { Component, EventEmitter, Output } from "@angular/core";
import { Subsite } from "src/app/shared/local-types";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  @Output() subsiteEmitter = new EventEmitter<Subsite>();

  showSubsite(page: Subsite) {
    this.subsiteEmitter.emit(page);
  }
}
