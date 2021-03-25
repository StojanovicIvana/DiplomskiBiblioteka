package biblioteka.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;

import model.Format;
import model.Knjiga;

public interface KnjigaRepository extends JpaRepository<Knjiga, Integer> {
	
	/*@Query("SELECT k FROM Knjiga k WHERE k.format LIKE :formatID")
	public List<Knjiga> findByFormat(@Param("formatID") int formatID);*/
	
	public List<Knjiga> findByFormat(Format f);

	

}
