Vue.component("menadzer-pocetna", {
  data() {
    return {
     objects: null,
      searchQuery: "",
      searchOcena: "",
      searchLokacija: "",
      searchTip: "",
      isPretraziExpanded: false,
      lokacije: null,
      vozila: null,
      pretraziClicked: true,
      sortProperty: "naziv", // Default sorting property
      sortAscending: true,
      sortDirection: "asc",
      filterTransmission: "",
      filterFuelType: "",
      filterOpen: false,
      korisnickoIme: this.$route.params.korisnickoIme,
	    fromDate: null,
	    toDate: null,
	    showDatePicker: false,
	    filteredVozila: [],
	    korpe: [],
	    korpa: null,
	  iznajmljivanjeClicked:false
    };
  },
  computed: {
	  foundKorpa() {
    return this.korpe.find(korpa => korpa.korisnikId === this.korisnikId);
  },
    filteredObjects: function () {
      if (this.objects && this.pretraziClicked) {
        const query = this.searchQuery.toLowerCase();
        let filtered = this.objects.filter((obj) => obj.naziv.toLowerCase().includes(query));

        if (this.searchOcena) {
          const ocenaQuery = parseFloat(this.searchOcena);
          filtered = filtered.filter((obj) => {
            if (obj.ocena) {
              return obj.ocena == ocenaQuery;
            }
            return false;
          });
        }

        if (this.searchTip) {
          const tipQuery = this.searchTip.toUpperCase();
          if (tipQuery === "SVI TIPOVI") {
            filtered = filtered.filter((obj) =>
              ["AUTO", "KOMBI", "MOBILEHOME"].every((tip) =>
                obj.vozilaUPonudi.some((IdVozila) => {
                  const pronadjenoVozilo = this.getVoziloById(IdVozila);
                  return pronadjenoVozilo && pronadjenoVozilo.tip.toUpperCase() === tip;
                })
              )
            );
          } else {
            filtered = filtered.filter((obj) =>
              obj.vozilaUPonudi.some((IdVozila) => {
                const pronadjenoVozilo = this.getVoziloById(IdVozila);
                return pronadjenoVozilo && pronadjenoVozilo.tip.toUpperCase() === tipQuery;
              })
            );
          }
        }

        if (this.searchLokacija && this.searchLokacija.Id) {
          const selectedUlica = this.searchLokacija.ulica.toLowerCase();
          filtered = filtered.filter((obj) => {
            const lokacija = this.getLokacijaById(obj.lokacija);
            const [ulica] = lokacija.split(', ');
            return ulica.toLowerCase().includes(selectedUlica);
          });
        }

        if (this.sortProperty === 'naziv' || this.sortProperty === 'lokacija' || this.sortProperty === 'ocena') {
        filtered.sort((a, b) => {
          const valueA = this.getValueForSortProperty(a);
          const valueB = this.getValueForSortProperty(b);
          if (this.sortProperty === 'ocena') {
            const numValueA = parseFloat(valueA);
            const numValueB = parseFloat(valueB);
            console.log('Comparing ocena:', numValueA, numValueB); // Debug statement
            if (!isNaN(numValueA) && !isNaN(numValueB)) {
              if (this.sortDirection === 'asc') {
                console.log('Ascending comparison result:', numValueA - numValueB); // Debug statement
                return numValueA - numValueB;
              } else {
                console.log('Descending comparison result:', numValueB - numValueA); // Debug statement
                return numValueB - numValueA;
              }
            }
          }
          if (this.sortDirection === 'asc') {
            console.log('String comparison result (asc):', valueA.localeCompare(valueB)); // Debug statement
            return valueA.localeCompare(valueB);
          } else {
            console.log('String comparison result (desc):', valueB.localeCompare(valueA)); // Debug statement
            return valueB.localeCompare(valueA);
          }
        });
      }
		
		if (this.filterTransmission) {
          filtered = filtered.filter((obj) =>
            obj.vozilaUPonudi.some((IdVozila) => {
              const pronadjenoVozilo = this.getVoziloById(IdVozila);
              return (
                pronadjenoVozilo &&
                pronadjenoVozilo.vrstaMenjaca === this.filterTransmission
              );
            })
          );
        }
        if (this.filterFuelType) {
		      filtered = filtered.filter((obj) =>
		        obj.vozilaUPonudi.some((IdVozila) => {
		          const pronadjenoVozilo = this.getVoziloById(IdVozila);
		          return (
		            pronadjenoVozilo &&
		            pronadjenoVozilo.tipGoriva.toUpperCase() === this.filterFuelType
		          );
		        })
		      );
		    }
		 
		 if (this.filterOpen) {
	      filtered = filtered.filter((obj) => obj.status);
	    }

        return filtered;
      }
      return this.objects;
    },
  },
  template: `
  
  <div >
	  <div class="rentHeader">
      <center>      
      	<link rel="stylesheet" href="css/korisnik-pocetna.css">
		<div class="login-bar">
		    <router-link :to="getPocetnaLink()" class="pocetna-button">Pocetna stranica</router-link>
			<router-link :to="getProfileLink()" class="login-button">Moj profil</router-link>
		</div>
        <img src="images/cover.JPG" alt="Image" style="width: 100%;">
        <div class="menu-bar-rent-objects">
          <input class="searchCar" v-model="searchQuery" type="text" placeholder="Pretrazi po nazivu" />
          <input class="searchCar" v-model="searchOcena" type="text" placeholder="Pretrazi po prosecnoj oceni" />
          <select v-model="searchLokacija" id="searchLokacija">
            <option value="">Izaberite lokaciju</option>
            <option v-for="lokacija in lokacije" :value="lokacija" :key="lokacija.Id">
              {{ lokacija.ulica }}, {{ lokacija.grad }}
            </option>
          </select>
          <select v-model="searchTip" id="searchTip">
            <option value="">Izaberite tip vozila</option>
            <option value="SVI TIPOVI">Svi tipovi</option>
            <option value="AUTO">Auto</option>
            <option value="KOMBI">Kombi</option>
            <option value="MOBILEHOME">Mobilehome</option>
          </select>
        </div>
      </center>
      <div class="page">
	    <div class="sort-container">
        <label class="sort-label">Sortiraj</label>
        <div class="sorting-options">
          <select v-model="sortProperty" id="sortProperty">
            <option value="naziv">Naziv</option>
            <option value="lokacija">Lokacija</option>
            <option value="ocena">Prosecna ocena</option>
          </select>
          <select v-model="sortDirection" id="sortDirection">
            <option value="asc">Rastuce</option>
            <option value="desc">Opadajuce</option>
          </select>
        </div>
        <div class="filter-container">
        <label class="filter-label">Filtriraj</label>
        <div class="filter-options">
          <div class="filter-option">
            <input
              type="radio"
              id="filterManuelni"
              value="MANUELNI"
              v-model="filterTransmission"
            />
            <label for="filterManuelni">Manuelni</label>
          </div>
          <div class="filter-option">
            <input
              type="radio"
              id="filterAutomatik"
              value="AUTOMATIK"
              v-model="filterTransmission"
            />
            <label for="filterAutomatik">Automatik</label>
          </div>
          <select v-model="filterFuelType" id="filterFuelType">
		      <option value="">Svi tipovi goriva</option>
		      <option value="DIZEL">Dizel</option>
		      <option value="BENZIN">Benzin</option>
		      <option value="HIBRID">Hibrid</option>
		      <option value="ELEKTRIČNI">Elektricni</option>
		    </select>
        </div>
      </div>
       <div class="filter-option">
		  <input
		    type="radio"
		    id="filterOpen"
		    :checked="filterOpen"
		    @change="filterOpen = !filterOpen"
		  />
		  <label for="filterOpen">Otvoreni objekti</label>
		</div>
		
  <button @click="goToCartPage">Pregled korpe</button>
		<button @click="showDateRangePickerAndToggle">Iznajmi</button>

  
		  <div v-if="showDatePicker" class="date-picker">
		    <label>From Date:</label>
		    <input type="date" v-model="fromDate">
		    <label>To Date:</label>
		    <input type="date" v-model="toDate">
		    <button @click="applyDateRangeFilter">Apply</button>
		  </div>
		  
      </div>
      
      <div class="grid-container">
  <div v-for="p in filteredObjects" :key="p.id" class="object" v-if="!iznajmljivanjeClicked">
			  <router-link :to="{ name: 'rent-a-car-details', params: { id: p.id } }">
			      <!-- Display the object's content here -->
			      <div class="logo-container">
					  <img :src="p.logo" alt="Logo" width="70" height="70">
					</div>
			      <div class="name">{{ p.naziv }}</div>
			      <div class="location">{{ getLokacijaById(p.lokacija) }}</div>
			      <div class="ocena">{{ p.ocena }}</div>
			    </router-link>
			</div>
			<div class="vozila-container" v-if="iznajmljivanjeClicked">
		    <div v-for="vozilo in filteredVozila" :key="vozilo.IdVozila" class="vozilo-container">
			    <div class="vozilo-details">
			    <div class="vozilo-left">
			    <div class="vozilo-leftr">
			          <img :src="'images/' + vozilo.slika" :alt="'slika '" width="70" height="70">
			       </div> </div>
			        <div class="vozilo-right">
			          <p>Marka: {{ vozilo.marka }}</p>
			          <p>Model: {{ vozilo.model }}</p>
			          <p>Tip goriva: {{ vozilo.tipGoriva }}</p>
			          <p>Vrsta menjaca: {{ vozilo.vrstaMenjaca }}</p>
			          <p>Tip Goriva : {{ vozilo.tipGoriva }}</p>
			          <p>Potrosnja : {{ vozilo.potrosnja  }}</p>
			          <p>Broj vrata : {{ vozilo.brojVrata  }}</p>
			          <p>Broj osoba : {{ vozilo.brojOsoba }}</p>
			          <p>Opis : {{ vozilo.opis  }}</p>
			        </div>
			        <button @click="addToCart(vozilo.IdVozila)">Add to Korpa</button>
			       </div>
		</div>
		  </div>
        </div>
		  
        
      </div>
    </div>
   </div>
  </div>

  `,
  mounted(){
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
    axios.get('rent-car.txt')
      .then(response => {
        const data = response.data.split("\n");
        const objects = data.map((line) => {
          const [id, naziv, vozilaUPonudiStr, lokacija, ocena, statusStr, logo] = line.split(";");
          const status = statusStr.trim().toLowerCase() === "true";
          const vozilaUPonudi = vozilaUPonudiStr.trim().split(",");
          return {
            id: id.trim(),
            naziv: naziv.trim(),
            vozilaUPonudi: vozilaUPonudi,
            lokacija: lokacija.trim(),
            ocena: ocena.trim(),
            status: status,
            logo: logo.trim()
          };
        });
        this.objects = objects;
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });

    axios.get('lokacije.txt')
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

    axios.get('vozila.txt')
  .then(response => {
    const data = response.data.split("\n");
    const vozila = data.map((line) => {
      const [IdVozila, marka, model, cena, tip, objekatPripada, vrstaMenjaca, tipGoriva, potrosnja, brojVrata, brojOsoba, opis, slika, status] = line.split(";");
      return {
        IdVozila: IdVozila.trim(),
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
    });
    this.vozila = vozila;
  })
  .catch(error => {
    console.error("Error fetching vozilo data:", error);
  });
  		axios.get('korpe.txt')
  .then(response => {
    const data = response.data.split('\n');
    this.korpe = data.map(line => {
      const [id, vozila, korisnikId, cena] = line.split(';').map(item => item.trim());
      return {
        id: id,
        vozila: vozila.split(',').map(item => item.trim()), // Split and trim the list of vehicles
        korisnikId: korisnikId,
        cena: cena
      };
    });
    this.korpa = this.korpe.find(korpa => korpa.korisnikId.trim() === this.korisnickoIme.trim());
  })
  .catch(error => {
    console.error("Error fetching korpa data:", error);
  });
      
      
      

  },
  methods: {
 	getVoziloById(id) {
      if (this.vozila && this.vozila[id]) {
        const vozilo = this.vozila[id];
        if (vozilo) {
          return vozilo;
        }
      }
      return null;
    },
    loadRentACarObjects() {
	  axios.get('rent-car.txt')
	    .then(response => {
	      const data = response.data.split("\n");
	      data.forEach(line => {
	        const [id, naziv, vozilaUPonudiStr, lokacija, ocena, statusStr, logo] = line.split(";");
	        // Construct the object details
	        const object = {
	          id: id.trim(),
	          naziv: naziv.trim(),
	          vozilaUPonudi: vozilaUPonudiStr.trim().split(","),
	          lokacija: lokacija.trim(),
	          ocena: ocena.trim(),
	          status: statusStr.trim().toLowerCase() === "true",
	          logo: logo.trim()
	        };
	        // Store the object details in rentACarObjects
	        this.$set(this.rentACarObjects, id, object);
	      });
	
	      // Fetch object details for the current route's ID
	      this.fetchObjectDetails();
	    })
	    .catch(error => {
	      console.error("Error fetching rent-a-car object data:", error);
	    });
	},
    getLokacijaById(id) {
      if (this.lokacije && this.lokacije[id]) {
        const { ulica, grad } = this.lokacije[id];
        return `${ulica}, ${grad}`;
      }
      return "";
    },
    getValueForSortProperty(item) {
      if (this.sortProperty === 'naziv') {
        return item[this.sortProperty];
      } else if (this.sortProperty === 'lokacija') {
        return this.getLokacijaById(item.lokacija);
      } else if (this.sortProperty === 'ocena') {
        return item[this.sortProperty] || '0'; // Handle case where ocena is not available
      }
      return '';
    },
    isObjectOpen(item) {
	    if (item.status) {
	      return true;
	    }
	    return false;
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
	  showDateRangePicker() {
	    this.showDatePicker = true;
	  },
		
		 toggleIznajmljivanjeClicked() {
		    this.iznajmljivanjeClicked = !this.iznajmljivanjeClicked;
		  },
		  filterVehiclesByDateRange() {
		    const fromDate = new Date(this.fromDate).getTime();
			  const toDate = new Date(this.toDate).getTime();
			
			  this.filteredVozila = this.vozila.filter(vozilo => {
			    let isAvailable = vozilo.status === "DOSTUPNO"; // Initialize availability status
			
			    for (const porudzbina of this.korisnikPorudzbine) {
			      const voziloIds = porudzbina.iznajmljenaVozila;
			      if (voziloIds.includes(vozilo.IdVozila)) {
					const porudzbinaDates = new Date(porudzbina.datumIznajmljivanja);
					const fromDates = new Date(this.fromDate);
					const toDates = new Date(this.toDate);
			        console.log("Porudzbina Dates:", porudzbinaDates);
			        console.log("From Datse:", fromDates);
			        console.log("To Dates:", toDates);
			        if (porudzbinaDates >= fromDates && porudzbinaDates <= toDates) {
			          console.log(`Filtered out vehicle ${vozilo.IdVozila} due to overlapping order`);
			          isAvailable = false; // Vehicle has overlapping order
			          break; // No need to check other orders
			        }
			      }
			    }
			
			    return isAvailable; // Include/exclude the vehicle based on availability status
			  });
		  },
			applyDateRangeFilter() {
			  console.log("Applying date range filter");
			  this.filterVehiclesByDateRange();
			},
		showDateRangePickerAndToggle() {
		    this.showDateRangePicker();
		    this.toggleIznajmljivanjeClicked();
		  },
		   getKorpaByKorisnikId(korisnikId) {
			    this.korpa = this.korpe.find(korpa => korpa.korisnikId === korisnikId);
			    console.log("KORPA", this.korpa);
			    this.korpa = this.korpa;
			    return this.korpa;
			  },
		    splitVozilaList(vozila) {
				    const vozilaList = vozila.split(',').map(id => id.trim());
				    return vozilaList;
			  },
		  addToCart(voziloId) {
		    const selectedVozilo = this.vozila.find(vozilo => vozilo.IdVozila === voziloId);
			
			  if (selectedVozilo) {
			    
		   		
			    console.log("KORPAAA:", this.korpa);
			    this.korpa.vozila += "," + selectedVozilo.IdVozila;
				
				this.korpa.vozila = this.korpa.vozila;
			    console.log("Added vehicle to cart:", selectedVozilo.IdVozila);
			
			    
			    console.log("Updated korpa:", this.korpa);
			  }		   
			  
				const vozilaList = this.korpa.vozila.split(',').map(id => id.trim());
			  axios.put('rest/korpe/edit/' + this.korisnickoIme ,this.korpa.vozila)
			      .then(response => {
					   const updatedUserData = response.data;
					   this.korpa = updatedUserData;
			    console.log("PROJEKAAAAAAAAT:", updatedUserData);
			      })
			      .catch(error => {
			        console.error("Error fetching new korpa:", error);
			      });
			  return this.korpa;
		  },
		  goToCartPage() {
		    const korisnickoIme = this.$data.korisnickoIme;
		    this.$router.push({ name: 'pregled-korpe', params: { korisnickoIme } });
		  },
  },
});
