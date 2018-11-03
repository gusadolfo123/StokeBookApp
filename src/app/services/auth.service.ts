import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { UserInterface } from "../models/user.interface";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(private httpClient: HttpClient) {}

  registerUser(name: string, email: string, password: string) {
    const urlApi = "http://localhost:3500/api/Users";
    return this.httpClient
      .post<UserInterface>(urlApi, {
        name,
        email,
        password
      })
      .pipe(map(data => data));
  }

  loginUser(name: string, email: string, password: string): Observable<any> {
    const urlApi = "http://localhost:3500/api/Users/login?include=user";
    return this.httpClient
      .post<UserInterface>(
        urlApi,
        { email, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  setUser(user: UserInterface): void {
    //guardar usuario en el localstorage
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token): void {
    //guardar token en el localstorage
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(): UserInterface {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: UserInterface = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  logoutUser() {
    let accessToken = localStorage.getItem("accessToken");
    const urlApi = `http://localhost:3500/api/Users/logout?access_token=${accessToken}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.httpClient.post<UserInterface>(urlApi, {
      headers: this.headers
    });
  }
}
