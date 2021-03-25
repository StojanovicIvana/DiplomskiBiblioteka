package biblioteka.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Korisnik;
import model.Uloga;

public interface KorisnikRepository extends JpaRepository<Korisnik, Integer>{
	
	Korisnik findByBrClanskeKarte(String brClanskeKarte);
	
	Korisnik findByBrClanskeKarteAndPassword(String brClanskeKarte, String password);

	Boolean existsByBrClanskeKarte(String brClanskeKarte);
	
	List<Korisnik> findByUloga(Uloga u);

}
