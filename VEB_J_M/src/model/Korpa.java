package  model;
import java.util.ArrayList;
import java.util.List;

public class Korpa {
    private List<Vozilo> vozila;
    private Korisnik korisnik;
    private double cena;

    public Korpa(Korisnik korisnik) {
        this.vozila = new ArrayList<>();
        this.korisnik = korisnik;
        this.cena = 0.0;
    }

  

    // Getters and setters

    public List<Vozilo> getVozila() {
        return vozila;
    }

    public void setVozila(List<Vozilo> vozila) {
        this.vozila = vozila;
        ;
    }

    public Korisnik getKorisnik() {
        return korisnik;
    }

    public void setKorisnik(Korisnik korisnik) {
        this.korisnik = korisnik;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }
}