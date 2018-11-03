import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.css"]
})
export class HeroComponent implements OnInit {
  constructor() {}
  public title = "Book Store";
  public description =
    "This is a template for a simple marketing or informational website. It includes a large callout called a  jumbotron and three supporting pieces of content.Use it as a starting point to create something more unique.";
  ngOnInit() {}
}
