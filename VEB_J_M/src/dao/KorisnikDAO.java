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
import java.util.StringTokenizer;
import java.util.UUID;

import model.Korisnik;
import model.RentACarObjekat;

public class KorisnikDAO {
	private HashMap<String, Korisnik> korisnici = new HashMap<String, Korisnik>();
	private ArrayList<Korisnik> listaKorisnika = new ArrayList<Korisnik>();
	private String realPath;
	
	public KorisnikDAO() {}
	
	//@param
	public KorisnikDAO(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/korisnik.txt");
			in = new BufferedReader(new FileReader(file));
			readUsers(in);
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
	private void readUsers(BufferedReader in) {
	    String line;
	    try {
	        while ((line = in.readLine()) != null) {
	            line = line.trim();
	            if (line.equals("") || line.startsWith("#"))
	                continue;

	            StringTokenizer st = new StringTokenizer(line, ";");

	            if (st.countTokens() >= 7) {
	            	
	                String korisnickoIme = st.nextToken().trim();
	                String lozinka = st.nextToken().trim();
	                String ime = st.nextToken().trim();
	                String prezime = st.nextToken().trim();
	                String pol = st.nextToken().trim();
	                String datumRodjenja = st.nextToken().trim();
	                String uloga = st.nextToken().trim();

	                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy");
	                LocalDate date = LocalDate.parse(datumRodjenja, formatter);

	                Korisnik korisnik = new Korisnik(korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja, uloga);
	                korisnici.put(korisnickoIme, korisnik);
	                listaKorisnika.add(korisnik);
	            }
	        }
	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void writeUser(Korisnik korisnik) {
	    try (BufferedWriter writer = new BufferedWriter(new FileWriter(this.realPath, true));
) {
	        StringBuilder line = new StringBuilder();
	        
	        // Append user data to the line
	        line.append(korisnik.getKorisnickoIme()).append(";")
	            .append(korisnik.getLozinka()).append(";")
	            .append(korisnik.getIme()).append(";")
	            .append(korisnik.getPrezime()).append(";");
	            /*.append(korisnik.getPol()).append(";")
	            .append(korisnik.getDatumRodjenja().formatted(DateTimeFormatter.ofPattern("dd-MMM-yyyy"))).append(";")
	            .append(korisnik.getUloga()).append(";");*/
	        
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
		
		public Korisnik update(Korisnik updatedKorisnik) {
		    String korisnickoIme = updatedKorisnik.getKorisnickoIme();

		    if (korisnici.containsKey(korisnickoIme)) {
		        // Update the user in the map
		        korisnici.put(korisnickoIme, updatedKorisnik);

		        // Update the user in the list
		        for (int i = 0; i < listaKorisnika.size(); i++) {
		            if (listaKorisnika.get(i).getKorisnickoIme().equals(korisnickoIme)) {
		                listaKorisnika.set(i, updatedKorisnik);
		                break;
		            }
		        }

		        // Rewrite the entire file with updated user data
		        rewriteUsersFile();

		        return updatedKorisnik;
		    }

		    return null; // User not found
		}

		private void rewriteUsersFile() {
		    try (BufferedWriter writer = new BufferedWriter(new FileWriter(realPath))) {
		        for (Korisnik korisnik : korisnici.values()) {
		            StringBuilder line = new StringBuilder();

		            line.append(korisnik.getKorisnickoIme()).append(";")
		                .append(korisnik.getLozinka()).append(";")
		                .append(korisnik.getIme()).append(";")
		                .append(korisnik.getPrezime()).append(";")
		                .append(korisnik.getPol()).append(";")
		                .append(korisnik.getDatumRodjenja().formatted(DateTimeFormatter.ofPattern("dd-MMM-yyyy"))).append(";")
		                .append(korisnik.getUloga()).append(";");

		            writer.write(line.toString());
		            writer.newLine();
		        }
		    } catch (IOException e) {
		        e.printStackTrace();
		    }
		}



}