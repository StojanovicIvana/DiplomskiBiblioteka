export class Korisnik {

	korisnikID!: number;
	ime?: string;
	prezime?: string;	
	email?: string;	
	brClanskeKarte?: string;
	password?: string;
	
	uloga?: {
		ulogaID: number;
		imeUloge: string;
	}
	    
}
