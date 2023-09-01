package service;

import java.util.Collection;

import javax.annotation.PostConstruct;
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

import model.Vozilo;
import dao.VoziloDAO;

@Path("/vozila")
public class VoziloService {
    
    @Context
    HttpServletRequest request;
    
    @Context
    ServletContext ctx;

    @PostConstruct
    private void init() {
        if (ctx.getAttribute("voziloDAO") == null) {
            String realPath = "C:\\\\Users\\\\Jovana\\\\Desktop\\\\WebProject\\\\jokaimaraweb\\\\VEB_J_M\\\\WebContent\\\\vozila.txt";
            ctx.setAttribute("voziloDAO", new VoziloDAO(realPath));
        }
    }

    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Vozilo> getAllVozila() {
        VoziloDAO dao = (VoziloDAO) ctx.getAttribute("voziloDAO");
        return dao.getAll();
    }

    @GET
    @Path("/getVozilo/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Vozilo getVoziloById(@PathParam("id") String id) {
        VoziloDAO dao = (VoziloDAO) ctx.getAttribute("voziloDAO");
        return dao.getVoziloById(id);
    }

    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Vozilo createVozilo(Vozilo vozilo) {
    	System.out.println("VOZILOOOO");
        VoziloDAO dao = (VoziloDAO) ctx.getAttribute("voziloDAO");
        return dao.createVozilo(vozilo);
    }

    @PUT
    @Path("/update/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Vozilo updateVozilo(@PathParam("id") String id, Vozilo updatedVozilo) {
        VoziloDAO dao = (VoziloDAO) ctx.getAttribute("voziloDAO");
        return dao.updateVozilo(id, updatedVozilo);
    }

    @DELETE
    @Path("/delete/{IdVozila}")
    @Produces(MediaType.APPLICATION_JSON)
    public Vozilo deleteVozilo(@PathParam("IdVozila") String IdVozila) {
    	System.out.println("uslo u service");
        VoziloDAO dao = (VoziloDAO) ctx.getAttribute("voziloDAO");
        return dao.deleteVozilo(IdVozila);
    }
}
