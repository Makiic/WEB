package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.StringTokenizer;
import model.RentACarObjekat;
import model.Lokacija;

public class RentACarDAO {

    private HashMap<Integer, RentACarObjekat> rentACars = new HashMap<Integer,RentACarObjekat>();
    private ArrayList<RentACarObjekat> listaRentACars = new ArrayList<RentACarObjekat>();
    private String realPath;

    public RentACarDAO() {}

    public RentACarDAO(String contextPath) {
        BufferedReader in = null;
        try {
            realPath = contextPath;
            File file = new File(this.realPath);
            in = new BufferedReader(new FileReader(file));
            readRentACars(in);
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

    public Collection<RentACarObjekat> getALL() {
        return rentACars.values();
    }

    public RentACarObjekat pronadji(int id) {
        return rentACars.get(id);
    }

    public RentACarObjekat sacuvaj(RentACarObjekat rentACar) {
        if (!rentACars.containsKey(rentACar.getId())) {
        	System.out.println("\n\n\t DODAJEM KORISNIKA\n\n");
            rentACars.put(rentACar.getId(), rentACar);
            listaRentACars.add(rentACar);
            writeRentACar(rentACar);
        }
        return rentACar;
    }
  
    public void writeRentACar(RentACarObjekat rentACar) {
        Objects.requireNonNull(rentACar, "Rent-a-Car object must not be null.");

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(this.realPath, true))) {
            // Construct the line to be written to the file
            StringBuilder line = new StringBuilder();
            line.append(rentACar.getNaziv()).append(";"); // Naziv
            line.append(rentACar.getStartVreme()).append(";"); // StartVreme
            line.append(rentACar.getEndTime()).append(";"); // EndVreme
            line.append(rentACar.isStatus()).append(";"); // Status
            line.append(rentACar.getLokacija().getGrad()).append(";"); // Lokacija

            // Assuming you have a logo property of type String in your RentACarObjekat
            line.append(rentACar.getSlika()).append(";"); // Logo

            // Write the line to the file
            writer.write(line.toString());
            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception appropriately
        }
    }

    public void readRentACars(BufferedReader reader) throws IOException {
        String line;
        while ((line = reader.readLine()) != null) {
            String[] parts = line.split(";");
            if (parts.length >= 7) {
                int id = Integer.parseInt(parts[0]);
                String naziv = parts[1];
                LocalTime startVreme = LocalTime.parse(parts[2]);
                LocalTime endVreme = LocalTime.parse(parts[3]);
                boolean status = Boolean.parseBoolean(parts[4]);
                int ocena = Integer.parseInt(parts[5]);
                String slika = parts[6];
                int lokacijaId = parts.length > 7 ? Integer.parseInt(parts[7]) : -1; // Parse lokacijaId or use -1 if not present

                // Create the RentACarObjekat instance
                RentACarObjekat rentACar = new RentACarObjekat(id, naziv, startVreme, endVreme, status, null, slika, ocena);

                // Set the Lokacija if the id is valid
                if (lokacijaId != -1) {
                    Lokacija lokacija = findLokacijaById(lokacijaId); // Implement this method
                    if (lokacija != null) {
                        rentACar.setLokacija(lokacija);
                    }
                }

                // Add the created RentACarObjekat object to your data structure
                rentACars.put(id, rentACar);
            }
        }
    }

    // Implement a method to find Lokacija by ID
    private Lokacija findLokacijaById(int id) {
        // Loop through the list of rentACars to find the associated Lokacija
        for (RentACarObjekat rentACar : listaRentACars) {
            Lokacija lokacija = rentACar.getLokacija();
            if (lokacija != null && lokacija.getId() == id) {
                return lokacija; // Return the found Lokacija
            }
        }
        return null; // Return null if no matching Lokacija is found
    }




}
