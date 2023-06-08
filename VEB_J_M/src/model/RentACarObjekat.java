package model;

import java.time.LocalTime;
import java.util.List;

public class RentACarObjekat {
	
	private int id;
	private String naziv;
	//private List<Vozilo> vozilaUPonudi;
	private LocalTime startVreme;
	private LocalTime endVreme;
	private boolean status;
	private Lokacija lokacija;
	private String slika;
	private int ocena;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	
	public LocalTime getStartVreme() {
		return startVreme;
	}
	public void setStartVreme(LocalTime startVreme) {
		this.startVreme = startVreme;
	}
	public LocalTime getEndTime() {
		return endVreme;
	}
	public void setEndVreme(LocalTime endVreme) {
		this.endVreme = endVreme;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public Lokacija getLokacija() {
		return lokacija;
	}
	public void setLokacija(Lokacija lokacija) {
		this.lokacija = lokacija;
	}
	public String getSlika() {
		return slika;
	}
	public void setSlika(String slika) {
		this.slika = slika;
	}
	public int getOcena() {
		return ocena;
	}
	public void setOcena(int ocena) {
		this.ocena = ocena;
	}
	public RentACarObjekat(int id, String naziv,  LocalTime startVreme,LocalTime endVreme, boolean status,
			Lokacija lokacija, String slika, int ocena) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.startVreme = startVreme;
		this.endVreme=endVreme;
		this.status = status;
		this.lokacija = lokacija;
		this.slika = slika;
		this.ocena = ocena;
	}
	public RentACarObjekat() {
		super();
	}

}
