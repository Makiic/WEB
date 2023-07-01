Vue.component("rentACar", {
  data: function () {
    return {
      objects: null,
      searchQuery: '',
      searchOcena: '',
      searchLokacija: '',
      isPretraziExpanded: false
    };
  },
  computed: {
    filteredObjects: function () {
      if (this.objects) {
        const query = this.searchQuery.toLowerCase();
        let filtered = this.objects.filter(obj => obj.naziv.toLowerCase().includes(query) && obj.lokacija.toLowerCase().includes(this.searchLokacija.toLowerCase()));

        if (this.searchOcena) {
          const ocenaQuery = parseFloat(this.searchOcena);
          filtered = filtered.filter(obj => obj.ocena >= ocenaQuery);
        }

        return filtered;
      }
      return [];
    }
  },
  methods: {
    togglePretrazi: function () {
      this.isPretraziExpanded = !this.isPretraziExpanded;
    }
  },
  template: `
    <div class="rentHeader">
      <center>
        <h1>Raspolozivi objekti:</h1>
        <input class="searchCar" v-model="searchQuery" type="text" placeholder="Pretrazi po nazivu">
      </center>
      
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
          <td class="centered-text">{{ p.lokacija }}</td>
          <td class="centered-text">{{ p.ocena }}</td>
        </tr>
      </table>

      <div>
        <h2 @click="togglePretrazi" style="cursor: pointer;">Pretrazi</h2>
        <transition name="fade">
          <div v-if="isPretraziExpanded">
            <input class="searchCar" v-model="searchOcena" type="text" placeholder="Pretrazi po prosecnoj oceni">
            <br>
            <input class="searchCar" v-model="searchLokacija" type="text" placeholder="Pretrazi po lokaciji">
          </div>
        </transition>
      </div>
    </div>
  `,
  mounted() {
    axios
      .get('rent-car.txt')
      .then(response => {
        const data = response.data.split("\n");
        const objects = data.map(line => {
          const [id, naziv, lokacija, ocena, statusStr, logo] = line.split(";");
          const status = statusStr.trim().toLowerCase() === "true" ? true : false;
          return {
            id: id.trim(),
            naziv: naziv.trim(),
            lokacija: lokacija.trim(),
            ocena: ocena.trim(),
            status: status,
            logo: logo.trim(),
          };
        });
        this.objects = objects;
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
});
