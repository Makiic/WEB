package model;

public class Lokacija {
	private int Id;
	private String GeoDuzina;
	private String GeoSirina;
	private String ulica;
	private String broj;
	private String grad;
	private String posBroj;
	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
	}
	public String getGeoDuzina() {
		return GeoDuzina;
	}
	public void setGeoDuzina(String geoDuzina) {
		GeoDuzina = geoDuzina;
	}
	public String getGeoSirina() {
		return GeoSirina;
	}
	public void setGeoSirina(String geoSirina) {
		GeoSirina = geoSirina;
	}
	public String getUlica() {
		return ulica;
	}
	public void setUlica(String ulica) {
		this.ulica = ulica;
	}
	public String getBroj() {
		return broj;
	}
	public void setBroj(String broj) {
		this.broj = broj;
	}
	public String getGrad() {
		return grad;
	}
	public void setGrad(String grad) {
		this.grad = grad;
	}
	public String getPosBroj() {
		return posBroj;
	}
	public void setPosBroj(String posBroj) {
		this.posBroj = posBroj;
	}
	public Lokacija(int id, String geoDuzina, String geoSirina, String ulica, String broj, String grad,
			String posBroj) {
		super();
		Id = id;
		GeoDuzina = geoDuzina;
		GeoSirina = geoSirina;
		this.ulica = ulica;
		this.broj = broj;
		this.grad = grad;
		this.posBroj = posBroj;
	}
	public Lokacija() {
		super();
	}
	
	
	

}
