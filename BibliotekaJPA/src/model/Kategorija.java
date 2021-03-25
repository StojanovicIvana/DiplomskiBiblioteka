package model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;


/**
 * The persistent class for the kategorija database table.
 * 
 */
@Entity
@NamedQuery(name="Kategorija.findAll", query="SELECT k FROM Kategorija k")
public class Kategorija implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int kategorijaID;

	private String kategorija;

	//bi-directional many-to-one association to KnjigaKategorija
	@OneToMany(mappedBy="kategorija")
	@JsonBackReference
	private List<KnjigaKategorija> knjigakategorijas;

	public Kategorija() {
	}

	public int getKategorijaID() {
		return this.kategorijaID;
	}

	public void setKategorijaID(int kategorijaID) {
		this.kategorijaID = kategorijaID;
	}

	public String getKategorija() {
		return this.kategorija;
	}

	public void setKategorija(String kategorija) {
		this.kategorija = kategorija;
	}

	public List<KnjigaKategorija> getKnjigakategorijas() {
		return this.knjigakategorijas;
	}

	public void setKnjigakategorijas(List<KnjigaKategorija> knjigakategorijas) {
		this.knjigakategorijas = knjigakategorijas;
	}

	public KnjigaKategorija addKnjigakategorija(KnjigaKategorija knjigakategorija) {
		getKnjigakategorijas().add(knjigakategorija);
		knjigakategorija.setKategorija(this);

		return knjigakategorija;
	}

	public KnjigaKategorija removeKnjigakategorija(KnjigaKategorija knjigakategorija) {
		getKnjigakategorijas().remove(knjigakategorija);
		knjigakategorija.setKategorija(null);

		return knjigakategorija;
	}

}