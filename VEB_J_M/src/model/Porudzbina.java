package model;
import java.time.LocalDateTime;
import java.util.List;

import model.Korisnik.Uloga;

public class Porudzbina {
    private String id;
    private List<Integer> iznajmljenaVozila;
    private int objekat;
    private String datumIznajmljivanja;
    private int trajanjeNajma;
    private double cena;
    private String imePrezimeKupca;

    private StatusPorudzbine status;
    public enum StatusPorudzbine
    {
    	Obrada,
    	Odobreno,
    	Preuzeto,
    	Vraceno,
    	Odbijeno,
    	Otkazano
    }

    public Porudzbina(String id, List<Integer> iznajmljenaVozila, int objekat,
    		String datumIznajmljivanja, int trajanjeNajma, double cena,
    		String imePrezimeKupca, StatusPorudzbine status) {
        this.id = id;
        this.iznajmljenaVozila = iznajmljenaVozila;
        this.objekat = objekat;
        this.datumIznajmljivanja = datumIznajmljivanja;
        this.trajanjeNajma = trajanjeNajma;
        this.cena = cena;
        this.status = status;
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Integer> getIznajmljenaVozila() {
        return iznajmljenaVozila;
    }

    public void setIznajmljenaVozila(List<Integer> iznajmljenaVozila) {
        this.iznajmljenaVozila = iznajmljenaVozila;
    }

    public int getObjekat() {
        return objekat;
    }

    public void setObjekat(int objekat) {
        this.objekat = objekat;
    }

    public String getDatumIznajmljivanja() {
        return datumIznajmljivanja;
    }

    public void setDatumIznajmljivanja(String datumIznajmljivanja) {
        this.datumIznajmljivanja = datumIznajmljivanja;
    }

    public int getTrajanjeNajma() {
        return trajanjeNajma;
    }

    public void setTrajanjeNajma(int trajanjeNajma) {
        this.trajanjeNajma = trajanjeNajma;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }

    public String getImePrezimeKupca() {
        return imePrezimeKupca;
    }

    public void setImePrezimeKupca(String imePrezimeKupca) {
        this.imePrezimeKupca = imePrezimeKupca;
    }
    public StatusPorudzbine getStatus() {
        return status;
    }

    public void setStatus(StatusPorudzbine status) {
        this.status = status;
    }
}
