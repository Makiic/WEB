package service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.FileOutputStream;
import java.io.OutputStream;


import org.apache.tomcat.util.http.fileupload.IOUtils;

import model.Lokacija;
import model.RentACarObjekat;
import dao.RentACarDAO;

@Path("/rentACar")
public class RentACarService {

    @Context
    HttpServletRequest request;
    @Context
    ServletContext ctx;

    @PostConstruct
    /**
     * Initializes the application context by creating a new instance of
     * RentACarDAO if it doesn't already exist as a context attribute.
     */
    private void init() {
        if (ctx.getAttribute("rentACarDAO") == null) {
            String realPath = "C:\\Users\\marai\\OneDrive\\Desktop\\PROJEKAT WEB\\jokaimaraweb\\VEB_J_M\\WebContent\\rent-car.txt"; // Absolute path
            ctx.setAttribute("rentACarDAO", new RentACarDAO(realPath));
        }
    }



@POST
@Path("/createRAC")
@Consumes(MediaType.MULTIPART_FORM_DATA)
public Response createRAC() {
    init();
    RentACarDAO rentACarDAO = (RentACarDAO) ctx.getAttribute("rentACarDAO");

    // Create a RentACarObjekat and set its properties
    RentACarObjekat rentACarObjekat = new RentACarObjekat();
    rentACarObjekat.setNaziv(request.getParameter("naziv"));

    // Convert startVreme and endVreme from string to LocalTime
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
    LocalTime startVreme = LocalTime.parse(request.getParameter("startVreme"), formatter);
    LocalTime endVreme = LocalTime.parse(request.getParameter("endVreme"), formatter);
    rentACarObjekat.setStartVreme(startVreme);
    rentACarObjekat.setEndVreme(endVreme);

    rentACarObjekat.setStatus(Boolean.parseBoolean(request.getParameter("status")));
    String grad = request.getParameter("lokacija");
    Lokacija lokacija = new Lokacija(); // Create a Lokacija object
    lokacija.setGrad(grad);
    rentACarObjekat.setLokacija(lokacija);

    // Handle the logo InputStream to store the logo as needed
    try {
        InputStream logoInputStream = request.getPart("logo").getInputStream();
        String uploadedFileName = "your_unique_filename.png"; // Adjust the extension as needed

        // Define the directory where you want to save the uploaded file
        String uploadDir = "C:\\\\Users\\\\marai\\\\OneDrive\\\\Desktop\\\\PROJEKAT WEB\\\\jokaimaraweb\\\\VEB_J_M\\\\WebContent\\\\rent-car.txt";

        File outputFile = new File(uploadDir, uploadedFileName);

        try (OutputStream output = new FileOutputStream(outputFile)) {
            IOUtils.copy(logoInputStream, output);
        }
    } catch (IOException | ServletException e) {
        e.printStackTrace();
        // Handle the exception appropriately
    }

    // Save the RentACarObjekat using your DAO
    RentACarObjekat createdRentACar = rentACarDAO.sacuvaj(rentACarObjekat);

    // Return a response with the created RentACarObjekat
    return Response.status(Response.Status.CREATED).entity(createdRentACar).build();
}

}
