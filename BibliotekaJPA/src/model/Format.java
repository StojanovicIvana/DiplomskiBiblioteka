package model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;


/**
 * The persistent class for the format database table.
 * 
 */
@Entity
@NamedQuery(name="Format.findAll", query="SELECT f FROM Format f")
public class Format implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int formatID;

	private String format;

	//bi-directional many-to-one association to Knjiga
	@OneToMany(mappedBy="format")
	@JsonBackReference
	private List<Knjiga> knjigas;

	public Format() {
	}

	public int getFormatID() {
		return this.formatID;
	}

	public void setFormatID(int formatID) {
		this.formatID = formatID;
	}

	public String getFormat() {
		return this.format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public List<Knjiga> getKnjigas() {
		return this.knjigas;
	}

	public void setKnjigas(List<Knjiga> knjigas) {
		this.knjigas = knjigas;
	}

	public Knjiga addKnjiga(Knjiga knjiga) {
		getKnjigas().add(knjiga);
		knjiga.setFormat(this);

		return knjiga;
	}

	public Knjiga removeKnjiga(Knjiga knjiga) {
		getKnjigas().remove(knjiga);
		knjiga.setFormat(null);

		return knjiga;
	}

}