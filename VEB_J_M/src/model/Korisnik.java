package model;

import java.sql.Date;
import java.util.List;



public class Korisnik 
{
	private String Id;
	private String korisnickoIme;
    private String lozinka;
    private String ime;
    private String prezime;
    private String pol;
    private String datumRodjenja;
    private Uloga uloga;
    private int brojBodova;
    private TipKupca tip;
    
    private List<String> svaIznajmljivanja;
    private String idKorpe;
    private String idObjekta;
    public String getIdKorpe() {
		return idKorpe;
	}


	public void setIdKorpe(String idKorpe) {
		this.idKorpe = idKorpe;
	}


	public String getIdObjekta() {
		return idObjekta;
	}


	public void setIdObjekta(String idObjekta) {
		this.idObjekta = idObjekta;
	}



	public enum Uloga {
       Kupac,
       Menadzer,
       Administrator
    }

    public enum TipKupca {
        Zlatni,
        Srebrni,
        Bronzani
     }


  
	public int getBrojBodova() {
		return brojBodova;
	}


	public void setBrojBodova(int brojBodova) {
		this.brojBodova = brojBodova;
	}


	public Korisnik(String korisnickoIme, String lozinka, String ime, String prezime, String pol,
            String datumRodjenja, Uloga uloga, int brojBodova,TipKupca tip) {
super();
this.korisnickoIme = korisnickoIme;
this.lozinka = lozinka;
this.ime = ime;
this.prezime = prezime;
this.pol = pol;
this.datumRodjenja = datumRodjenja;
this.uloga = uloga;
this.brojBodova = brojBodova;
this.tip = tip;
}

public TipKupca getTip() {
		return tip;
	}


	public void setTip(TipKupca tip) {
		this.tip = tip;
	}


public Uloga getUloga() {
return uloga;
}

public void setUloga(Uloga uloga) {
this.uloga = uloga;
}


	public String getId() {
		return Id;
	}


	public void setId(String id) {
		Id = id;
	}

	
	public String getKorisnickoIme() {
		return korisnickoIme;
	}


	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}


	public String getLozinka() {
		return lozinka;
	}


	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}


	public String getIme() {
		return ime;
	}


	public void setIme(String ime) {
		this.ime = ime;
	}


	public String getPrezime() {
		return prezime;
	}


	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}


	

	public String getPol() {
		return pol;
	}


	public void setPol(String pol) {
		this.pol = pol;
	}


	public String getDatumRodjenja() {
		return datumRodjenja;
	}


	public void setDatumRodjenja(String datumRodjenja) {
		this.datumRodjenja = datumRodjenja;
	}

	public List<String> getSvaIznajmljivanja() {
        return svaIznajmljivanja;
    }

    public void setSvaIznajmljivanja(List<String> svaIznajmljivanja) {
        this.svaIznajmljivanja = svaIznajmljivanja;
    }
	


	public Korisnik() {}
}