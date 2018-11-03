import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserInterface } from "src/app/models/user.interface";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}
  private user: UserInterface = {
    username: "",
    email: "",
    password: ""
  };
  ngOnInit() {}

  onRegister(): void {
    this.authService
      .registerUser(this.user.username, this.user.email, this.user.password)
      .subscribe((data: UserInterface) => {
        this.authService.setUser(data);
        let token = data.id;
        this.authService.setToken(token);
        //redirigo a profile
        this.router.navigate(["/user/profile"]);
      });
  }
}
