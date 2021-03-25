package model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;


/**
 * The persistent class for the autor database table.
 * 
 */
@Entity
@NamedQuery(name="Autor.findAll", query="SELECT a FROM Autor a")
public class Autor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int autorID;

	private String biografija;

	private String ime;

	private String personalniSajt;

	private String prezime;

	//bi-directional many-to-one association to Knjiga
	@OneToMany(mappedBy="autor")
	@JsonBackReference
	private List<Knjiga> knjigas;

	public Autor() {
	}

	public int getAutorID() {
		return this.autorID;
	}

	public void setAutorID(int autorID) {
		this.autorID = autorID;
	}

	public String getBiografija() {
		return this.biografija;
	}

	public void setBiografija(String biografija) {
		this.biografija = biografija;
	}

	public String getIme() {
		return this.ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPersonalniSajt() {
		return this.personalniSajt;
	}

	public void setPersonalniSajt(String personalniSajt) {
		this.personalniSajt = personalniSajt;
	}

	public String getPrezime() {
		return this.prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public List<Knjiga> getKnjigas() {
		return this.knjigas;
	}

	public void setKnjigas(List<Knjiga> knjigas) {
		this.knjigas = knjigas;
	}

	public Knjiga addKnjiga(Knjiga knjiga) {
		getKnjigas().add(knjiga);
		knjiga.setAutor(this);

		return knjiga;
	}

	public Knjiga removeKnjiga(Knjiga knjiga) {
		getKnjigas().remove(knjiga);
		knjiga.setAutor(null);

		return knjiga;
	}

}