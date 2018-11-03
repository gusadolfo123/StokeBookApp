import { Component, OnInit } from "@angular/core";
import { DataApiService } from "src/app/services/data-api.service";
import { Router } from "@angular/router";
import { BookInterface } from "src/app/models/book-interface";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-list-books",
  templateUrl: "./list-books.component.html",
  styleUrls: ["./list-books.component.css"]
})
export class ListBooksComponent implements OnInit {
  constructor(private dataApi: DataApiService, private router: Router) {}
  private books: BookInterface[];

  ngOnInit() {
    this.getListBooks();
  }

  getListBooks(): void {
    this.dataApi.getAllBooks().subscribe((response: BookInterface[]) => {
      this.books = response;
    });
  }

  onDeleteBook(id: string): void {
    if (confirm("Are you sure of delete this Book?")) {
      this.dataApi.deleteBook(id).subscribe();
      this.books = this.books.filter(element => {
        return element.id != id;
      });
    }
  }
  onPreUpdate(book: BookInterface) {
    this.dataApi.selectedBook = Object.assign({}, book);
  }

  resetForm(): void {
    this.dataApi.selectedBook = {
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
  }
}
