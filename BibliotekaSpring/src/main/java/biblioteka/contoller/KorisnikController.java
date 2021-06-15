package biblioteka.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

import biblioteka.repository.KorisnikRepository;
import biblioteka.repository.UlogaRepository;
import model.Korisnik;
import model.Uloga;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/userController")
public class KorisnikController {

	@Autowired
	UlogaRepository ur;

	@Autowired
	KorisnikRepository kr;

	@PostMapping("/login")
	public Korisnik login(@RequestBody Korisnik k) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		Korisnik korisnik = kr.findByBrClanskeKarte(k.getBrClanskeKarte());
		if (korisnik != null && passwordEncoder.matches(k.getPassword(), korisnik.getPassword())) {
			return korisnik;
		} else {
			return null;
		}
	}

	@PostMapping(value = "/saveMember")
	public Korisnik sacuvajNovogClana(@RequestBody Korisnik k) {
		Korisnik korisnik = kr.findByBrClanskeKarte(k.getBrClanskeKarte());
		if (korisnik != null) {
			return null;
		}
		Uloga u = ur.findById(2).get();
		k.setUloga(u);
		u.addKorisnik(k);

		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		k.setPassword(passwordEncoder.encode(k.getPassword()));

		return kr.save(k);
	}

	@GetMapping(value = "/getAllMembers")
	public List<Korisnik> vratiSveClanove() {
		Uloga u = ur.findById(2).get();
		return kr.findByUloga(u);
	}

	@GetMapping("/getMember")
	public Korisnik vratiClana(@RequestParam("id") int id) {
		return kr.findById(id).get();
	}

	@PutMapping("/updateInfo")
	public Korisnik izmeniPodatke(@RequestParam("id") int id, @RequestBody Korisnik korisnik) {
		Korisnik kor = kr.findById(id).get();

		if (korisnik.getIme() != null)
			kor.setIme(korisnik.getIme());
		if (korisnik.getPrezime() != null) 
			kor.setPrezime(korisnik.getPrezime());
		if (korisnik.getEmail() != null)
			kor.setEmail(korisnik.getEmail());
		if (korisnik.getPassword() != null) {
			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			kor.setPassword(passwordEncoder.encode(korisnik.getPassword()));
		}
		return kr.save(kor);
	}

	@PostMapping(value = "/saveLibrarian")
	public Korisnik sacuvajBibliotekara(@RequestBody Korisnik k) {
		Korisnik korisnik = kr.findByBrClanskeKarte(k.getBrClanskeKarte());
		if (korisnik != null) {
			return null;
		}
		Uloga u = ur.findById(1).get();
		k.setUloga(u);
		u.addKorisnik(k);

		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		k.setPassword(passwordEncoder.encode(k.getPassword()));

		return kr.save(k);
	}

	@GetMapping(value = "/getAllLibrarians")
	public List<Korisnik> vratiSveBibliotekare() {
		Uloga u = ur.findById(1).get();
		return kr.findByUloga(u);
	}
	
	@DeleteMapping("/deleteLibrarian/{id}")
	public void obrisiBibliotekara(@PathVariable int id) {
		kr.deleteById(id);
	}

	/*
	 * @PutMapping("/updateLibrarian/{id}") public Korisnik
	 * izmeniBibliotekara(@PathVariable int id, @RequestBody Korisnik k){ Korisnik
	 * korisnik = kor.findById(id).get();
	 * 
	 * korisnik.setIme(k.getIme()); korisnik.setPrezime(k.getPrezime());
	 * korisnik.setEmail(k.getEmail());
	 * 
	 * return kor.save(korisnik); }
	 */

}