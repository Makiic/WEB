package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import model.Korisnik;
import model.Vozilo;
import model.Korisnik.TipKupca;
import model.Korisnik.Uloga;

public class VoziloDAO {
    private Map<String, Vozilo> vozila = new HashMap<>();
	private ArrayList<Vozilo> vozilaList = new ArrayList<Vozilo>();
    private String realPath;

    public VoziloDAO(String contextPath) {
    	BufferedReader in = null;
	    try {
	        realPath = contextPath;
	        File file = new File(this.realPath);
	        in = new BufferedReader(new FileReader(file));
	        readVozila(in);
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        if (in != null) {
	            try {
	                in.close();
	            } catch (Exception e) {
	                // Handle closing exception if necessary
	            }
	        }
	    }
    }

    public Collection<Vozilo> getAll() {
        return vozila.values();
    }

    public Vozilo getVoziloById(String id) {
        return vozila.get(id);
    }

    public Vozilo createVozilo(Vozilo vozilo) {
    	System.out.println(vozilo.getIdVozila());
        if (!vozila.containsKey(vozilo.getIdVozila())) {
            vozila.put(vozilo.getIdVozila(), vozilo);
            writeVozilo(vozilo);
            vozilaList.add(vozilo);
        }
        return vozilo;
    }

    public Vozilo updateVozilo(String id, Vozilo updatedVozilo) {
        if (vozila.containsKey(id)) {
            vozila.put(id, updatedVozilo);
            rewriteVozilaFile();
            return updatedVozilo;
        }
        return null;
    }

    public Vozilo deleteVozilo(String id) {

    	System.out.println("uslo u dao vozila");
        if (vozila.containsKey(id)) {
            Vozilo removedVozilo = vozila.remove(id);
            rewriteVozilaFile();
            return removedVozilo;
        }
        return null;
    }

    private void loadVozila() {
        BufferedReader reader = null;
        try {
            File file = new File(realPath);
            reader = new BufferedReader(new FileReader(file));
            String line;
            while ((line = reader.readLine()) != null) {
                // Parse the line and create Vozilo objects
                // Example: Parse line and create Vozilo objects
                String[] parts = line.split(";");
                if (parts.length >= 14) {
                    String id = parts[0];
                    String marka = parts[1];
                    String model = parts[2];
                    int cena = Integer.parseInt(parts[3]);
                    Vozilo.TipVozila tip = Vozilo.TipVozila.valueOf(parts[4]);
                    // Parse other attributes as needed and create a Vozilo object
                    // Vozilo vozilo = new Vozilo(id, marka, model, cena, tip, ...);
                    // Add the Vozilo object to the vozila map
                    // vozila.put(id, vozilo);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public void readVozila(BufferedReader reader) throws IOException {
	    String line;
	    while ((line = reader.readLine()) != null) {
	        String[] parts = line.split(";");
	        if (parts.length >= 14) { // Adjust the length check based on your file format
	        	String idVozila = parts[0].trim();
	        	String marka = parts[1].trim();
	        	String model = parts[2].trim();
	        	int cena = Integer.parseInt(parts[3].trim());
	        	Vozilo.TipVozila tip = Vozilo.TipVozila.valueOf(parts[4].trim());
	        	String objekatPripada = parts[5].trim();
	        	Vozilo.VrstaMenjaca vrstaMenjaca = Vozilo.VrstaMenjaca.valueOf(parts[6].trim());
	        	Vozilo.TipGoriva tipGoriva = Vozilo.TipGoriva.valueOf(parts[7].trim());
	        	double potrosnja = Double.parseDouble(parts[8].trim());
	        	int brojVrata = Integer.parseInt(parts[9].trim());
	        	int brojOsoba = Integer.parseInt(parts[10].trim());
	        	String opis = parts[11].trim();
	        	String slika = parts[12].trim();
	        	Vozilo.Status status = Vozilo.Status.valueOf(parts[13].trim());

                // Create a Vozilo object
                Vozilo vozilo = new Vozilo(idVozila, marka, model, cena, tip, objekatPripada,
                        vrstaMenjaca, tipGoriva, potrosnja, brojVrata, brojOsoba, opis, slika, status);

                // Add the created Vozilo object to the list
                vozilaList.add(vozilo);
	        }
	    }
	}
    
    private void writeVozilo(Vozilo vozilo) {

    	System.out.println("Uslo u write");

    	System.out.println(realPath);
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("C:\\Users\\marai\\OneDrive\\Desktop\\PROJEKAT WEB\\jokaimaraweb\\VEB_J_M\\WebContent\\vozila.txt", true))) {
        	
        	int nextId = vozilaList.size() + 1;
            StringBuilder line = new StringBuilder();
            line.append(nextId).append(";");
            line.append(vozilo.getMarka()).append(";");
            line.append(vozilo.getModel()).append(";");
            line.append(vozilo.getCena()).append(";");
            line.append(vozilo.getTip()).append(";");
            line.append(vozilo.getObjekatPripada()).append(";");
            line.append(vozilo.getVrstaMenjaca()).append(";");
            line.append(vozilo.getTipGoriva()).append(";");
            line.append(vozilo.getPotrosnja()).append(";");
            line.append(vozilo.getBrojVrata()).append(";");
            line.append(vozilo.getBrojOsoba()).append(";");
            line.append(vozilo.getOpis()).append(";");
            line.append("car6.jpg").append(";");
            line.append("DOSTUPNO");
           

            writer.write(line.toString());
            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void rewriteVozilaFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(realPath))) {
            for (Vozilo vozilo : vozila.values()) {
                StringBuilder line = new StringBuilder();
                 line.append(vozilo.getIdVozila()).append(";")
                     .append(vozilo.getMarka()).append(";")
                     .append(vozilo.getModel()).append(";")
                     .append(vozilo.getCena()).append(";")
                     .append(vozilo.getTip()).append(";")
                     .append(vozilo.getObjekatPripada()).append(";")
                     .append(vozilo.getVrstaMenjaca()).append(";")
                     .append(vozilo.getTipGoriva()).append(";")
                     .append(vozilo.getPotrosnja()).append(";")
                     .append(vozilo.getBrojVrata()).append(";")
                     .append(vozilo.getBrojOsoba()).append(";")
                     .append(vozilo.getOpis()).append(";")
                     .append(vozilo.getSlika()).append(";")
                     .append(vozilo.getStatus()).append(";");
                writer.write(line.toString());
                writer.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
