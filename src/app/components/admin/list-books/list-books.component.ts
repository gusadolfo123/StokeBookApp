import { Component, OnInit } from "@angular/core";
import { DataApiService } from "src/app/services/data-api.service";
import { BookInterface } from "src/app/models/book-interface";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-list-books",
  templateUrl: "./list-books.component.html",
  styleUrls: ["./list-books.component.css"]
})
export class ListBooksComponent implements OnInit {
  constructor(
    private dataApi: DataApiService,
    private modalService: NgbModal
  ) {}
  currentpage: number = 1;
  private books: BookInterface[];

  closeResult: string;
  public rerender = false;

  ngOnInit() {
    this.getListBooks();
  }

  doRerender = () => {
    this.getListBooks();
  };

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "lg" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    this.resetForm();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
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

  onPreUpdate(book: BookInterface, content: any) {
    this.open(content);
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
