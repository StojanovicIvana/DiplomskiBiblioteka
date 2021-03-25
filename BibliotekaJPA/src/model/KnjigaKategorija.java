package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the knjigakategorija database table.
 * 
 */
@Entity
@NamedQuery(name="KnjigaKategorija.findAll", query="SELECT k FROM KnjigaKategorija k")
public class KnjigaKategorija implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int knjigaKategorijaID;

	//bi-directional many-to-one association to Kategorija
	@ManyToOne
	@JoinColumn(name="kategorijaID")
	private Kategorija kategorija;

	//bi-directional many-to-one association to Knjiga
	@ManyToOne
	@JoinColumn(name="knjigaID")
	private Knjiga knjiga;

	public KnjigaKategorija() {
	}

	public int getKnjigaKategorijaID() {
		return this.knjigaKategorijaID;
	}

	public void setKnjigaKategorijaID(int knjigaKategorijaID) {
		this.knjigaKategorijaID = knjigaKategorijaID;
	}

	public Kategorija getKategorija() {
		return this.kategorija;
	}

	public void setKategorija(Kategorija kategorija) {
		this.kategorija = kategorija;
	}

	public Knjiga getKnjiga() {
		return this.knjiga;
	}

	public void setKnjiga(Knjiga knjiga) {
		this.knjiga = knjiga;
	}

}