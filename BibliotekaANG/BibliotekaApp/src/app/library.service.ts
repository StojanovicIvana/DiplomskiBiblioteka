import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from './model/autor';
import { Format } from './model/format';
import { Kategorija } from './model/kategorija';
import { Knjiga } from './model/knjiga';
import { Korisnik } from './model/korisnik';
import { Pozajmica } from './model/pozajmica';
import { Rezervacija } from './model/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private baseURL = "http://localhost:8181/BibliotekaSpring/";
 
  constructor(private httpClient: HttpClient) { }

  getAllBooks(): Observable<Knjiga[]> {
    return this.httpClient.get<Knjiga[]>(`${this.baseURL}bookController/getAllBooks`);    
  }

  getBookById(id: number): Observable<Knjiga> {
    return this.httpClient.get<Knjiga>(`${this.baseURL}bookController/getBook?id=${id}`);
  }

  getBooksByCategory(id: number): Observable<Knjiga[]> {
    return this.httpClient.get<Knjiga[]>(`${this.baseURL}bookController/getBooksByCategory?id=${id}`);
  }

  newBook(knjiga: Knjiga): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}bookController/saveBook`, knjiga);
  }

  getAllAuthors(): Observable<Autor[]> {
    return this.httpClient.get<Autor[]>(`${this.baseURL}bookController/getAllAuthors`);    
  }

  getAuthor(id: number): Observable<Autor> {
    return this.httpClient.get<Autor>(`${this.baseURL}bookController/getAuthor?id=${id}`);
  }

  newAuthor(autor: Autor): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}bookController/saveAuthor`, autor);
  }

  getLibrarianList(): Observable<Korisnik[]>{
    return this.httpClient.get<Korisnik[]>(`${this.baseURL}userController/getAllLibrarians`);
  }  

  deleteLibrarian(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}userController/deleteLibrarian/${id}`);
  }

  getAllMembers(): Observable<Korisnik[]>{
    return this.httpClient.get<Korisnik[]>(`${this.baseURL}userController/getAllMembers`);
  }  

  getAllFormats(): Observable<Format[]> {
    return this.httpClient.get<Format[]>(`${this.baseURL}bookController/getAllFormats`);    
  }

  getFormat(id: number): Observable<Format> {
    return this.httpClient.get<Format>(`${this.baseURL}bookController/getFormat?id=${id}`);
  }

  getAllCategories(): Observable<Kategorija[]> {
    return this.httpClient.get<Kategorija[]>(`${this.baseURL}bookController/getAllCategories`);    
  }

  sendChosenCategories(id: number, odabraneKat: Kategorija[]): Observable<any> {
    return this.httpClient.post(`${this.baseURL}bookController/chooseCategories?id=${id}`, odabraneKat);
  }

  saveBookPicture(id: number, slika: FormData): Observable<any> {
    return this.httpClient.put(`${this.baseURL}bookController/addPicture?id=${id}`, slika); 
  }

  saveBookFile(id: number, fajl: FormData): Observable<any> {
    return this.httpClient.put(`${this.baseURL}bookController/addFile?id=${id}`, fajl); 
  }

  login(korisnik: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}userController/login`, korisnik);
  }

  newLibrarian(korisnik: Korisnik): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}userController/saveLibrarian`, korisnik);
  }

  newMember(korisnik: Korisnik): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}userController/saveMember`, korisnik);
  }

  getMember(id: number): Observable<Korisnik> {
    return this.httpClient.get<Korisnik>(`${this.baseURL}userController/getMember?id=${id}`);
  }

  updateInfo(korisnikID: any, korisnik: Korisnik): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}userController/updateInfo?id=${korisnikID}`, korisnik);
  }

  getAllLends(): Observable<Pozajmica[]> {
    return this.httpClient.get<Pozajmica[]>(`${this.baseURL}lendController/getAllLends`);    
  }

  getBooksByFormat(id: number): Observable<Knjiga[]> {
    return this.httpClient.get<Knjiga[]>(`${this.baseURL}bookController/getBooksByFormat?id=${id}`);
  }

  newLend(idKnjige: number, idClana: number): Observable<Pozajmica> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(`${this.baseURL}lendController/saveLend?idClana=${idClana}`, idKnjige, {headers: headers});
  }

  returnBook(idPozajmice: number, datumVracanja: string): Observable<Pozajmica> {
    return this.httpClient.put(`${this.baseURL}lendController/returnBook?idPozajmice=${idPozajmice}`, datumVracanja);
  }

  getLendsForMember(id: number): Observable<Pozajmica[]> {
    return this.httpClient.get<Pozajmica[]>(`${this.baseURL}lendController/getLendsForMember?idClana=${id}`);    
  }

  newReservation(idKnjige: number, idClana: number): Observable<Rezervacija> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(`${this.baseURL}lendController/saveReservation?idClana=${idClana}`, idKnjige, {headers: headers});
  }

  getReservationsForMember(id: number): Observable<Rezervacija[]> {
    return this.httpClient.get<Rezervacija[]>(`${this.baseURL}lendController/getReservationsForMember?idClana=${id}`);    
  }

  deleteReservation(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}lendController/deleteReservation/${id}`);
  }

  isItLent(idKnjige: number, idClana: number): Observable<Pozajmica> {
    return this.httpClient.get(`${this.baseURL}lendController/getSpecLend?idKnjige=${idKnjige}&idClana=${idClana}`);
  }

}