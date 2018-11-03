import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "front";
  public hideElement: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // para que el hero no aparesca en los controles con user y admin
        if (event.url.match("/user/") || event.url.match("/admin/")) {
          this.hideElement = true;
        } else {
          this.hideElement = false;
        }
      }
    });
  }

  ngOnInit() {}
}
