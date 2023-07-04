const VoziloDAO = {
  getVoziloById(id) {
    // Make an Axios GET request to fetch car details by ID
    return axios.get(`/vozila/getVozilo/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching car with ID ${id}:`, error);
        throw error;
      });
  }
};

Vue.component("rentACar", {
  data: function () {
    return {
      objects: null,
      searchQuery: '',
      searchOcena: '',
      searchLokacija: '',
      searchTip: '',
      isPretraziExpanded: false,
      lokacije: null,
      vozila: null
    };
  },
  computed: {
    filteredObjects: function() {
  if (this.objects) {
    const query = this.searchQuery.toLowerCase();
    const lokacijaQuery = this.searchLokacija.toLowerCase();

    let filtered = this.objects.filter(obj =>
      obj.naziv.toLowerCase().includes(query) &&
      (obj.lokacija.toLowerCase().includes(lokacijaQuery) ||
        this.getLokacijaById(obj.lokacija).toLowerCase().includes(lokacijaQuery))
    );

    if (this.searchOcena) {
      const ocenaQuery = parseFloat(this.searchOcena);
      filtered = filtered.filter(obj => {
        if (obj.ocena) {
          return obj.ocena == ocenaQuery;
        }
        return false;
      });
    }

    if (this.searchTip) {
      const tipQuery = this.searchTip.toUpperCase();
      if (tipQuery === "SVI TIPOVI") {
        filtered = filtered.filter(obj =>
          ["AUTO", "KOMBI", "MOBILEHOME"].every(tip =>
            obj.vozilaUPonudi.some(IdVozila => {
              const pronadjenoVozilo = this.getVoziloById(IdVozila);
              return pronadjenoVozilo && pronadjenoVozilo.tip.toUpperCase() === tip;
            })
          )
        );
      } else {
        filtered = filtered.filter(obj =>
          obj.vozilaUPonudi.some(IdVozila => {
            const pronadjenoVozilo = this.getVoziloById(IdVozila);
            return pronadjenoVozilo && pronadjenoVozilo.tip.toUpperCase() === tipQuery;
          })
        );
      }
    }

    return filtered;
  }
  return [];
},
  },
  template: `
    <div class="rentHeader">
      <center>
        <h1>Raspolozivi objekti:</h1>
        <input class="searchCar" v-model="searchQuery" type="text" placeholder="Pretrazi po nazivu">
      </center>
		<button @click="sortTable('asc')" style="cursor: pointer;">Sort Ascending</button>
        <button @click="sortTable('desc')" style="cursor: pointer;">Sort Descending</button>
     
      <table class="styled-table" border="1">
        <tr bgcolor="lightgrey">
          <th>Logo</th>
          <th>Naziv</th>
          <th>Lokacija</th>
          <th>Prosecna ocena</th>
        </tr>

        <tr v-for="p in filteredObjects" :key="p.id">
          <td class="centered-text"><img :src="p.logo" alt="Logo" width="50" height="50"></td>
          <td class="centered-text">{{ p.naziv }}</td>
          <td class="centered-text">{{ getLokacijaById(p.lokacija) }}</td>
          <td class="centered-text">{{ p.ocena }}</td>
        </tr>
      </table>

      <div>
        <h2 >Pretrazi</h2>
        <div >
          <input class="searchCar" v-model="searchOcena" type="text" placeholder="Pretrazi po prosecnoj oceni">
          <br>
          <input class="searchCar" v-model="searchLokacija" type="text" placeholder="Pretrazi po lokaciji">
          <br>
          <label for="searchTip">Pretrazi po tipu vozila:</label>
          <select v-model="searchTip" id="searchTip">
            <option value="SVI TIPOVI">Svi tipovi</option>
            <option value="AUTO">Auto</option>
            <option value="KOMBI">Kombi</option>
            <option value="MOBILEHOME">Mobilehome</option>
          </select>
          <button @click="filteredObjects" style="cursor: pointer;">Pretrazi</button>
        </div>
      </div>
    </div>
  `,
  mounted() {
    axios
      .get('rent-car.txt')
      .then(response => {
        const data = response.data.split("\n");
        const objects = data.map((line, index) => {
          console.log("Line:", line);
          const [id, naziv, vozilaUPonudiStr, lokacija, ocena, statusStr, logo] = line.split(";");
          console.log("Vozila u ponudi string:", vozilaUPonudiStr);
          console.log("Split values:", id, naziv, vozilaUPonudiStr, lokacija, ocena, statusStr, logo);
          const status = statusStr.trim().toLowerCase() === "true" ? true : false;
          const vozilaUPonudi = vozilaUPonudiStr.trim().split(",");
          console.log("Vozila u ponudi array:", vozilaUPonudi);
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

    axios
      .get('lokacije.txt')
      .then(response => {
        const data = response.data.split("\n");
        const lokacije = data.reduce((acc, line) => {
          const [id, city, country] = line.split(";");
          acc[id.trim()] = { city: city.trim(), country: country.trim() };
          return acc;
        }, {});
        this.lokacije = lokacije;
      })
      .catch(error => {
        console.error("Error fetching location data:", error);
      });
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
      })
      .catch(error => {
        console.error("Error fetching vozilo data:", error);
      });
  },
  methods: {
    getVoziloById(id) {
      if (this.vozila && this.vozila[id]) {
        const vozilo = this.vozila[id];
	    if (vozilo) {
	      return vozilo;}
      }
      return null;
    },
    getLokacijaById(id) {
      if (this.lokacije && this.lokacije[id]) {
        const { city, country } = this.lokacije[id];
        return `${city}, ${country}`;
      }
      return '';
    },
    togglePretrazi() {
      this.isPretraziExpanded = !this.isPretraziExpanded;
    },
    sortTable(order) {
	    this.filteredObjects.sort((a, b) => {
	      const valueA = a.naziv.toLowerCase();
	      const valueB = b.naziv.toLowerCase();
	
	      if (valueA < valueB) {
	        return order === 'asc' ? -1 : 1;
	      }
	      if (valueA > valueB) {
	        return order === 'asc' ? 1 : -1;
	      }
	      return 0;
	    });
  }
  },
});
