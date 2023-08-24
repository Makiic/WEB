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
import model.Korisnik.Uloga;
import dao.KorisnikDAO;

@Path("/korisnici")
public class KorisnikService{
	
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
	    if (ctx.getAttribute("korisnikDAO") == null) {
	        String realPath = "C:/Users/marai/OneDrive/Desktop/projekatizveba/jokaimaraweb/VEB_J_M/WebContent/korisnik.txt"; // Absolute path
	        ctx.setAttribute("korisnikDAO", new KorisnikDAO(realPath));
	    }
	}


	@POST
	@Path("/registracija")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korisnik register(Korisnik korisnik) {
	    init();
	    KorisnikDAO korisnikDAO = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
	    
	    // Set default values for role and points if they are not provided
	    if (korisnik.getUloga() == null) {
	        korisnik.setUloga(Uloga.Kupac); 
	    }
	    if (korisnik.getUloga() == Uloga.Kupac ) {
	        korisnik.setBrojBodova(0); 
	    }
	    
	    return korisnikDAO.sacuvaj(korisnik);
	}

	@GET
	@Path("/getRegistered")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<Korisnik> getRegistersUsers(){
		
		System.out.println("USLO da prostis");
		KorisnikDAO korisnikDAO = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		return korisnikDAO.getALL();
	}
	@GET
	@Path("/getUser/{korisnickoIme}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korisnik getUser(@PathParam("korisnickoIme") String korisnickoIme) {
	    KorisnikDAO korisnikDAO = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
	    return korisnikDAO.pronadji(korisnickoIme);
	}
	@PUT
	@Path("/edit/{korisnickoIme}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korisnik updateUser(@PathParam("korisnickoIme") String korisnickoIme, Korisnik updatedKorisnik) {
		System.out.println("USLO da prostis");
		KorisnikDAO korisnikDAO = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
	    
	    Korisnik updatedUser = korisnikDAO.update(updatedKorisnik); 
	    return updatedUser;
	}

	
}
