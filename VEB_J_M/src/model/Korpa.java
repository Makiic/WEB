package  model;
import java.util.ArrayList;
import java.util.List;

public class Korpa {
	private String id;
    private List<Integer> vozila;
    private String korisnikId;
    private double cena;

    public Korpa(Korpa korpa) {
    	this.id = korpa.id;
    	this.vozila = korpa.vozila;    	
        this.korisnikId = korpa.korisnikId;
        this.cena = korpa.cena;
    }

    public Korpa(List<Integer> vozila, String korisnikId, double cena) {
    	this.vozila = vozila;
		this.korisnikId = korisnikId;
		this.cena = cena;
	}

    // Getters and setters

    

    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<Integer> getVozila() {
		return vozila;
	}

	public void setVozila(List<Integer> vozila) {
		this.vozila = vozila;
	}

	public String getKorisnikId() {
		return korisnikId;
	}

	public void setKorisnikId(String korisnikId) {
		this.korisnikId = korisnikId;
	}


    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }
}