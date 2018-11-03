import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // metodoq eu se encargara de validar si un usuario puede o no acceder a una ruta
  canActivate() {
    // valida si estamos logeados
    if (this.authService.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(["/user/login"]);
      return false;
    }
  }
}
