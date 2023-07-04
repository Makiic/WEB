package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import model.RentACarObjekat;
import model.Vozilo;

public class VoziloDAO {
	private HashMap<String, Vozilo> vozila = new HashMap<String, Vozilo>();
    private ArrayList<Vozilo> listaVozila = new ArrayList<Vozilo>();
    private String realPath;

    public VoziloDAO() {}

    public VoziloDAO(String contextPath) {
        BufferedReader in = null;
        try {
            File file = new File(contextPath + "/vozilo.txt");
            in = new BufferedReader(new FileReader(file));
            readVozila(in);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public Collection<Vozilo> getAll() {
        return vozila.values();
    }

    public String getVoziloById(String id) {
    	String carDetails = "Car details for ID " + id;
        return carDetails;
    }
    
    private void readVozila(BufferedReader in) {
        String line;
        try {
        	while ((line = in.readLine()) != null) {
                String[] parts = line.split(";");

                String idVozila = parts[0].trim();
                String marka = parts[1].trim();
                String model = parts[2].trim();
                int cena = Integer.parseInt(parts[3].trim());
                Vozilo.TipVozila tip = Vozilo.TipVozila.valueOf(parts[4].trim());
                String objekatId = parts[5].trim();
                Vozilo.VrstaMenjaca vrstaMenjaca = Vozilo.VrstaMenjaca.valueOf(parts[6].trim());
                Vozilo.TipGoriva tipGoriva = Vozilo.TipGoriva.valueOf(parts[7].trim());
                double potrosnja = Double.parseDouble(parts[8].trim());
                int brojVrata = Integer.parseInt(parts[9].trim());
                int brojOsoba = Integer.parseInt(parts[10].trim());
                String opis = parts[11].trim();
                String slika = parts[12].trim();
                Vozilo.Status status = Vozilo.Status.valueOf(parts[13].trim());

                Vozilo vozilo = new Vozilo(idVozila, marka, model, cena, tip, getObjekatById(objekatId), vrstaMenjaca, tipGoriva,
                        potrosnja, brojVrata, brojOsoba, opis, slika, status);
                
                vozilo.setIdVozila(idVozila);

                vozila.put(idVozila, vozilo);
                listaVozila.add(vozilo);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public RentACarObjekat getObjekatById(String id) {
        Vozilo vozilo = vozila.get(id);
        
        if (vozilo != null) {
            RentACarObjekat objekat = vozilo.getObjekatPripada();
            return objekat;
        }
        
        return null;
    }
}
