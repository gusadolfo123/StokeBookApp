import { Component, OnInit } from "@angular/core";
import { DataApiService } from "src/app/services/data-api.service";
import { BookInterface } from "../../models/book-interface";
import { NgForm } from "@angular/forms";
import { Location } from "@angular/common"; // para hacer refresh de la vista
import { Router } from "@angular/router";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
  constructor(
    private dataApi: DataApiService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}

  onSaveBook(bookForm: NgForm): void {
    if (bookForm.value.bookId == null) {
      //new
      this.dataApi.saveBook(bookForm.value).subscribe(
        (book: BookInterface) => {
          //location.reload();
          this.router.navigate(["/books/", book.id]);

          // se remueve el background del modal para no refrescar pagina
          let modal = document.getElementsByClassName("modal-backdrop")[0];
          modal.parentNode.removeChild(modal);

          let body = document.querySelector("body");
          body.removeAttribute("class");
        },
        error => console.log(error)
      );
    } else {
      //update
      this.dataApi.updateBook(bookForm.value).subscribe(
        (book: BookInterface) => {
          // modifica la Url
          //this.location.go("/books/" + bookForm.value.bookId);
          //console.log(this.location.path());
          //location.reload();
          $("#modalBook").modal("hide");
          //this.location.go("/books/" + bookForm.value.bookId);
          //this.router.navigate(["/books/" + bookForm.value.bookId]);
          // se remueve el background del modal para no refrescar pagina
          // let modal = document.getElementsByClassName("modal-backdrop")[0];
          // modal.parentNode.removeChild(modal);

          // let body = document.querySelector("body");
          // body.removeAttribute("class");
        },
        error => console.log(error)
      );
    }
  }
}
