Vue.component("profil-menadzera", {
		data : function()
		{
		return {
	      korisnickoIme: this.$route.params.korisnickoIme,
	      korisnik: {},
	      vozila: [],
	      porudzbine: [],
	      objects: [],
	      selectedObjekat: null,
	      filteredPorudzbine: [],
	      selectedPriceRange: {
	        min: null,
	        max: null,
	        
	      },
	      filterButtonClicked: false,
	      selectedStartDate: null,
	      selectedEndDate: null,
	      dateFilterButtonClicked: false,
	      dateFilterApplied: false,
	      objectSortOrder: "asc",
	      dateSortOrder: "asc",
	      priceSortOrder: "asc",
    	  showAllPorudzbineButton: true,
	    	menazdersObject: null,
    showOdbijPopupFlag: false,
    odbijReason: "",
			}
},
template:
`
<div>
    <link rel="stylesheet" href="css/profil-korisnika.css">
    <div class="login-bar-profil">
      <router-link :to="getPocetnaLink()" class="pocetna-button">Pocetna stranica</router-link>
      <router-link :to="getProfileLink()" class="login-button">Moj profil</router-link>
    </div>
<div class="page">
    <div class="main-container">
      <div class="sorting-container">
		<div class="price-range-container">
		    <label for="minPrice">Min Cena:</label>
		    <input type="number" v-model="selectedPriceRange.min" id="minPrice">
		    <label for="maxPrice">Max Cena:</label>
		    <input type="number" v-model="selectedPriceRange.max" id="maxPrice">
		    <button @click="applyFilter">Filtriraj</button>
		  </div>
		  <div class="date-range-container">
			  <label for="startDate">Start Date:</label>
			  <input type="date" v-model="selectedStartDate" id="startDate">
			  <label for="endDate">End Date:</label>
			  <input type="date" v-model="selectedEndDate" id="endDate">
			  <button @click="applyDateFilter">Pronadji</button>
			</div>
			 <div class="date-sorting">
		   <button @click="toggleSort('datum')">Sortiraj po datumu</button>
		   <span>Sort Order: {{ dateSortOrder }}</span>
		</div>
		<div class="price-sorting">
		   <button @click="toggleSort('cena')">Sortiraj po ceni</button>
		   <span>Sort Order: {{ priceSortOrder }}</span>
		</div>
		</div>
      <div class="details-container">
        <!-- Sorting options and filters go here -->
        <div class="content">
        
                     
        <div class="korisnik-info">
          <div class="korisnik-header">
            <p>Korisnik: {{ korisnickoIme }}</p>
            <p>Ime: {{ korisnik.ime }}</p>
            <p>Prezime: {{ korisnik.prezime }}</p>
            <p>Lozinka: {{ korisnik.lozinka }}</p>
             <div v-for="obj in objects" :key="obj.id">
</div>
          </div>
          <div class="korisnik-details">
            <p>Pol: {{ korisnik.pol }}</p>
            <p>Datum Rodjenja: {{ korisnik.datumRodjenja }}</p>
            <p>Uloga: {{ korisnik.uloga }}</p>
            <p>Broj Bodova: {{ korisnik.brojBodova }}</p>
            <p>Tip: {{ korisnik.tip }}</p>
          </div>
        </div>
        
      </div>
      <div class="porudzbine">
          <h2>Objekat:</h2>
          
          
           <div class="object" >
			  <router-link :to="{ name: 'rent-a-car-details-menadzer', params: { id: menazdersObject.id } }">
			      <!-- Display the object's content here -->
			      <div class="logo-container">
		      <img :src="menazdersObject.logo" alt="Object Logo" width="100" height="100">
					</div>
			      <div class="name">{{ menazdersObject.naziv }}</div>
			      <div class="location">{{ getLokacijaById(menazdersObject.lokacija) }}</div>
			      <div class="ocena">{{ menazdersObject.ocena }}</div>
			    </router-link>
			</div>
			<h3>Porudzbine objekta:</h3>
			<button v-if="showAllPorudzbineButton" @click="showAllPorudzbine"  class="action-button">Prikazi sve porudzbine</button>
          
			<li v-for="porudzbina in filteredPorudzbine" :key="porudzbina.id">
              <div class="porudzbina-container">
              
                <p class="porudzbina-status">Status: {{ porudzbina.status }}</p>
                  <p class="porudzbina-cena">Cena: {{ porudzbina.cena }}</p>
                  
                  <p class="porudzbina-cena">Kupac: {{ porudzbina.imePrezimeKupca }}</p>
 					<button v-if="porudzbina.status !== 'Vraceno'" @click="odobriPorudzbinu(porudzbina)">Odobri</button>
    					
					    <button v-if="porudzbina.status !== 'Vraceno'" @click="showOdbijPopup(porudzbina)">Odbij</button>
						<div v-if="porudzbina.status !== 'Vraceno'">

						<div v-if="showOdbijPopupFlag" class="popup">
						  <div class="popup-content">
						    <span @click="closeOdbijPopup" class="close-popup">&times;</span>
						    <h3>Odbij porudžbinu</h3>
						    <textarea v-model="odbijReason" placeholder="Unesite razlog odbijanja"></textarea>
						    <button @click="odbijPorudzbinu(porudzbina, odbijReason)">Potvrdi</button>
						  </div>
						</div>
					  </div>
                  
                </div>
              </div>
            </li>
        </div>
      </div>
    </div>
  </div>
</div>
  `

 
 
, methods: {
	showOdbijPopup(porudzbina) {
    this.showOdbijPopupFlag = true;
  },

  closeOdbijPopup() {
    this.showOdbijPopupFlag = false;
  },

  odbijPorudzbinu(porudzbina, reason) {
    this.closeOdbijPopup();
  },
	odobriPorudzbinu(porudzbina) {
    porudzbina.status = "Odobreno";
  },

  odbijPorudzbinu(porudzbina) {
    porudzbina.status = "Odbijeno";

  },
	 getLokacijaById(id) {
      if (this.lokacije && this.lokacije[id]) {
        const { ulica, grad } = this.lokacije[id];
        return `${ulica}, ${grad}`;
      }
      return "";
    },
		getProfileLink() {
	    const korisnickoIme = this.$data.korisnickoIme;
		  console.log('korisnickoIme:', korisnickoIme); // Log the value to the console
		  return `/menadzerPocetna/${korisnickoIme}/profilMenadzera`;
			  },
	  getPocetnaLink() {
	    const korisnickoIme = this.$data.korisnickoIme;
	    return `/menadzerPocetna/${korisnickoIme}`;
	  },
	loadKorisnici() {
      axios
        .get("korisnik.txt")
        .then((response) => {
          const data = response.data.split("\n");
          const korisnici = data.map((line, index) => {
            // Skip the last empty line
            if (index === data.length - 1 && line.trim() === "") {
              return null;
            }

            const [
              korisnickoIme,
              lozinka,
              ime,
              prezime,
              pol,
              datumRodjenja,
              ulogaStr,
              svaIznajmljivanjaStr,
              idKorpe,
              idObjekta,
              brojBodovaStr,
              tipStr
            ] = line.split(";");
            const svaIznajmljivanja = svaIznajmljivanjaStr.split(",");

            // Validate if all fields are present
            if (
              korisnickoIme &&
              lozinka &&
              ime &&
              prezime &&
              pol &&
              datumRodjenja &&
              ulogaStr &&
              svaIznajmljivanjaStr &&
              idKorpe&&
              idObjekta&&
              brojBodovaStr &&
              tipStr
            ) {
              return {
                korisnickoIme: korisnickoIme.trim(),
                lozinka: lozinka.trim(),
                ime: ime.trim(),
                prezime: prezime.trim(),
                pol: pol.trim(),
                datumRodjenja: datumRodjenja.trim(),
                uloga: ulogaStr.trim(),
                svaIznajmljivanja,
                idKorpe: idKorpe.trim(),
                idObjekta: idObjekta.trim(),
                brojBodova: parseInt(brojBodovaStr.trim()),
                tip: tipStr.trim(),
              };
            } else {
              console.error("Skipped line due to missing fields:", line);
              return null; // Skip invalid line
            }
          });
          this.korisnici = korisnici.filter((korisnik) => korisnik !== null); // Remove null values
          this.korisnik = this.korisnici.find(
            (user) => user.korisnickoIme === this.$route.params.korisnickoIme
          );
          console.log("this.idObjekta:", this.korisnik.idObjekta);
          this.menazdersObject = this.objects.find((objekat) => objekat.id === parseInt(this.korisnik.idObjekta));
		console.log("MENADZEROV", this.menazdersObject);
			console.log("KOR", this.korisnici);
        })
        .catch((error) => {
          console.error("Error fetching korisnici data:", error);
        });
    },
	loadPorudzbine() {
	  axios
	    .get("porudzbine.txt")
	    .then((response) => {
	      const data = response.data.split("\n");
	      const porudzbine = data.map((line) => {
	        const trimmedLine = line.trim(); // Trim the line to remove leading/trailing whitespace
	        if (trimmedLine === "") {
	          return null; // Skip empty lines
	        }
	
	        const [
	          id,
	          iznajmljenaVozilaStr,
	          objekat,
	          datumIznajmljivanjaStr,
	          trajanjeNajma,
	          cena,
	          imePrezimeKupca,
	          statusStr
	        ] = trimmedLine.split(";");
	
	        const iznajmljenaVozila = iznajmljenaVozilaStr.split(",");
	        const datumIznajmljivanja = new Date(datumIznajmljivanjaStr);
	
	        const status = statusStr.trim();
	
	        return {
	          id: id.trim(),
	          iznajmljenaVozila,
	          objekat: parseInt(objekat),
	          datumIznajmljivanja,
	          trajanjeNajma: parseInt(trajanjeNajma),
	          cena: parseFloat(cena),
	          imePrezimeKupca: imePrezimeKupca.trim(),
	          status,
	        };
	      });
	
 			this.porudzbine = porudzbine.filter((porudzbina) => porudzbina !== null);
          this.korisnikPorudzbine = [...this.porudzbine];
          const menadzersObjectId = this.menazdersObject ? this.menazdersObject.id : null;
      if (menadzersObjectId) {
        this.porudzbine = this.porudzbine.filter((porudzbina) => porudzbina.objekat === menadzersObjectId);
        
          console.log("Loaded porudzbine:", menadzersObjectId);
          console.log("Loaded porudzbine:", this.porudzbine);
      } 
    })
	    .catch((error) => {
	      console.error("Error fetching porudzbine data:", error);
	    });
	},

	loadVozila() {
  axios
    .get('vozila.txt')
    .then(response => {
      const data = response.data.split("\n");

      // Initialize an array to store the vehicles
      const vozila = [];

      // Iterate through each line of data
      data.forEach(line => {
        const fields = line.split(";");
        
        // Check if the line has the expected number of fields
        if (fields.length === 14) {
          const [
            IdVozila, marka, model, cena, tip, objekatPripada,
            vrstaMenjaca, tipGoriva, potrosnja, brojVrata, brojOsoba,
            opis, slika, status
          ] = fields;

          // Create an object for each vehicle and push it to the array
          vozila.push({
            id: IdVozila.trim(),
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
          });
        }
      });

      // Assign the array of vehicles to this.vozila
      this.vozila = vozila;

      console.log("Loaded vozila:", this.vozila);
    })
    .catch(error => {
      console.error("Error fetching vozilo data:", error);
    });
},
    getVozilaForPorudzbina(porudzbina) {
      return porudzbina.iznajmljenaVozila.map((id) => this.getVoziloById(id));
    },
    loadObjekti() {
     axios
      .get('rent-car.txt')
      .then(response => {
        const data = response.data.split("\n");
        const objects = data.map((line, index) => {
          const [id, naziv, vozilaUPonudiStr, lokacija, ocena, statusStr, logo] = line.split(";");
          const status = statusStr.trim().toLowerCase() === "true" ? true : false;
          const vozilaUPonudi = vozilaUPonudiStr.trim().split(",");
          return {
            id: parseInt(id.trim()),
            naziv: naziv.trim(),
            vozilaUPonudi: vozilaUPonudi,
            lokacija: lokacija.trim(),
            ocena: ocena.trim(),
            status: status,
            logo: logo.trim()
          };
        });
        this.objects = objects;
      console.log("Loaded objects:", this.objects);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
    },
    
    
     findPorudzbineForSelectedObject() {
  const selectedObjectId = this.menazdersObject ? this.menazdersObject.id : null;
  if (!selectedObjectId) {
    return [];
  }

      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:", selectedObjectId);
  return this.porudzbine.filter(porudzbina => porudzbina.objekat === selectedObjectId);
},
	  
	  
	getMatchedObjects() {
	    const filteredPorudzbine = this.porudzbine.filter((porudzbina) => {
	      return this.korisnik.svaIznajmljivanja.includes(porudzbina.id);
	    });
	
	    const matchedObjectIds = filteredPorudzbine.map((porudzbina) => {
	      return porudzbina.objekat;
	    });
	    return matchedObjectIds;
	  },
		findPorudzbineForSelectedObject() {
    const selectedObjectId = this.selectedObject ? this.selectedObject.id : null;
    if (!selectedObjectId) {
      return [];
    }

    return this.porudzbine.filter(porudzbina => porudzbina.objekat === selectedObjectId);
  },

	  findObjekatForPorudzbina(objectId) {
		    const matchedObjectIds = this.getMatchedObjects();
			
			  const matchedObjects = matchedObjectIds.map((objectId) => {
			    return this.getObjectById(objectId);
			  });
			   console.log("Matched Objects:", matchedObjects);
		    return matchedObjects;
			},

	  getObjectById(objectId) {
		    return this.objects.find((objekat) => objekat.id === objectId);
		  },
		filterPorudzbineByObjekat() {
	    if (this.menazdersObject === null || this.menazdersObject === "") {
		    this.filteredPorudzbine = [...this.porudzbine]; // Display all orders
		  } else {
		    this.filteredPorudzbine = this.porudzbine.filter(
		      (porudzbina) => porudzbina.objekat === this.menazdersObject
		    );
		    
		  }
		 if (this.filterButtonClicked) {
	    const minPrice = this.selectedPriceRange.min;
	    const maxPrice = this.selectedPriceRange.max;
	
	    console.log("Minimum Price:", minPrice);
	    console.log("Maximum Price:", maxPrice);
	
	    this.filteredPorudzbine = this.porudzbine.filter((porudzbina) => {
	      const cena = porudzbina.cena;
	      console.log("Cena:", cena);
	
	      const cenaInRange = cena >= minPrice && cena <= maxPrice;
	      return cenaInRange;
	    });
	  }
		
		  this.filterButtonClicked = false;
	  },
		  applyFilter() {
		    this.filterButtonClicked = true;
		    this.filterPorudzbineByObjekat();
		  },
		  filterPorudzbineByDateRange() {
		  if (!this.dateFilterButtonClicked) {
		    return;
		  }
		
		    this.filteredPorudzbine = this.porudzbine.filter((porudzbina) => {
		      const startDate = new Date(this.selectedStartDate);
		      const endDate = new Date(this.selectedEndDate);
		      const porudzbinaDate = porudzbina.datumIznajmljivanja;
		
		      return porudzbinaDate >= startDate && porudzbinaDate <= endDate;
		    });
		  },
		   applyFilter() {
		    this.filterButtonClicked = true;
		    this.filterPorudzbineByObjekat();
		  },
		
		  applyDateFilter() {
		    this.dateFilterButtonClicked = true;
		    this.dateFilterApplied = true;
		    this.filterPorudzbineByDateRange();
		  },
		  sortByObjectName() {
		    this.objects.sort((a, b) => {
		      const nameA = a.naziv.toLowerCase();
		      const nameB = b.naziv.toLowerCase();
		      return this.objectSortDirection * nameA.localeCompare(nameB);
		    });
		  },
			sortPorudzbineByObjectName() {
		  const ascending = this.objectSortOrder === "asc";
		
		  this.korisnikPorudzbine.sort((a, b) => {
		    const objekatA = this.getObjectById(a.objekat).naziv.toLowerCase();
		    const objekatB = this.getObjectById(b.objekat).naziv.toLowerCase();
		    return ascending ? objekatA.localeCompare(objekatB) : objekatB.localeCompare(objekatA);
		  });
		   console.log("Sorted Orders:", this.korisnikPorudzbine);
		},

	  toggleObjectSortDirection() {
	    this.objectSortDirection *= -1;
	    this.sortByObjectName();
	  },
	
	 toggleObjectSortOrder() {
	  this.objectSortOrder = this.objectSortOrder === "asc" ? "desc" : "asc";
	  this.sortPorudzbineByObjectName();
	  this.filteredPorudzbine = [...this.korisnikPorudzbine]; // Update filteredPorudzbine with sorted orders
	},
	toggleDateSortOrder() {
	      this.dateSortOrder = this.dateSortOrder === "asc" ? "desc" : "asc";
	      this.sortPorudzbineByDate();
	      this.filteredPorudzbine = [...this.korisnikPorudzbine];
	   },

   togglePriceSortOrder() {
      this.priceSortOrder = this.priceSortOrder === "asc" ? "desc" : "asc";
      this.sortPorudzbineByPrice();
      this.filteredPorudzbine = [...this.korisnikPorudzbine];
   },

   sortByDate(order) {
      if (order === 'asc') {
         this.porudzbine.sort((a, b) => a.datumIznajmljivanja - b.datumIznajmljivanja);
      } else {
         this.porudzbine.sort((a, b) => b.datumIznajmljivanja - a.datumIznajmljivanja);
      }
      this.filteredPorudzbine = [...this.porudzbine];
   },

   sortByPrice(order) {
      if (order === 'asc') {
         this.porudzbine.sort((a, b) => a.cena - b.cena);
      } else {
         this.porudzbine.sort((a, b) => b.cena - a.cena);
      }
      this.filteredPorudzbine = [...this.porudzbine];
   },
   toggleSort(type) {
      if (type === 'datum') {
         this.dateSortOrder = this.dateSortOrder === 'asc' ? 'desc' : 'asc';
         this.sortByDate(this.dateSortOrder);
      } else if (type === 'cena') {
         this.priceSortOrder = this.priceSortOrder === 'asc' ? 'desc' : 'asc';
         this.sortByPrice(this.priceSortOrder);
      }
   },
   initializeData() {
    this.korisnikPorudzbine = [...this.porudzbine]; // Copy all orders initially
    this.filteredPorudzbine = this.korisnikPorudzbinez; // Display all orders initially
  },
   showAllPorudzbine() {
    this.filteredPorudzbine = [...this.porudzbine]; // Display all orders
    this.showAllPorudzbineButton = false; // Hide the button
  },
  reduceBrojBodova(porudzbina) {
    if (porudzbina.status === "Obrada") {
      if (this.korisnik.brojBodova > 0) {
        this.korisnik.brojBodova--;
        // Implement logic to update the user's points on the server if needed
      } else {
        alert("You don't have enough points to reduce.");
      }
    }
  },
  },
computed: {
   korisnikPorudzbine() {
	    return this.porudzbine.filter((porudzbina) => {
	      return this.korisnik.svaIznajmljivanja.some((id) => id === porudzbina.id);
	    });
	  },
	 filteredPorudzbineByObject() {
    return this.findPorudzbineForSelectedObject();
  },

  },
  mounted() {
Promise.all([
    this.loadObjekti(),
    this.loadKorisnici(),
    this.loadPorudzbine(),
    this.loadVozila(),
  ]).then(() => {
    this.initializeData(); // Initialize data structures
    this.sortByObjectName(); // Sort the list initially
  });
  
  this.sortByObjectName();
  this.sortPorudzbineByObjectName();
  this.loadObjekti();
      this.loadKorisnici();
      this.loadPorudzbine();
      this.loadVozila();
},
watch: {
	  selectedObjekat: "filterPorudzbineByObjekat",
	  dateFilterButtonClicked: function(newValue) {
    if (newValue && this.dateFilterApplied) {
      this.filterPorudzbineByDateRange();
    }
  },
  },
  created() {
    this.initializeData().then(() => {
      // Now that data is loaded, you can proceed with sorting or filtering
    });
  },
});
