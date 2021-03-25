package model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The persistent class for the pozajmica database table.
 * 
 */
@Entity
@NamedQuery(name = "Pozajmica.findAll", query = "SELECT p FROM Pozajmica p")
public class Pozajmica implements Serializable, Comparable<Pozajmica> {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pozajmicaID;

	private String datumPreuzimanja;

	private String datumVracanja;

	// bi-directional many-to-one association to Knjiga
	@ManyToOne
	@JoinColumn(name = "knjigaID")
	private Knjiga knjiga;

	// bi-directional many-to-one association to Korisnik
	@ManyToOne
	@JoinColumn(name = "korisnikID")
	private Korisnik korisnik;

	public Pozajmica() {
	}

	public int getPozajmicaID() {
		return this.pozajmicaID;
	}

	public void setPozajmicaID(int pozajmicaID) {
		this.pozajmicaID = pozajmicaID;
	}

	public String getDatumPreuzimanja() {
		return this.datumPreuzimanja;
	}

	public void setDatumPreuzimanja(String datumPruzimanja) {
		this.datumPreuzimanja = datumPruzimanja;
	}

	public String getDatumVracanja() {
		return this.datumVracanja;
	}

	public void setDatumVracanja(String datumVracanja) {
		this.datumVracanja = datumVracanja;
	}

	public Knjiga getKnjiga() {
		return this.knjiga;
	}

	public void setKnjiga(Knjiga knjiga) {
		this.knjiga = knjiga;
	}

	public Korisnik getKorisnik() {
		return this.korisnik;
	}

	public void setKorisnik(Korisnik korisnik) {
		this.korisnik = korisnik;
	}

	@Override
	public int compareTo(Pozajmica p) {
		if (getDatumPreuzimanja() == null || p.getDatumPreuzimanja() == null) {
			return 0;
		}
		return getDatumPreuzimanja().compareTo(p.getDatumPreuzimanja());
	}

}