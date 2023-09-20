import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  @HostBinding("class.open") isClicked: boolean = false;

  @HostListener("click")
  clicked(event: Event) {
    this.isClicked = !this.isClicked;
  }
}
