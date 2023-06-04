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
    private Date datumRodjenja;
    private String uloga;
    private List<Vozilo> Vozila;
    private Korpa korpa;
    private RentACarObjekat rentACarObjekat;
    private int brojSakupljenihBodova;
    public Kupac tipKupca;
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
	public Date getDatumRodjenja() {
		return datumRodjenja;
	}
	public void setDatumRodjenja(Date datumRodjenja) {
		this.datumRodjenja = datumRodjenja;
	}
	public String getUloga() {
		return uloga;
	}
	public void setUloga(String uloga) {
		this.uloga = uloga;
	}
	public List<Vozilo> getVozila() {
		return Vozila;
	}
	public void setVozila(List<Vozilo> vozila) {
		Vozila = vozila;
	}
	public Korpa getKorpa() {
		return korpa;
	}
	public void setKorpa(Korpa korpa) {
		this.korpa = korpa;
	}
	public RentACarObjekat getRentACarObjekat() {
		return rentACarObjekat;
	}
	public void setRentACarObjekat(RentACarObjekat rentACarObjekat) {
		this.rentACarObjekat = rentACarObjekat;
	}
	public int getBrojSakupljenihBodova() {
		return brojSakupljenihBodova;
	}
	public void setBrojSakupljenihBodova(int brojSakupljenihBodova) {
		this.brojSakupljenihBodova = brojSakupljenihBodova;
	}
	public Kupac getTipKupca() {
		return tipKupca;
	}
	public void setTipKupca(Kupac tipKupca) {
		this.tipKupca = tipKupca;
	}
	public Korisnik(String id, String korisnickoIme, String lozinka, String ime, String prezime, String pol,
			Date datumRodjenja, String uloga, List<Vozilo> vozila, Korpa korpa, RentACarObjekat rentACarObjekat,
			int brojSakupljenihBodova, Kupac tipKupca) {
		super();
		Id = id;
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
		this.uloga = uloga;
		Vozila = vozila;
		this.korpa = korpa;
		this.rentACarObjekat = rentACarObjekat;
		this.brojSakupljenihBodova = brojSakupljenihBodova;
		this.tipKupca = tipKupca;
	}

    public Korisnik() {}
}
