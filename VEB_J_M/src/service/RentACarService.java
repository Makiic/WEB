package service;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.Korisnik;
import model.RentACarObjekat;
import model.Korisnik.Uloga;
import dao.KorisnikDAO;
import dao.RentACarDAO;

@Path("/rentACar")
public class RentACarService{
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;

	@PostConstruct
	/**
	 * Initializes the application context by creating a new instance of KorisnikDAO
	 * if it doesn't already exist as a context attribute.
	 */
	/**
	 * Initializes the application context by creating a new instance of KorisnikDAO
	 * if it doesn't already exist as a context attribute.
	 */
	private void init() {
	    if (ctx.getAttribute("rentACarDAO") == null) {
	        String realPath = "C:\\Users\\marai\\OneDrive\\Desktop\\PROJEKAT WEB\\jokaimaraweb\\VEB_J_M\\WebContent\\rent-car.txt"; // Absolute path
	        ctx.setAttribute("rentACarDAO", new RentACarDAO(realPath));
	    }
	}
	

	@POST
	@Path("/createRAC")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public RentACarObjekat create(RentACarObjekat rentACarObjekat) {
	    init();
	    RentACarDAO rentACarDAO = (RentACarDAO) ctx.getAttribute("rentACarDAO");
	  
	    
	    return rentACarDAO.sacuvaj(rentACarObjekat);
	}
}
