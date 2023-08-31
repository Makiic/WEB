package service;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import dao.KorisnikDAO;
import dao.PorudzbinaDAO;
import model.Korisnik;
import model.Korisnik.Uloga;
import model.Porudzbina;
@Path("/porudzbine")
public class PorudzbinaService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	private void init() {
	    if (ctx.getAttribute("porudzbinaDAO") == null) {
	        String realPath = "C:\\Users\\Jovana\\Desktop\\WebProject\\jokaimaraweb\\VEB_J_M\\WebContent\\porudzbine.txt"; // Absolute path
	        ctx.setAttribute("porudzbinaDAO", new PorudzbinaDAO(realPath));
	    }
	}
	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Porudzbina add(Porudzbina porudzbina) {
	    init();
	    PorudzbinaDAO porudzbinaDAO = (PorudzbinaDAO) ctx.getAttribute("porudzbinaDAO");
	    
	    return porudzbinaDAO.sacuvaj(porudzbina);
	}
}
