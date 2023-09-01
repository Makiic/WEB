package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;
import java.util.UUID;

import model.Korisnik;
import model.Korisnik.TipKupca;
import model.Korisnik.Uloga;
import model.RentACarObjekat;

public class KorisnikDAO {
	private HashMap<String, Korisnik> korisnici = new HashMap<String, Korisnik>();
	private ArrayList<Korisnik> listaKorisnika = new ArrayList<Korisnik>();
	private String realPath;
	
	public KorisnikDAO() {}
	
	/**
	 * Creates a new instance of KorisnikDAO and initializes it by reading user data
	 * from the specified file path.
	 *
	 * @param contextPath The context path to the user data file.
	 */
	public KorisnikDAO(String contextPath) {
	    BufferedReader in = null;
	    try {
	        realPath = contextPath;
	        File file = new File(this.realPath);
	        in = new BufferedReader(new FileReader(file));
	        readUsers(in);
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



	//@return
	
	public Collection<Korisnik> getALL() {
		return korisnici.values();
	}
	//@return
	//@param
	public Korisnik pronadji(String id) {
		return korisnici.containsKey(id) ? korisnici.get(id) : null;
	}
	/**
	 * Dodavanej studenta u kolekciju studenata
	 * nase aplikacije.
	 * @param korisnik
	 */
	public Korisnik sacuvaj(Korisnik korisnik) {
	    if (!korisnici.containsKey(korisnik.getKorisnickoIme())) {
	        System.out.println("\n\n\t DODAJEM KORISNIKA\n\n");
	        korisnici.put(korisnik.getKorisnickoIme(), korisnik);
	        listaKorisnika.add(korisnik);
	        writeUser(korisnik);
	    }
	    return korisnik;
	}
	//@param
	public void readUsers(BufferedReader reader) throws IOException {
	    String line;
	    while ((line = reader.readLine()) != null) {
	        String[] parts = line.split(";");
	        if (parts.length >= 8) {
	            int id = Integer.parseInt(parts[0]);
	            String korisnickoIme = parts[1];
	            String lozinka = parts[2];
	            String ime = parts[3];
	            String prezime = parts[4];
	            String pol = parts[5];
	            String datumRodjenja = parts[6];
	            Uloga uloga = Uloga.valueOf(parts[7]); // Convert the string to Uloga enum
	            int brojBodova = 0;
	            TipKupca tip = null;

	            if (uloga.equals(Uloga.Kupac) && parts.length >= 9) {
	                brojBodova = Integer.parseInt(parts[8]);
	            }

	            if (parts.length >= 10) {
	                tip = TipKupca.valueOf(parts[9]); // Convert the string to TipKupca enum
	            }

	            Korisnik korisnik = new Korisnik(korisnickoIme, lozinka, ime, prezime, pol,
	                datumRodjenja, uloga, brojBodova, tip);

	            // Add the created Korisnik object to your data structure
	            korisnici.put(korisnickoIme, korisnik);
	        }
	    }
	}

	
	public void writeUser(Korisnik korisnik) {
	    try (BufferedWriter writer = new BufferedWriter(new FileWriter(this.realPath, true));
) {
	        StringBuilder line = new StringBuilder();
	        
	        // Append user data to the line
	        line
            .append(korisnik.getKorisnickoIme()).append(";")
            .append(korisnik.getLozinka()).append(";")
            .append(korisnik.getIme()).append(";")
            .append(korisnik.getPrezime()).append(";")
            .append(korisnik.getPol()).append(";")
            .append(korisnik.getDatumRodjenja()).append(";")
            .append(korisnik.getUloga()).append(";")
            .append(korisnik.getTip()).append(";");

	        
	        // Write the line to the file
	        writer.write(line.toString());
	        writer.newLine();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}

	
	
		public Korisnik obrisiKorisnika(String korisnickoIme) {
			return korisnici.remove(korisnickoIme);
		}
		
		public Korisnik update(Korisnik updatedUser) {
		    Korisnik userToUpdate = this.pronadji(updatedUser.getKorisnickoIme());
		    
		    if (userToUpdate != null) {
		        // Update the existing user object with the new data
		        userToUpdate.setLozinka(updatedUser.getLozinka());
		        userToUpdate.setIme(updatedUser.getIme());
		        userToUpdate.setPrezime(updatedUser.getPrezime());
		        userToUpdate.setPol(updatedUser.getPol());
		        userToUpdate.setDatumRodjenja(updatedUser.getDatumRodjenja());

		        korisnici.put(updatedUser.getKorisnickoIme(), userToUpdate); // Insert the updated user
		       
		        // Rewrite the entire file with updated user data
		        rewriteUsersFile();

		        return userToUpdate;
		    }

		    return null; // User not found
		}

		private void rewriteUsersFile() {
		    try (BufferedWriter writer = new BufferedWriter(new FileWriter(realPath))) {
		        for (Korisnik korisnik : korisnici.values()) {
		            StringBuilder line = new StringBuilder();
		            line
		            .append(korisnik.getKorisnickoIme()).append(";")
		                .append(korisnik.getLozinka()).append(";")
		                .append(korisnik.getIme()).append(";")
		                .append(korisnik.getPrezime()).append(";")
		                .append(korisnik.getPol()).append(";")
		                .append(korisnik.getDatumRodjenja()).append(";")
		                .append(korisnik.getUloga()).append(";")
		                .append(korisnik.getBrojBodova()).append(";")
		                .append(korisnik.getTip()).append(";");

		            writer.write(line.toString());
		            writer.newLine();
		            writer.flush(); // Ensure immediate writing
		        }
		    } catch (IOException e) {
		        e.printStackTrace();
		    }
		}



		public Korisnik getKorisnikByKorisnickoIme(String korisnickoIme) {
		    // Assuming you have a list of Korisnik objects stored in some data structure
		    List<Korisnik> korisnici = new ArrayList<>(); // Initialize an ArrayList to store the Korisnik objects

		    for (Korisnik korisnik : korisnici) {
		        if (korisnik.getKorisnickoIme().equals(korisnickoIme)) {
		            return korisnik;
		        }
		    }

		    return null; // Return null if user with the given username is not found
		}



}