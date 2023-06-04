package model;

import enums.StatusVozila;
import enums.TipGoriva;
import enums.TipVozila;
import enums.VrstaVozila;

public class Vozilo {
	private int id;
	private String brend;
	private String model;
	private TipVozila tipVozila;
	private VrstaVozila vrstaVozila;
	private TipGoriva gorivo;
	private double potrosnja;
	private int brojVrata;
	private int brojOsoba;
	private String opis;
	private String slika;
	private StatusVozila status;
	private RentACarObjekat objekat;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBrend() {
		return brend;
	}
	public void setBrend(String brend) {
		this.brend = brend;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public TipVozila getTipVozila() {
		return tipVozila;
	}
	public void setTipVozila(TipVozila tipVozila) {
		this.tipVozila = tipVozila;
	}
	public VrstaVozila getVrstaVozila() {
		return vrstaVozila;
	}
	public void setVrstaVozila(VrstaVozila vrstaVozila) {
		this.vrstaVozila = vrstaVozila;
	}
	public TipGoriva getGorivo() {
		return gorivo;
	}
	public void setGorivo(TipGoriva gorivo) {
		this.gorivo = gorivo;
	}
	public double getPotrosnja() {
		return potrosnja;
	}
	public void setPotrosnja(double potrosnja) {
		this.potrosnja = potrosnja;
	}
	public int getBrojVrata() {
		return brojVrata;
	}
	public void setBrojVrata(int brojVrata) {
		this.brojVrata = brojVrata;
	}
	public int getBrojOsoba() {
		return brojOsoba;
	}
	public void setBrojOsoba(int brojOsoba) {
		this.brojOsoba = brojOsoba;
	}
	public String getOpis() {
		return opis;
	}
	public void setOpis(String opis) {
		this.opis = opis;
	}
	public String getSlika() {
		return slika;
	}
	public void setSlika(String slika) {
		this.slika = slika;
	}
	public StatusVozila getStatus() {
		return status;
	}
	public void setStatus(StatusVozila status) {
		this.status = status;
	}
	public RentACarObjekat getObjekat() {
		return objekat;
	}
	public void setObjekat(RentACarObjekat objekat) {
		this.objekat = objekat;
	}
	public Vozilo(int id, String brend, String model, TipVozila tipVozila, VrstaVozila vrstaVozila, TipGoriva gorivo,
			double potrosnja, int brojVrata, int brojOsoba, String opis, String slika, StatusVozila status,
			RentACarObjekat objekat) {
		super();
		this.id = id;
		this.brend = brend;
		this.model = model;
		this.tipVozila = tipVozila;
		this.vrstaVozila = vrstaVozila;
		this.gorivo = gorivo;
		this.potrosnja = potrosnja;
		this.brojVrata = brojVrata;
		this.brojOsoba = brojOsoba;
		this.opis = opis;
		this.slika = slika;
		this.status = status;
		this.objekat = objekat;
	}
	public Vozilo() {
		super();
	}
	
	

}
