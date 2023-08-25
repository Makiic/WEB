Vue.component("prikaz-objekta", {
  data() {
    return {
      selectedObject: null,
      lokacije: null,
      rentACarObjects: {},
      vozila: {},
      foundVozila: [],
    };
  },
  computed: {
    statusDisplay() {
      if (this.selectedObject && this.selectedObject.status) {
        return "Otvoreno";
      } else {
        return "Zatvoreno";
      }
    },
  },
  template: `
  <div>
  <div class="login-bar">
		  <button class="login-button">Prijavi se</button>
		</div>
        <img src="images/cover.JPG" alt="Image" style="width: 100%;">
	<div class="content">
	
  <div class="column-1">
    <div class="column-1-content">
    </div>
  </div>
  <div class="column-2">
    <div class="object-details">
      <div v-if="selectedObject">
        <div class="object-header">
          <img :src="selectedObject.logo" alt="Logo" class="logo" />
          <div class="object-info">
            <p class="naziv-objekta">{{ selectedObject.naziv }}</p>
            <p>Lokacija: {{ getLokacijaById(selectedObject.lokacija) }}</p>
            <p>Radno vreme: {{ selectedObject.startVreme }} - {{ selectedObject.endVreme }}</p>
            <p>Prosecna ocena: {{ selectedObject.ocena }}</p>
            <p>{{ statusDisplay }}</p>
          </div>
        </div>
        <div class="vozila-container" v-if="selectedObject.vozilaUPonudi.length">
          <h3>Vozila u ponudi:</h3>
          <div v-for="voziloId in selectedObject.vozilaUPonudi" :key="voziloId" class="vozilo-container">
            <div class="vozilo-details">
		        <div class="vozilo-left">
		          <img :src="'images/' + vozila[voziloId].slika" :alt="'slika ' + vozila[voziloId].marka" width="70" height="70">
		        </div>
		        <div class="vozilo-right">
		          <p>Marka: {{ vozila[voziloId].marka }}</p>
		          <p>Model: {{ vozila[voziloId].model }}</p>
		          <p>Tip goriva: {{ vozila[voziloId].tipGoriva }}</p>
		          <p>Vrsta menjaca: {{ vozila[voziloId].vrstaMenjaca }}</p>
		        </div>
		      </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</div>
</div>


  `,
methods: {
	getLokacijaById(id) {
	    if (this.lokacije && this.lokacije[id]) {
	      const { ulica, grad } = this.lokacije[id];
	      const lokacijaString = `${ulica}, ${grad}`;
	      console.log("Found location for ID", id, ":", lokacijaString);
	      return lokacijaString;
	    }
	    return "";
	  },
	loadRentACarObjects() {
	  axios.get('rent-car.txt')
	    .then(response => {
	      const data = response.data.split("\n");
	      data.forEach(line => {
	         const [id, naziv, vozilaUPonudiStr, lokacija, ocena, statusStr, logo, startVreme, endVreme] = line.split(";");
	        
				// Construct the object details
				const object = {
				  id: id.trim(),
				  naziv: naziv.trim(),
				  vozilaUPonudi: vozilaUPonudiStr.trim().split(","),
				  lokacija: lokacija.trim(),
				  ocena: ocena.trim(),
				  status: statusStr.trim().toLowerCase() === "true",
				  logo: logo.trim(),
				  startVreme: startVreme.trim(),
				  endVreme: endVreme.trim()
				};
	        
	        // Output the object properties to the console for verification
	        console.log("Constructed object:", object);
	
	        // Store the object details in rentACarObjects
	        this.rentACarObjects[id] = object;
	      });
	
	      // Fetch object details for the current route's ID
	      this.fetchObjectDetails();
	    })
	    .catch(error => {
	      console.error("Error fetching rent-a-car object data:", error);
	    });
	},
    fetchObjectDetails() {
      const id = this.$route.params.id;
      console.log("Fetching object details for ID:", id);

      // Check if the object details are available in rentACarObjects
      if (this.rentACarObjects[id]) {
        this.selectedObject = this.rentACarObjects[id];
      } else {
        this.selectedObject = null; // Handle the case when object details are not available
      }
    },
    getVozilaUPonudiNames(vozilaIds) {
	    return vozilaIds.map(voziloId => {
	      const vozilo = this.vozila[voziloId];
	      if (vozilo) {
	        return vozilo;
	      } else {
	        return 'Nepoznato vozilo';
	      }
	    });
	  },
	getVoziloById(id) {
	  return axios.get(`/vozila/getVozilo/${id}`)
	    .then(response => response.data)
	    .catch(error => {
	      console.error(`Error fetching car with ID ${id}:`, error);
	      throw error;
	    });
	},

    loadVozilaData() {
	  axios
	    .get('vozila.txt')
      .then(response => {
        const data = response.data.split("\n");
        const vozila = data.reduce((acc, line) => {
          const [IdVozila, marka, model, cena, tip, objekatPripada, vrstaMenjaca, tipGoriva, potrosnja, brojVrata, brojOsoba, opis, slika, status] = line.split(";");
          acc[IdVozila.trim()] = { 
            marka: marka.trim(), 
            model: model.trim(),
            cena: cena.trim(),
            tip: tip.trim(),
            objekatPripada: objekatPripada.trim(),
            vrstaMenjaca: vrstaMenjaca.trim(),
            tipGoriva: tipGoriva.trim(),
            potrosnja: potrosnja.trim(),
            brojVrata: brojVrata.trim(),
            brojOsoba: brojOsoba.trim(),
            opis: opis.trim(),
            slika: slika.trim(),
            status: status.trim()
          };
          return acc;
        }, {});
        this.vozila = vozila;
        
        this.fetchObjectDetails();
      })
	    .catch(error => {
	      console.error("Error fetching vozilo data:", error);
	    });
	},
  },
  mounted() {
    axios
    .get('lokacije.txt')
      .then(response => {
        const data = response.data.split("\n");
        const lokacije = data.reduce((acc, line) => {
          const [Id, ulica, grad] = line.split(";");
          acc[Id.trim()] = { Id: Id.trim(), ulica: ulica.trim(), grad: grad.trim() };
          return acc;
        }, {});
        this.lokacije = lokacije;
      })
      .catch(error => {
        console.error("Error fetching location data:", error);
      });

    // Fetch object details
    this.loadRentACarObjects();
    this.loadVozilaData();
    
  },
  
});