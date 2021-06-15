package biblioteka.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Knjiga;
import model.Korisnik;
import model.Pozajmica;

public interface PozajmicaRepository extends JpaRepository<Pozajmica, Integer>{
	
	public List<Pozajmica> findByKorisnik(Korisnik k);
	
	public List<Pozajmica> findByKorisnikAndKnjiga(Korisnik korisnik, Knjiga knjiga);

}
