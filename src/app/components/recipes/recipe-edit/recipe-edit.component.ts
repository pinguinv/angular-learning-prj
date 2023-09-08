import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  index: number = -1;
  editMode = false;

  constructor(private currentRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentRoute.params.subscribe((params: Params) => {
      this.index = +params["index"];
      this.editMode = params["index"] != null;
    });
  }
}
