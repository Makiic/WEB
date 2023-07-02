package service;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
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

import model.Korisnik;
import dao.KorisnikDAO;

@Path("/korisnici")
public class KorisnikService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;

	@PostConstruct
	private void init() 
	{
		if(ctx.getAttribute("korisnikDAO") == null) 
		{
			ctx.setAttribute("korisnikDAO", new KorisnikDAO(ctx.getRealPath("")));
		}	
	}
	@POST
	@Path("/registracija")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korisnik register(Korisnik korisnik){
		init();
		KorisnikDAO korisnikDAO = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
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
	public Korisnik updateUser(@PathParam ("korisnickoIme") String korisnickoIme, Korisnik updatedKorisnik) {
		KorisnikDAO korisnikDAO  = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
		Korisnik korisnik = korisnikDAO.update(updatedKorisnik);
		return korisnik;
	}
}
