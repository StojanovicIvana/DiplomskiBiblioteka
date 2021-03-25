package biblioteka.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Korisnik;
import model.Rezervacija;

public interface RezervacijaRepository extends JpaRepository<Rezervacija, Integer> {
	
	public List<Rezervacija> findByKorisnik(Korisnik k);

}
