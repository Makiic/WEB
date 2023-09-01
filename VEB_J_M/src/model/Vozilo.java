package model;

public class Vozilo {
		private String IdVozila; 
		private String marka;
	    private String model;
	    private int cena;
	    private TipVozila tip;
	    private String objekatPripada;
	    private VrstaMenjaca vrstaMenjaca;
	    private TipGoriva tipGoriva;
	    private double potrosnja;
	    private int brojVrata;
	    private int brojOsoba;
	    private String opis;
	    private String slika;
	    private Status status;
	    
	    public enum TipVozila {
	        AUTO, KOMBI, MOBILEHOME
	    }
	    
	    public enum VrstaMenjaca {
	        MANUELNI, AUTOMATIK
	    }
	    
	    public enum TipGoriva {
	        DIZEL, BENZIN, HIBRID, ELEKTRICNI
	    }
	    
	    public enum Status {
	        DOSTUPNO, IZNAJMLJENO
	    }
	    
	    public Vozilo() {
	        // Empty constructor
	    }
	    public String getIdVozila() {
			return IdVozila;
		}

		public void setIdVozila(String idVozila) {
			IdVozila = idVozila;
		}
		public Vozilo(String idVozila, String marka, String model, int cena, TipVozila tip, String objekatPripada,
	              VrstaMenjaca vrstaMenjaca, TipGoriva tipGoriva, double potrosnja, int brojVrata,
	              int brojOsoba, String opis, String slika, Status status) {
	    this.IdVozila = idVozila;
	    this.marka = marka;
	    this.model = model;
	    this.cena = cena;
	    this.tip = tip;
	    this.objekatPripada = objekatPripada;
	    this.vrstaMenjaca = vrstaMenjaca;
	    this.tipGoriva = tipGoriva;
	    this.potrosnja = potrosnja;
	    this.brojVrata = brojVrata;
	    this.brojOsoba = brojOsoba;
	    this.opis = opis;
	    this.slika = slika;
	    this.status = status;
	}

	    
	    public String getMarka() {
	        return marka;
	    }
	    
	    public void setMarka(String marka) {
	        this.marka = marka;
	    }
	    
	    public String getModel() {
	        return model;
	    }
	    
	    public void setModel(String model) {
	        this.model = model;
	    }
	    
	    public int getCena() {
	        return cena;
	    }
	    
	    public void setCena(int cena) {
	        this.cena = cena;
	    }
	    
	    public TipVozila getTip() {
	        return tip;
	    }
	    
	    public void setTip(TipVozila tip) {
	        this.tip = tip;
	    }
	    
	    public String getObjekatPripada() {
	        return objekatPripada;
	    }
	    
	    public void setObjekatPripada(String objekatPripada) {
	        this.objekatPripada = objekatPripada;
	    }
	    
	    public VrstaMenjaca getVrstaMenjaca() {
	        return vrstaMenjaca;
	    }
	    
	    public void setVrstaMenjaca(VrstaMenjaca vrstaMenjaca) {
	        this.vrstaMenjaca = vrstaMenjaca;
	    }
	    
	    public TipGoriva getTipGoriva() {
	        return tipGoriva;
	    }
	    
	    public void setTipGoriva(TipGoriva tipGoriva) {
	        this.tipGoriva = tipGoriva;
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
	    
	    public Status getStatus() {
	        return status;
	    }
	    
	    public void setStatus(Status status) {
	        this.status = status;
	    }
	

}