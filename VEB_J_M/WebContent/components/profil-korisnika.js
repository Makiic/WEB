Vue.component("profil-korisnika", {
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
	        max: null
	      },
	      filterButtonClicked: false,
	      selectedStartDate: null,
	      selectedEndDate: null,
	      dateFilterButtonClicked: false,
	      dateFilterApplied: false,
	      objectSortOrder: "asc",
	      dateSortOrder: "asc",
	      priceSortOrder: "asc",
    	  showAllPorudzbineButton: true
	    
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
		 <select v-model="selectedObjekat">
		 <option value="">Sve porudzbine</option>
		  <option v-for="objekat in findObjekatForPorudzbina()" :key="objekat.id" :value="objekat.id">
		    {{ objekat.naziv }}
		  </option>
		</select>
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
			<div class="object-sorting">
			    <button @click="toggleObjectSortOrder">Sortiraj po imenu objekta</button>
			    <span>Sort Order: {{ objectSortOrder }}</span>
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
          <h2>Porudzbine:</h2>
          <button v-if="showAllPorudzbineButton" @click="showAllPorudzbine"  class="action-button">Prikazi sve porudzbine</button>
          <ul class="porudzbine-list">
          
            <li v-for="porudzbina in filteredPorudzbine" :key="porudzbina.id">
            
              <div class="porudzbina-container">
              
                <p class="porudzbina-status">Status: {{ porudzbina.status }}</p>
                  <p class="porudzbina-cena">Cena: {{ porudzbina.cena }}</p>
                  
                <div class="vozila-list">
                  <div
                    v-for="vozilo in getVozilaForPorudzbina(porudzbina)"
                    :key="vozilo.IdVozila"
                    class="vozilo-container"
                  >
                    <div class="vozilo-details">
                      <div class="vozilo-left">
                        <img
                          :src="'images/' + vozilo.slika"
                          :alt="'slika ' + vozilo.marka"
                          width="250"
                          height="150"
                        >
                      </div>
                      <div class="vozilo-right">
                        <p>Marka: {{ vozilo.marka }}</p>
                        <p>Model: {{ vozilo.model }}</p>
                        <p>Tip goriva: {{ vozilo.tipGoriva }}</p>
                        <p>Vrsta menjaca: {{ vozilo.vrstaMenjaca }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
  `

 
 
, methods: {
	getProfileLink() {
      const korisnickoIme = this.$route.params.korisnickoIme;
      return `/korisnikPocetna/${korisnickoIme}/profilKorisnika`;
    },
    getPocetnaLink() {
      const korisnickoIme = this.$route.params.korisnickoIme;
      return `/korisnikPocetna/${korisnickoIme}`;
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
          console.log("Loaded porudzbine:", this.porudzbine);
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
        
      console.log("Loaded vozila:", this.vozila);
      })
	    .catch(error => {
	      console.error("Error fetching vozilo data:", error);
	    });
	},
	 getVoziloById(id) {
      return this.vozila[id];
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
    
    
     findObjekatForPorudzbina(porudzbina) {
	    return this.objects.find(objekat => objekat.id === porudzbina.objekat);
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
	    if (this.selectedObjekat === null || this.selectedObjekat === "") {
		    this.filteredPorudzbine = [...this.korisnikPorudzbine]; // Display all orders
		  } else {
		    this.filteredPorudzbine = this.korisnikPorudzbine.filter(
		      (porudzbina) => porudzbina.objekat === this.selectedObjekat
		    );
		    
		  }
		 if (this.filterButtonClicked) {
	    const minPrice = this.selectedPriceRange.min;
	    const maxPrice = this.selectedPriceRange.max;
	
	    console.log("Minimum Price:", minPrice);
	    console.log("Maximum Price:", maxPrice);
	
	    this.filteredPorudzbine = this.filteredPorudzbine.filter((porudzbina) => {
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
		
		    this.filteredPorudzbine = this.korisnikPorudzbine.filter((porudzbina) => {
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
         this.korisnikPorudzbine.sort((a, b) => a.datumIznajmljivanja - b.datumIznajmljivanja);
      } else {
         this.korisnikPorudzbine.sort((a, b) => b.datumIznajmljivanja - a.datumIznajmljivanja);
      }
      this.filteredPorudzbine = [...this.korisnikPorudzbine];
   },

   sortByPrice(order) {
      if (order === 'asc') {
         this.korisnikPorudzbine.sort((a, b) => a.cena - b.cena);
      } else {
         this.korisnikPorudzbine.sort((a, b) => b.cena - a.cena);
      }
      this.filteredPorudzbine = [...this.korisnikPorudzbine];
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
    this.filteredPorudzbine = this.korisnikPorudzbine; // Display all orders initially
  },
   showAllPorudzbine() {
    this.filteredPorudzbine = [...this.korisnikPorudzbine]; // Display all orders
    this.showAllPorudzbineButton = false; // Hide the button
  }
  },
computed: {
   korisnikPorudzbine() {
	    return this.porudzbine.filter((porudzbina) => {
	      return this.korisnik.svaIznajmljivanja.some((id) => id === porudzbina.id);
	    });
	  },

  },
  mounted() {
Promise.all([
    this.loadKorisnici(),
    this.loadPorudzbine(),
    this.loadVozila(),
    this.loadObjekti()
  ]).then(() => {
    this.initializeData(); // Initialize data structures
    this.sortByObjectName(); // Sort the list initially
  });
  
  this.sortByObjectName();
  this.sortPorudzbineByObjectName();
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
