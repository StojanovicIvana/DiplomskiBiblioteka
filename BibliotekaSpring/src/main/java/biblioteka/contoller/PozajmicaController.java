package biblioteka.contoller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import biblioteka.repository.KnjigaRepository;
import biblioteka.repository.KorisnikRepository;
import biblioteka.repository.PozajmicaRepository;
import biblioteka.repository.RezervacijaRepository;
import model.Knjiga;
import model.Korisnik;
import model.Pozajmica;
import model.Rezervacija;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/lendController")
public class PozajmicaController {

	@Autowired
	PozajmicaRepository pr;

	@Autowired
	RezervacijaRepository rr;

	@Autowired
	KorisnikRepository kor;

	@Autowired
	KnjigaRepository kr;

	@GetMapping("/getAllLends")
	public List<Pozajmica> vratiSvePozajmice() {
		List<Pozajmica> pozajmice = pr.findAll();
		Collections.sort(pozajmice);
		List<Pozajmica> neVraceneStampane = new ArrayList<Pozajmica>();
		for (Pozajmica p : pozajmice) {
			if (p.getDatumVracanja() == null && p.getKnjiga().getFormat().getFormatID() == 1) {
				neVraceneStampane.add(p);
			}
		}
		return neVraceneStampane;
	}

	@GetMapping("/getSpecLend")
	public Pozajmica vratiPozajmicuZaClana(@RequestParam("idClana") int idClana, @RequestParam("idKnjige") int idKnjige) {
		Knjiga k = kr.findById(idKnjige).get();
		Korisnik clan = kor.findById(idClana).get();
		List<Pozajmica> pozajmice = new ArrayList<Pozajmica>();
		if (k != null && clan != null) {
			pozajmice = pr.findByKorisnikAndKnjiga(clan, k);
		}
		if (pozajmice != null) {
			for (Pozajmica p : pozajmice) {
				if (p.getDatumVracanja() == null || p.getDatumVracanja().compareTo(LocalDate.now().toString()) > 0) {
					return p;
				}
			}
		}
		return null;
	}

	@PostMapping("/saveLend")
	public Pozajmica sacuvajPozajmicu(@RequestParam("idClana") int idClana, @RequestBody int idKnjige) {
		Pozajmica poz = new Pozajmica();
		Knjiga k = kr.findById(idKnjige).get();
		poz.setKnjiga(k);
		Korisnik clan = kor.findById(idClana).get();
		poz.setKorisnik(clan);

		LocalDate ld = LocalDate.now();
		String datumPreuzimanja = ld.toString();
		poz.setDatumPreuzimanja(datumPreuzimanja);

		if (k.getFormat().getFormatID() != 1) {
			LocalDate dv = ld.plusDays(30);
			String datumVracanja = dv.toString();
			poz.setDatumVracanja(datumVracanja);
		}

		k.addPozajmica(poz);
		clan.addPozajmica(poz);
		
		if (k.getFormat().getFormatID() == 1) {
			k.setDostupno(k.getDostupno() - 1);
		}	

		return pr.save(poz);
	}

	@PutMapping("/returnBook")
	public Pozajmica vratiKnjiguUBiblioteku(@RequestParam("idPozajmice") int id, @RequestBody String datumV) {
		Pozajmica p = pr.findById(id).get();
		p.setDatumVracanja(datumV);

		Knjiga k = p.getKnjiga();
		k.setDostupno(k.getDostupno() + 1);

		return pr.save(p);
	}

	@GetMapping("/getLendsForMember")
	public List<Pozajmica> vratiKorisnikovePozajmice(@RequestParam("idClana") int idClana) {
		List<Pozajmica> pozajmice = new ArrayList<Pozajmica>();
		Korisnik k = kor.findById(idClana).get();
		if (k != null) {
			pozajmice = pr.findByKorisnik(k);
			Collections.sort(pozajmice);
			for (Pozajmica p : pozajmice) {
				if (p.getDatumVracanja() == null) {
					p.setDatumVracanja("Nije vracena");
				}
			}
		}
		return pozajmice;
	}

	@PostMapping("/saveReservation")
	public Rezervacija sacuvajRezervaciju(@RequestParam("idClana") int idClana, @RequestBody int idKnjige) {
		Rezervacija rez = new Rezervacija();
		Knjiga k = kr.findById(idKnjige).get();
		rez.setKnjiga(k);
		Korisnik clan = kor.findById(idClana).get();
		rez.setKorisnik(clan);

		k.addRezervacija(rez);
		clan.addRezervacija(rez);

		return rr.save(rez);
	}

	@GetMapping("/getReservationsForMember")
	public List<Rezervacija> vratiKorisnikoveRezervacije(@RequestParam("idClana") int idClana) {
		List<Rezervacija> rezervacije = new ArrayList<Rezervacija>();
		Korisnik k = kor.findById(idClana).get();
		if (k != null) {
			rezervacije = rr.findByKorisnik(k);
		}
		return rezervacije;
	}

	@DeleteMapping("/deleteReservation/{id}")
	public void obrisiRezervaciju(@PathVariable int id) {
		rr.deleteById(id);
	}

}
