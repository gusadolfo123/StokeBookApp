import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";
import { BookInterface } from "../models/book-interface";

@Injectable({
  providedIn: "root"
})
export class DataApiService {
  books: Observable<any>;
  book: Observable<any>;
  public selectedBook: BookInterface = {
    id: null,
    titulo: "",
    idioma: "",
    descripcion: "",
    portada: "",
    precio: "",
    link_amazon: "",
    autor: "",
    oferta: ""
  };

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: this.authService.getToken()
  });

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getAllBooks() {
    // libros que no estan en oferta
    const urlApi = "http://localhost:3500/api/books";
    return this.httpClient.get(urlApi);
  }

  getAllBooksNotOffers() {
    // libros que no estan en oferta
    const urlApi = "http://localhost:3500/api/books?filter[where][oferta]=0";
    return this.httpClient.get(urlApi);
  }

  getBookById(id: string) {
    const urlApi = "http://localhost:3500/api/books/";
    return this.httpClient.get(urlApi + id);
  }

  getOffers() {
    // filtros de loopback en oferta
    const urlApi = "http://localhost:3500/api/books?filter[where][oferta]=1";
    return this.httpClient.get(urlApi);
  }

  saveBook(book: BookInterface) {
    //TODO: Obtener Token
    //TODO: not null
    const token = this.authService.getToken();
    const urlApi = `http://localhost:3500/api/books?access_token=${token}`;
    return this.httpClient
      .post<BookInterface>(urlApi, book, { headers: this.headers })
      .pipe(map(data => data));
  }

  updateBook(book) {
    //TODO: Obtener Token
    //TODO: not null
    const token = this.authService.getToken();
    const id = book.bookId;
    const urlApi = `http://localhost:3500/api/books/${id}?access_token=${token}`;
    return this.httpClient
      .put<BookInterface>(urlApi, book, { headers: this.headers })
      .pipe(map(data => data));
  }

  deleteBook(id: string) {
    //TODO: Obtener Token
    //TODO: not null
    const token = this.authService.getToken();
    const urlApi = `http://localhost:3500/api/books/${id}?access_token=${token}`;
    return this.httpClient
      .delete<BookInterface>(urlApi, { headers: this.headers })
      .pipe(
        map(data => {
          data;
        })
      );
  }
}
