package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import model.Lokacija;
import model.Korisnik;

public class LokacijaDAO {
	
	private HashMap<Integer, Lokacija> lokacije = new HashMap<Integer, Lokacija>();
	private ArrayList<Lokacija> locationList = new ArrayList<Lokacija>();
	private String realPath;
	
	public Collection<Lokacija> getALL()
	{
		return lokacije.values();
	}
	
	public Lokacija pronadjiLokacije(int id)
	{
		return lokacije.containsKey(id) ? lokacije.get(id) : null;
	}
	
	public Lokacija Save(Lokacija lokacija)
	{
		Integer maxId = -1;
		for (Integer id : lokacije.keySet()) {
			int idNum = id;
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		lokacija.setId(maxId);
		lokacije.put(lokacija.getId(), lokacija);
		ispisiLok(lokacija);
		return lokacija;
	}
	
	public void Delete(Integer id)
	{
		lokacije.remove(id);
	}
	
	public LokacijaDAO(String path) {
		realPath = path + "locations.txt";
		System.out.println(realPath);
		BufferedReader in = null;
		try {
			File file = new File(path + "/lokacije.txt");
			in = new BufferedReader(new FileReader(file));
			procitajLokacije(in);
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			if ( in != null ) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
	private void procitajLokacije(BufferedReader in) {
	    String line;
	    try {
	        while ((line = in.readLine()) != null) {
	            line = line.trim();
	            if (line.equals("") || line.startsWith("#"))
	                continue;

	            StringTokenizer st = new StringTokenizer(line, ";");

	            if (st.countTokens() >= 6) {
	                String id = st.nextToken().trim();
	                String GeoDuzina = st.nextToken().trim();
	                String GeoSrina = st.nextToken().trim();
	                String ulica = st.nextToken().trim();
	                String broj = st.nextToken().trim();
	                String grad = st.nextToken().trim();
	                String posBroj = st.nextToken().trim();

	                Lokacija lokacija = new Lokacija(Integer.parseInt(id), GeoDuzina, GeoSrina, ulica, broj, grad,posBroj);
	                lokacije.put(Integer.parseInt(id), lokacija);
	                locationList.add(lokacija);
	                System.out.println(lokacija);
	            }
	        }
	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}


    public void ispisiLok(Lokacija lokacija) {

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(realPath, true))) {

                StringBuilder line = new StringBuilder();

                // Append user data to the line
                line.append(Integer.toString(lokacija.getId())).append(";")
                    .append(lokacija.getGeoDuzina()).append(";")
                    .append(lokacija.getGeoSirina()).append(";")
                    .append(lokacija.getUlica()).append(";")
                    .append(lokacija.getBroj()).append(";")
                    .append(lokacija.getGrad()).append(";")
                    .append(lokacija.getPosBroj()).append(";");


                // Write the line to the file
                writer.write(line.toString());
                writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}