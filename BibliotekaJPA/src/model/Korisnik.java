package model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;

/**
 * The persistent class for the korisnik database table.
 * 
 */
@Entity
@NamedQuery(name = "Korisnik.findAll", query = "SELECT k FROM Korisnik k")
public class Korisnik implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int korisnikID;

	private String brClanskeKarte;

	private String email;

	private String ime;

	private String password;

	private String prezime;

	// bi-directional many-to-one association to Uloga
	@ManyToOne
	@JoinColumn(name = "ulogaID")
	private Uloga uloga;

	// bi-directional many-to-one association to Pozajmica
	@OneToMany(mappedBy = "korisnik")
	@JsonBackReference(value = "list-pozajmice")
	private List<Pozajmica> pozajmicas;

	// bi-directional many-to-one association to Rezervacija
	@OneToMany(mappedBy = "korisnik")
	@JsonBackReference(value = "list-rezervacije")
	private List<Rezervacija> rezervacijas;

	public Korisnik() {
	}

	public int getKorisnikID() {
		return this.korisnikID;
	}

	public void setKorisnikID(int korisnikID) {
		this.korisnikID = korisnikID;
	}

	public String getBrClanskeKarte() {
		return this.brClanskeKarte;
	}

	public void setBrClanskeKarte(String brClanskeKarte) {
		this.brClanskeKarte = brClanskeKarte;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getIme() {
		return this.ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPrezime() {
		return this.prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public Uloga getUloga() {
		return this.uloga;
	}

	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}

	public List<Pozajmica> getPozajmicas() {
		return this.pozajmicas;
	}

	public void setPozajmicas(List<Pozajmica> pozajmicas) {
		this.pozajmicas = pozajmicas;
	}

	public Pozajmica addPozajmica(Pozajmica pozajmica) {
		getPozajmicas().add(pozajmica);
		pozajmica.setKorisnik(this);

		return pozajmica;
	}

	public Pozajmica removePozajmica(Pozajmica pozajmica) {
		getPozajmicas().remove(pozajmica);
		pozajmica.setKorisnik(null);

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
		rezervacija.setKorisnik(this);

		return rezervacija;
	}

	public Rezervacija removeRezervacija(Rezervacija rezervacija) {
		getRezervacijas().remove(rezervacija);
		rezervacija.setKorisnik(null);

		return rezervacija;
	}

	@Override
	public String toString() {
		return "Korisnik [korisnikID=" + korisnikID + ", brClanskeKarte=" + brClanskeKarte + ", email=" + email
				+ ", ime=" + ime + ", password=" + password + ", prezime=" + prezime + "]";
	}

}