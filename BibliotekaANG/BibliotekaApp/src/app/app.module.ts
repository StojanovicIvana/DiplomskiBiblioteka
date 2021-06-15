import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { NewAuthorComponent } from './components/new-author/new-author.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { LoginComponent } from './components/login/login.component';
import { NewLibrarianComponent } from './components/new-librarian/new-librarian.component';
import { AdminComponent } from './components/admin/admin.component';
import { ChooseFormatComponent } from './components/new-book/choose-format/choose-format.component';
import { ChooseCategoryComponent } from './components/new-book/choose-category/choose-category.component';
import { ChooseAuthorComponent } from './components/new-book/choose-author/choose-author.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddPictureComponent } from './components/new-book/add-picture/add-picture.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { AllMembersComponent } from './components/all-members/all-members.component';
import { FilterPipe } from './filter.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';
import { AllLendsComponent } from './components/all-lends/all-lends.component';
import { BooksByFormatComponent } from './components/books-by-format/books-by-format.component';
import { ChooseDateComponent } from './components/choose-date/choose-date.component';
import { BooksByCategoryComponent } from './components/books-by-category/books-by-category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AllBooksComponent,
    BookInfoComponent,
    NewAuthorComponent,
    NewBookComponent,
    LoginComponent,
    NewLibrarianComponent,
    AdminComponent,
    ChooseFormatComponent,
    ChooseCategoryComponent,
    ChooseAuthorComponent,
    AddPictureComponent,
    NewUserComponent,
    AllMembersComponent,
    FilterPipe,
    ProfileComponent,
    UpdateInfoComponent,
    AllLendsComponent,
    BooksByFormatComponent,
    ChooseDateComponent,
    BooksByCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
