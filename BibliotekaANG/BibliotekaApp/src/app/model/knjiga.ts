import { Autor } from "./autor";
import { Format } from "./format";

export class Knjiga {

    knjigaID?: number;
    naslov?: string;
    opis?: string;
    brPrimeraka?: number;
    dostupno?: number;    
    slika?: File;
    fajl?: string;
    format?: Format;
    autor?: Autor;

}