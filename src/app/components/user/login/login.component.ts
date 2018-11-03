import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserInterface } from "src/app/models/user.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  user: UserInterface = {
    username: "",
    email: "",
    password: ""
  };
  ngOnInit() {}

  onLogin(): void {
    this.authService
      .loginUser(this.user.username, this.user.email, this.user.password)
      .subscribe(
        data => {
          this.authService.setUser(data.user);
          let token = data.id;
          this.authService.setToken(token);
          //redirigo a profile
          this.router.navigate(["/user/profile"]);
          location.reload();
        },
        error => {
          console.log(error);
        }
      );
  }
}
