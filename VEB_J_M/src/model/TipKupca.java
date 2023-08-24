package model;

public class TipKupca {
    private String imeTipa;
    private double popust;
    private int trazeniBrojBodova;

    public TipKupca(String imeTipa, double popust, int trazeniBrojBodova) {
        this.imeTipa = imeTipa;
        this.popust = popust;
        this.trazeniBrojBodova = trazeniBrojBodova;
    }

    // Getters and setters

    public String getImeTipa() {
        return imeTipa;
    }

    public void setImeTipa(String imeTipa) {
        this.imeTipa = imeTipa;
    }

    public double getPopust() {
        return popust;
    }

    public void setPopust(double popust) {
        this.popust = popust;
    }

    public int getTrazeniBrojBodova() {
        return trazeniBrojBodova;
    }

    public void setTrazeniBrojBodova(int trazeniBrojBodova) {
        this.trazeniBrojBodova = trazeniBrojBodova;
    }
}

