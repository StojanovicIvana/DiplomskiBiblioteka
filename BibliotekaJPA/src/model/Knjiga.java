package model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;


/**
 * The persistent class for the knjiga database table.
 * 
 */
@Entity
@NamedQuery(name="Knjiga.findAll", query="SELECT k FROM Knjiga k")
public class Knjiga implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int knjigaID;

	private int brPrimeraka;

	private int dostupno;

	private String fajl;

	private String naslov;

	private String opis;

	@Lob
	private byte[] slika;

	//bi-directional many-to-one association to Autor
	@ManyToOne
	@JoinColumn(name="autorID")
	private Autor autor;

	//bi-directional many-to-one association to Format
	@ManyToOne
	@JoinColumn(name="formatID")
	private Format format;

	//bi-directional many-to-one association to KnjigaKategorija
	@OneToMany(mappedBy="knjiga")
	@JsonBackReference(value = "list-knjigakategorija")
	private List<KnjigaKategorija> knjigakategorijas;

	//bi-directional many-to-one association to Pozajmica
	@OneToMany(mappedBy="knjiga")
	@JsonBackReference(value = "list-poz")
	private List<Pozajmica> pozajmicas;

	//bi-directional many-to-one association to Rezervacija
	@OneToMany(mappedBy="knjiga")
	@JsonBackReference(value = "list-rez")
	private List<Rezervacija> rezervacijas;

	public Knjiga() {
	}

	public int getKnjigaID() {
		return this.knjigaID;
	}

	public void setKnjigaID(int knjigaID) {
		this.knjigaID = knjigaID;
	}

	public int getBrPrimeraka() {
		return this.brPrimeraka;
	}

	public void setBrPrimeraka(int brPrimeraka) {
		this.brPrimeraka = brPrimeraka;
	}

	public int getDostupno() {
		return this.dostupno;
	}

	public void setDostupno(int dostupno) {
		this.dostupno = dostupno;
	}

	public String getFajl() {
		return this.fajl;
	}

	public void setFajl(String fajl) {
		this.fajl = fajl;
	}

	public String getNaslov() {
		return this.naslov;
	}

	public void setNaslov(String naslov) {
		this.naslov = naslov;
	}

	public String getOpis() {
		return this.opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public byte[] getSlika() {
		return this.slika;
	}

	public void setSlika(byte[] slika) {
		this.slika = slika;
	}

	public Autor getAutor() {
		return this.autor;
	}

	public void setAutor(Autor autor) {
		this.autor = autor;
	}

	public Format getFormat() {
		return this.format;
	}

	public void setFormat(Format format) {
		this.format = format;
	}

	public List<KnjigaKategorija> getKnjigakategorijas() {
		return this.knjigakategorijas;
	}

	public void setKnjigakategorijas(List<KnjigaKategorija> knjigakategorijas) {
		this.knjigakategorijas = knjigakategorijas;
	}

	public KnjigaKategorija addKnjigakategorija(KnjigaKategorija knjigakategorija) {
		getKnjigakategorijas().add(knjigakategorija);
		knjigakategorija.setKnjiga(this);

		return knjigakategorija;
	}

	public KnjigaKategorija removeKnjigakategorija(KnjigaKategorija knjigakategorija) {
		getKnjigakategorijas().remove(knjigakategorija);
		knjigakategorija.setKnjiga(null);

		return knjigakategorija;
	}

	public List<Pozajmica> getPozajmicas() {
		return this.pozajmicas;
	}

	public void setPozajmicas(List<Pozajmica> pozajmicas) {
		this.pozajmicas = pozajmicas;
	}

	public Pozajmica addPozajmica(Pozajmica pozajmica) {
		getPozajmicas().add(pozajmica);
		pozajmica.setKnjiga(this);

		return pozajmica;
	}

	public Pozajmica removePozajmica(Pozajmica pozajmica) {
		getPozajmicas().remove(pozajmica);
		pozajmica.setKnjiga(null);

		return pozajmica;
	}

	public List<Rezervacija> getRezervacijas() {
		return this.rezervacijas;
	}

	public void setRezervacijas(List<Rezervacija> rezervacijas) {
		this.rezervacijas = rezervacijas;
	}

	public Rezervacija addRezervacija(Rezervacija rezervacija) {
		getRezervacijas().add(rezervacija);
		rezervacija.setKnjiga(this);

		return rezervacija;
	}

	public Rezervacija removeRezervacija(Rezervacija rezervacija) {
		getRezervacijas().remove(rezervacija);
		rezervacija.setKnjiga(null);

		return rezervacija;
	}

	@Override
	public String toString() {
		return "Knjiga [knjigaID=" + knjigaID + ", brPrimeraka=" + brPrimeraka + ", dostupno=" + dostupno + ", naslov="
				+ naslov + ", opis=" + opis + "]";
	}

}