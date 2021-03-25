import { Knjiga } from "./knjiga";
import { Korisnik } from "./korisnik";

export class Rezervacija {

    rezervacijaID?: number;

    knjiga?: Knjiga;
    korisnik?: Korisnik;
}
