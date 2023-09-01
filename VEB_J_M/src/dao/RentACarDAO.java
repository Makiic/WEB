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
            rentACars.put(rentACar.getId(), rentACar);
            listaRentACars.add(rentACar);
            writeRentACar(rentACar);
        }
        return rentACar;
    }
    public void writeRentACar(RentACarObjekat rentACar) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(this.realPath, true))) {
            StringBuilder line = new StringBuilder();

            // Append rent-a-car data to the line
            line
                .append(rentACar.getId()).append(";")
                .append(rentACar.getNaziv()).append(";")
                .append(rentACar.getStartVreme()).append(";")
                .append(rentACar.getEndTime()).append(";")
                .append(rentACar.isStatus()).append(";")
                .append(rentACar.getOcena()).append(";")
                .append(rentACar.getSlika()).append(";")
                .append(rentACar.getLokacija().getId()); // Append the Lokacija's id

            // Write the line to the file
            writer.write(line.toString());
            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public void readRentACars(BufferedReader reader) throws IOException {
        String line;
        while ((line = reader.readLine()) != null) {
            String[] parts = line.split(";");
            if (parts.length >= 8) {
                int id = Integer.parseInt(parts[0]);
                String naziv = parts[1];
                LocalTime startVreme = LocalTime.parse(parts[2]);
                LocalTime endVreme = LocalTime.parse(parts[3]);
                boolean status = Boolean.parseBoolean(parts[4]);
                int ocena = Integer.parseInt(parts[5]);
                
                // Extract other attributes
                String logo = parts[6];
                // ... extract other attributes
                
                // Create the RentACarObjekat instance
                RentACarObjekat rentACar = new RentACarObjekat(id, naziv, startVreme, endVreme, status, null, logo, ocena);

                // Add the created RentACarObjekat object to your data structure
                rentACars.put(id, rentACar);
            }
        }
    }

    public void readLokacije(BufferedReader reader) throws IOException {
        String line;
        while ((line = reader.readLine()) != null) {
            String[] parts = line.split(";");
            if (parts.length >= 7) {
                int id = Integer.parseInt(parts[0]);
                String geoDuzina = parts[1];
                String geoSirina = parts[2];
                String ulica = parts[3];
                String broj = parts[4];
                String grad = parts[5];
                String posBroj = parts[6];
                
                // Create the Lokacija instance
                Lokacija lokacija = new Lokacija(id, geoDuzina, geoSirina, ulica, broj, grad, posBroj);
                
                // Update the corresponding RentACarObjekat with the Lokacija
                RentACarObjekat rentACar = rentACars.get(id);
                if (rentACar != null) {
                    rentACar.setLokacija(lokacija);
                }
            }
        }
    }



}
