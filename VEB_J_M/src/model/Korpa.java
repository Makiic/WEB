package model;

import java.util.List;

public class Korpa {
	private int id;
	private List<Vozilo> vozila;
	private Korisnik korisnik;
	private int cena;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<Vozilo> getVozila() {
		return vozila;
	}
	public void setVozila(List<Vozilo> vozila) {
		this.vozila = vozila;
	}
	public Korisnik getKorisnik() {
		return korisnik;
	}
	public void setKorisnik(Korisnik korisnik) {
		this.korisnik = korisnik;
	}
	public int getCena() {
		return cena;
	}
	public void setCena(int cena) {
		this.cena = cena;
	}
	public Korpa(int id, List<Vozilo> vozila, Korisnik korisnik, int cena) {
		super();
		this.id = id;
		this.vozila = vozila;
		this.korisnik = korisnik;
		this.cena = cena;
	}
	public Korpa() {}
	
	
}
