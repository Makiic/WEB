package service;

import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.KorisnikDAO;
import dao.KorpaDAO;
import model.Korisnik;
import model.Korpa;
import model.Vozilo;
import model.Korisnik.Uloga;

@Path("/korpe")
public class KorpaService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	private void init() {
	    if (ctx.getAttribute("korpaDAO") == null) {
	        String realPath = "C:\\Users\\Jovana\\Desktop\\WebProject\\jokaimaraweb\\VEB_J_M\\WebContent\\korpe.txt"; // Absolute path
	        ctx.setAttribute("korpaDAO", new KorpaDAO(realPath));
	    }
	}
	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Korpa> getKorpe() {
		init();
		KorpaDAO dao = (KorpaDAO) ctx.getAttribute("korpaDAO");
		return dao.findAll();
	}
	
	
	@PUT
	@Path("/edit/{korisnikId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korpa updateKorpa(@PathParam("korisnikId") String korisnikId, Korpa korpa ) {


		KorpaDAO dao = (KorpaDAO) ctx.getAttribute("korpaDAO");
	    
	    Korpa updatedKorpa = dao.update(korisnikId,korpa); 
	    return updatedKorpa;
	}
	@DELETE
	@Path("/delete/{idVozila}")
	@Produces(MediaType.APPLICATION_JSON)
	public Korpa deleteKorpa(@PathParam("idVozila") String idVozila, Korpa korpa) {
	   
			System.out.println( "LALALALALALLALALALALAAAA");
	        KorpaDAO dao = (KorpaDAO) ctx.getAttribute("korpaDAO");
	        return dao.deleteVozilo(idVozila, korpa);
	}

}
