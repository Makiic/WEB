package service;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import model.Lokacija;
import dao.LokacijaDAO;

@Path("/lokacije")
public class LokacijaService{
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@PostConstruct
	private void init()
	{
		if(ctx.getAttribute("lokacijaDAO") == null) 
		{
			ctx.setAttribute("lokacijaDAO", new LokacijaDAO(ctx.getRealPath("")));
		}
	}
	@POST
	@Path("/register")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Lokacija register(Lokacija lokacija){
		
		LokacijaDAO lokacijaDAO = (LokacijaDAO) ctx.getAttribute("lokacijaDAO");
		return lokacijaDAO.Save(lokacija);
	}
}