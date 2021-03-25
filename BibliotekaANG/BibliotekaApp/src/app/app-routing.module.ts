import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService as RoleGuard } from './role-guard.service';
import { AddPictureComponent } from './components/new-book/add-picture/add-picture.component';
import { AdminComponent } from './components/admin/admin.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { NewAuthorComponent } from './components/new-author/new-author.component';
import { ChooseAuthorComponent } from './components/new-book/choose-author/choose-author.component';
import { ChooseCategoryComponent } from './components/new-book/choose-category/choose-category.component';
import { ChooseFormatComponent } from './components/new-book/choose-format/choose-format.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { NewLibrarianComponent } from './components/new-librarian/new-librarian.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { AllMembersComponent } from './components/all-members/all-members.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AllLendsComponent } from './components/all-lends/all-lends.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';

const routes: Routes = [
  {path: '', redirectTo: 'library', pathMatch: 'full'},
  {path: 'library', component: AllBooksComponent},
  {path: 'book-info/:id', component: BookInfoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: {expectedRole: 'Admin'}},
  {path: 'new-librarian', component: NewLibrarianComponent, canActivate: [RoleGuard], data: {expectedRole: 'Admin'}},  
  {path: 'new-author', component: NewAuthorComponent, canActivate: [RoleGuard], data: {expectedRole: 'Bibliotekar'}},
  {path: 'choose-format/choose-author/:formatID/new-book/:autorID', component: NewBookComponent, canActivate: [RoleGuard], data: {expectedRole: 'Bibliotekar'}},
  {path: 'choose-format', component: ChooseFormatComponent, canActivate: [RoleGuard], data: {expectedRole: 'Bibliotekar'}},
  {path: 'choose-format/choose-author/:formatID', component: ChooseAuthorComponent, canActivate: [RoleGuard], data: {expectedRole: 'Bibliotekar'}},
  {path: 'choose-category/:knjigaID', component: ChooseCategoryComponent, canActivate: [RoleGuard], data: {expectedRole: 'Bibliotekar'}},
  {path: 'add-picture/:knjigaID', component: AddPictureComponent, canActivate: [RoleGuard], data: {expectedRole: 'Bibliotekar'}},
  {path: 'new-member', component: NewUserComponent, canActivate: [RoleGuard], data: {expectedRole: 'Bibliotekar'}},
  {path: 'all-members', component: AllMembersComponent, canActivate: [RoleGuard], data: {expectedRole: 'Bibliotekar'}},  
  {path: 'profile', component: ProfileComponent, canActivate:[RoleGuard], data: {expectedRole: 'Clan'}},
  {path: 'update-info', component:  UpdateInfoComponent, canActivate:[RoleGuard], data: {expectedRole: 'Clan'}},
  {path: 'profile/:clanID', component: ProfileComponent, canActivate:[RoleGuard], data: {expectedRole: 'Bibliotekar'}},
  {path: 'all-lends', component: AllLendsComponent, canActivate:[RoleGuard], data: {expectedRole: 'Bibliotekar'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
