import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { OffersComponent } from "./components/offers/offers.component";
import { HeroComponent } from "./components/hero/hero.component";
import { DetailsBookComponent } from "./components/details-book/details-book.component";
import { ListBooksComponent } from "./components/admin/list-books/list-books.component";
import { LoginComponent } from "./components/user/login/login.component";
import { RegisterComponent } from "./components/user/register/register.component";
import { ProfileComponent } from "./components/user/profile/profile.component";
import { Page404Component } from "./components/page404/page404.component";

// services
import { DataApiService } from "./services/data-api.service";
import { HttpClientModule } from "@angular/common/http";

// para formularios
import { FormsModule } from "@angular/forms";
import { ModalComponent } from "./components/modal/modal.component";

// pipe
import { TruncateTextPipe } from "./pipes/truncate-text.pipe";

//boostrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// importamos spinner
import { NgxSpinnerModule } from "ngx-spinner";

// importamos paginacion
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    OffersComponent,
    HeroComponent,
    DetailsBookComponent,
    ListBooksComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    Page404Component,
    ModalComponent,
    TruncateTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule,
    NgxPaginationModule
  ],
  providers: [DataApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
