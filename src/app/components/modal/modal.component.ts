import { Component, OnInit, Output, Input } from "@angular/core";
import { DataApiService } from "src/app/services/data-api.service";
import { BookInterface } from "../../models/book-interface";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
  @Input()
  reload: Function;

  closeResult: string;
  constructor(
    private dataApi: DataApiService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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

  onSaveBook(bookForm: NgForm): void {
    if (bookForm.value.bookId == null) {
      //new
      this.dataApi.saveBook(bookForm.value).subscribe(
        (book: BookInterface) => {
          let element: HTMLElement = document.querySelector(
            "ngb-modal-window"
          ) as HTMLElement;
          element.click();
          this.reload();
        },
        error => console.log(error)
      );
    } else {
      //update
      this.dataApi.updateBook(bookForm.value).subscribe(
        (book: BookInterface) => {
          let element: HTMLElement = document.querySelector(
            "ngb-modal-window"
          ) as HTMLElement;
          element.click();
          this.reload();
        },
        error => console.log(error)
      );
    }
  }
}
