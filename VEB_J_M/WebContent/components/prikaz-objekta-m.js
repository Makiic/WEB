Vue.component("prikaz-objekta-m", {
  data() {
    return {
      korisnickoIme: this.$route.params.korisnickoIme,
      selectedObject: null,
      lokacije: null,
      rentACarObjects: {},
      vozila: {},
      foundVozila: [],
      showForm: false, 
      newVozilo: {
        marka: '',
        model: '',
      cena: '',
      tip: '',
      objekatPripada: '',
      vrstaMenjaca: '',
      tipGoriva: '',
      potrosnja: '',
      brojVrata: '',
      brojOsoba: '',
      opis: '',
      },
      showEditForm: false,
      editedVoziloId: null,
      editedVozilo: {
        
        marka: '',
        model: '',
	      cena: '',
	      tip: '',
	      objekatPripada: '',
	      vrstaMenjaca: '',
	      tipGoriva: '',
	      potrosnja: '',
	      brojVrata: '',
	      brojOsoba: '',
	      opis: '',
      },
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
    <link rel="stylesheet" href="css/prikaz-objekta.css">
	  <div class="login-bar-profil">
      <router-link :to="getPocetnaLink()" class="pocetna-button">Pocetna stranica</router-link>
      <router-link :to="getProfileLink()" class="login-button">Moj profil</router-link>
    </div>
	</div>
    <img src="images/cover.JPG" alt="Image" style="width: 100%;">
	<div class="content">	
	  <div class="column-1">
	    
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
	          <div v-for="vozilo  in filteredVozila()" :key="vozilo.IdVozila" class="vozilo-container">
	            <div class="vozilo-details">
			        <div class="vozilo-left">
			          <img :src="'images/' + vozilo.slika" :alt="'slika ' + vozilo.marka" width="70" height="70">
			        </div>
			        <div class="vozilo-right">
			          <p>Marka: {{ vozilo.IdVozila }}</p>
			          <p>Marka: {{ vozilo.marka }}</p>
			          <p>Model: {{ vozilo.model }}</p>
			          <p>Tip goriva: {{ vozilo.tipGoriva }}</p>
			          <p>Vrsta menjaca: {{ vozilo.vrstaMenjaca }}</p>
			        </div>
			        <button @click="editVozilo(vozilo.IdVozila)">Izmeni</button>
    <button @click="deleteVozilo(vozilo)">Obrisi</button>
			      </div>
	          </div>
	        </div>
	        <div v-if="showEditForm" class="vozila-form-container">
    <h3>Edit Vozilo</h3>
    <form @submit.prevent="saveEditedVozilo">
      <!-- Input fields for editing Vozilo data -->
      <!-- ... (input fields for editing Vozilo data, similar to your "Add New Vozilo" form) -->

      <button type="submit">Save Changes</button>
      <button @click="cancelEdit">Cancel</button>
    </form>
  </div>
	        <button @click="toggleForm">Add New Vozilo</button>

    <!-- Form for adding a new vozilo (initially hidden) -->
    <div v-if="showForm"  class="vozila-form-container">
      <h3>Add New Vozilo</h3>
      <form @submit.prevent="addNewVozilo" >
        <div class="form-group">
          <label for="marka">Marka:</label>
          <input type="text" id="marka" v-model="newVozilo.marka" required>
        </div>
        <div class="form-group">
          <label for="model">Model:</label>
          <input type="text" id="model" v-model="newVozilo.model" required>
        </div>
        <div class="form-group">
          <label for="cena">Cena:</label>
          <input type="text" id="cena" v-model="newVozilo.cena" required>
        </div>
        <div class="form-group">
          <label for="tip">Tip:</label>
          <input type="text" id="tip" v-model="newVozilo.tip" required>
        </div>
        <div class="form-group">
          <label for="vrstaMenjaca">Vrsta menjaca:</label>
          <input type="text" id="vrstaMenjaca" v-model="newVozilo.vrstaMenjaca" required>
        </div>
        <div class="form-group">
          <label for="tipGoriva">Tip goriva:</label>
          <input type="text" id="tipGoriva" v-model="newVozilo.tipGoriva" required>
        </div>
        <div class="form-group">
          <label for="potrosnja">Potrosnja:</label>
          <input type="text" id="potrosnja" v-model="newVozilo.potrosnja" required>
        </div>
        <div class="form-group">
          <label for="brojVrata">Broj vrata:</label>
          <input type="text" id="brojVrata" v-model="newVozilo.brojVrata" required>
        </div>
        <div class="form-group">
          <label for="brojOsoba">Broj osoba:</label>
          <input type="text" id="brojOsoba" v-model="newVozilo.brojOsoba" required>
        </div>
        <div class="form-group">
  <label for="opis">Opis:</label>
  <textarea id="opis" v-model="newVozilo.opis" required></textarea>
</div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div v-else>
  <p>Loading...</p>
</div>
  </div>
	    </div>
	  </div>
	</div>
</div>


  `,
methods: {
		getProfileLink() {
	    const korisnickoIme = this.$data.korisnickoIme;
		  console.log('korisnickoIme:', korisnickoIme); // Log the value to the console
		  return `/menadzerPocetna/${korisnickoIme}/profilMenadzera`;
			  },
	  getPocetnaLink() {
	    const korisnickoIme = this.$data.korisnickoIme;
	    return `/menadzerPocetna/${korisnickoIme}`;
	  },
	filteredVozila() {
     if (this.selectedObject) {
    const selectedObjekatId = this.selectedObject.id;
    return Object.values(this.vozila).filter(vozilo => vozilo.objekatPripada === selectedObjekatId);
  }
  return [];
  },
  deleteVozilo(voziloId) {
    if (confirm('Are you sure you want to delete this Vozilo?')) {
      // Find the index of the Vozilo with the given Id in the selectedObject's Vozila array
      const indexToDelete = this.selectedObject.vozilaUPonudi.indexOf(voziloId);
		console.log(indexToDelete);
      if (indexToDelete !== -1) {
        // Remove the Vozilo from the selectedObject's Vozila array
        this.selectedObject.vozilaUPonudi.splice(indexToDelete, 1);

        // You can also send a request to delete the Vozilo on the server
        axios.delete(`rest/vozila/delete/`+ indexToDelete)
          .then(response => {
            // Handle the successful deletion on the server
            console.log(`Vozilo with ID ${voziloId} has been deleted.`);
          })
          .catch(error => {
            console.error(`Error deleting Vozilo with ID ${voziloId}:`, error);
          });
      } else {
        console.warn(`Vozilo with ID ${voziloId} not found in selectedObject.`);
      }
    }
  },
	addNewVozilo() {;
	this.newVozilo.objekatPripada = this.selectedObject.id;
		console.log("VOZILO", this.newVozilo.objekatPripada);
		axios.post('rest/vozila/create', this.newVozilo)
		  .then(response => {
		    // Handle the response from the server
		  })
		  .catch(error => {
		    console.error(error);
		    // Handle any errors that occur during the request
		  });
	},
	toggleForm() {
      this.showForm = !this.showForm;
    },
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
        // Skip empty or whitespace-only lines
        if (line.trim() === '') {
          return acc;
        }

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
      console.log(this.vozila);
      
      this.fetchObjectDetails();
    })
    .catch(error => {
      console.error("Error fetching vozilo data:", error);
    });
},

  },
  mounted() {
    // Fetch object details
    this.loadRentACarObjects();
    this.loadVozilaData();
    
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

    
  },
  
});