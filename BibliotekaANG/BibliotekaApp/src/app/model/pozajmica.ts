import { Knjiga } from "./knjiga";
import { Korisnik } from "./korisnik";

export class Pozajmica {

    pozajmicaID?: number;

    datumPreuzimanja?: string;
    datumVracanja?: string;

    knjiga?: Knjiga;
    korisnik?: Korisnik;

}
