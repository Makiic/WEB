package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import model.Korpa;
import model.Vozilo;
public class KorpaDAO {
	private HashMap<String, Korpa> korpe = new HashMap<String, Korpa>();
	
	public KorpaDAO() {}
	
	public KorpaDAO(String contextPath) {
		loadKorpe("C:\\\\Users\\\\Jovana\\\\Desktop\\\\WebProject\\\\jokaimaraweb\\\\VEB_J_M\\\\WebContent\\\\korpe.txt");
	}
	
	public Collection<Korpa> findAll() {
		return korpe.values();
	}
	public Korpa deleteVozilo(String idVozila, Korpa korpa) {
		

	    // Remove the specified vehicle from the korpa's vozila list
	    if (korpa != null) {
	        korpa.getVozila().removeIf(vozilo -> vozilo.equals(idVozila));
	    }
		return korpa;
	}
	public Korpa getKorpaByKorisnikId(String korisnikId) {
        for (Map.Entry<String, Korpa> entry : korpe.entrySet()) {
            Korpa korpa = entry.getValue();
            if (korpa.getKorisnikId().equals(korisnikId)) {
                return korpa;
            }
        }
        return null; // Korpa not found for the given korisnikId
    }
	
	private void loadKorpe(String contextPath) {
	    BufferedReader in = null;
	    try {
	        File file = new File(contextPath);
	        System.out.println(file.getCanonicalPath());
	        in = new BufferedReader(new FileReader(file));
	        String line, id = "", korisnikId = "";
	        double cena = 0.0;
	        List<Integer> vozilaList = new ArrayList<>();
	        StringTokenizer st;
	        while ((line = in.readLine()) != null) {
	            line = line.trim();
	            if (line.equals("") || line.indexOf('#') == 0)
	                continue;
	            st = new StringTokenizer(line, ";");
	            if (st.hasMoreTokens()) {
	                id = st.nextToken().trim();
	                korisnikId = st.nextToken().trim();
	                cena = Double.parseDouble(st.nextToken().trim());

	                vozilaList.clear(); // Clear the list for each line
	                while (st.hasMoreTokens()) {
	                    int voziloId = Integer.parseInt(st.nextToken().trim());
	                    vozilaList.add(voziloId);
	                }

	                korpe.put(id, new Korpa(vozilaList, korisnikId, cena));
	            }
	        }
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



	public Korpa update(String korisnikId,Korpa korpa) {
	    for (Map.Entry<String, Korpa> entry : korpe.entrySet()) {
	        String id = entry.getKey();
	        Korpa existingKorpa = entry.getValue();
	        if (existingKorpa.getKorisnikId().equals(korisnikId)) {
	            korpe.put(id, existingKorpa);
	            
	            return existingKorpa; //
	        }
	    }
	    return null;
	}
}