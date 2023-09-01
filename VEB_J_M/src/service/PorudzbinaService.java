package service;

import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import dao.KorisnikDAO;
import dao.PorudzbinaDAO;
import model.Korisnik;
import model.Korisnik.Uloga;
import model.Porudzbina;
import model.Porudzbina.StatusPorudzbine;
@Path("/porudzbine")
public class PorudzbinaService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	private void init() {
	    if (ctx.getAttribute("porudzbinaDAO") == null) {
	        String realPath = "C:\\Users\\marai\\OneDrive\\Desktop\\PROJEKAT WEB\\jokaimaraweb\\VEB_J_M\\WebContent\\porudzbine.txt"; // Absolute path
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
