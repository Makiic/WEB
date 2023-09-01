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
import java.util.List;

import model.Korisnik;
import model.Porudzbina;
import model.Porudzbina.StatusPorudzbine;
import model.Korisnik.TipKupca;
import model.Korisnik.Uloga;

public class PorudzbinaDAO {
	private HashMap<String, Porudzbina> porudzbine = new HashMap<String, Porudzbina>();
	private ArrayList<Porudzbina> listaPorudzbina = new ArrayList<Porudzbina>();

	private String realPath;
	
	public PorudzbinaDAO(String contextPath) {
	    BufferedReader in = null;
	    try {
	        File file = new File("C:\\Users\\marai\\OneDrive\\Desktop\\PROJEKAT WEB\\jokaimaraweb\\VEB_J_M\\WebContent\\porudzbine.txt");
	        in = new BufferedReader(new FileReader(file));
	        String line;
		    while ((line = in.readLine()) != null) {
		        String[] parts = line.split(";");
		        if (parts.length >= 8) {
		        	String id = parts[0];
		        	String[] vozilaArray = parts[1].split(",");
	                List<Integer> iznajmljenaVozila = new ArrayList<>();
	                for (String voziloId : vozilaArray) {
	                    iznajmljenaVozila.add(Integer.parseInt(voziloId));
	                }
	                int objekat = Integer.parseInt(parts[2]);
	                String datumIznajmljivanja = parts[3];
	                int trajanjeNajma = Integer.parseInt(parts[4]);
	                double cena = Double.parseDouble(parts[5]);
	                String imePrezimeKupca = parts[6];
	                StatusPorudzbine status = StatusPorudzbine.valueOf(parts[7]);

	                // Create a Porudzbina object
	                Porudzbina porudzbina = new Porudzbina(id, iznajmljenaVozila, objekat, datumIznajmljivanja,
	                    trajanjeNajma, cena, imePrezimeKupca, status);

	                // Add the created Porudzbina object to your data structure
	                porudzbine.put(id, porudzbina);
	                listaPorudzbina.add(porudzbina);
	            }
	        }
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

	
	public Porudzbina sacuvaj(Porudzbina porudzbina) {
	    if (!porudzbine.containsKey(porudzbina.getId())) {
	        System.out.println("\n\n\t DODAJEM PORUDZBINU\n\n");
	        porudzbine.put(porudzbina.getId(), porudzbina);
	        listaPorudzbina.add(porudzbina);
	        writeUser(porudzbina);
	    }
	    return porudzbina;
	}
	public void writeUser(Porudzbina porudzbina) {
	    try (BufferedWriter writer = new BufferedWriter(new FileWriter(this.realPath, true));
) {
	        StringBuilder line = new StringBuilder();
	        
	        // Append user data to the line
	        line
            .append(porudzbina.getId()).append(";")
            .append(porudzbina.getIznajmljenaVozila()).append(";")
            .append(porudzbina.getObjekat()).append(";")
            .append(porudzbina.getDatumIznajmljivanja()).append(";")
            .append(porudzbina.getTrajanjeNajma()).append(";")
            .append(porudzbina.getCena()).append(";")
            .append(porudzbina.getImePrezimeKupca()).append(";")
            .append(porudzbina.getStatus()).append(";");

	        
	        // Write the line to the file
	        writer.write(line.toString());
	        writer.newLine();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
	public Porudzbina getPorudzbinaById(String id) {
	    Collection<Porudzbina> porudzbine = ucitajPorudzbineIzFajla(); // Implementirajte metodu za učitavanje porudžbina iz fajla
	    
	    for (Porudzbina porudzbina : porudzbine) {
	        if (porudzbina.getId().equals(id)) {
	            return porudzbina; // Pronašli smo odgovarajuću porudžbinu
	        }
	    }
	    
	    return null; // Porudžbina sa datim ID-om nije pronađena
	}


	public Collection<Porudzbina> ucitajPorudzbineIzFajla() {
		return porudzbine.values();
	}
	public boolean promeniStatusPorudzbine(String id, StatusPorudzbine newStatus) {
	    Porudzbina porudzbina = porudzbine.get(id);
	    if (porudzbina != null) {
	        porudzbina.setStatus(newStatus);
	        sacuvaj(porudzbina); // Dodajte ovu liniju da biste sačuvali promene u fajlu
	        return true;
	    }
	    return false;
	}
	public Porudzbina getPorudzbina(String id) {
	    // Iterirajte kroz listu porudžbina i pronađite porudžbinu sa odgovarajućim ID-jem
	    for (Porudzbina porudzbina : listaPorudzbina) {
	        if (porudzbina.getId().equals(id)) {
	            return porudzbina;
	        }
	    }
	    return null; // Ako porudžbina sa datim ID-jem nije pronađena, vratite null
	}


}
