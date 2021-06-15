package biblioteka.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Kategorija;
import model.KnjigaKategorija;

public interface KnjigaKategorijaRepository extends JpaRepository<KnjigaKategorija, Integer> {
	
	public List<KnjigaKategorija> findByKategorija(Kategorija k);

}
