package service;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import model.Vozilo;
import dao.VoziloDAO;

@Path("/vozila")
public class VoziloService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;

	@PostConstruct
	private void init() 
	{
		if(ctx.getAttribute("voziloDAO") == null) 
		{
			ctx.setAttribute("voziloDAO", new VoziloDAO(ctx.getRealPath("")));
		}	
	}
	
	@GET
	@Path("/sva")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<Vozilo> getSvaVozila() {
		VoziloDAO voziloDAO = (VoziloDAO) ctx.getAttribute("voziloDAO");
		return voziloDAO.getAll();
	}
	
	@GET
	@Path("/getVozilo/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String getVozilo(@PathParam("id") String id) {
		VoziloDAO voziloDAO = (VoziloDAO) ctx.getAttribute("voziloDAO");
		return voziloDAO.getVoziloById(id);
	}
}
