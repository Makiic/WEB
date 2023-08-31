Vue.component("pregled-korpe", {
  data() {
    return {
      
      korisnickoIme: this.$route.params.korisnickoIme,
	  korpe: [],
	  korpa: {
	      id: null,
	      vozila: [], // Initialize as an empty array
	      korisnikId: this.korisnickoIme,
	      cena: null,
	    },
	  vozila: []
    };
  },
  template: `

  <div>
    <link rel="stylesheet" href="css/korisnik-pocetna.css">
		<div class="login-bar">
		    <router-link :to="getPocetnaLink()" class="pocetna-button">Pocetna stranica</router-link>
			<router-link :to="getProfileLink()" class="login-button">Moj profil</router-link>
		</div>
        <img src="images/cover.JPG" alt="Image" style="width: 100%;">
      <div class="page">
	    <div class="sort-container">
       </div>
       	<div class="vozila-list">
                  <div
                    v-for="vozilo in getVozilaInKorpa()"
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
                        
                        <p>Vrsta menjaca: {{ vozilo.cena }}</p>
                      </div>
  <button @click="removeFromKorpa(vozilo.IdVozila)">Ukloni</button>
                    </div>
                  </div>
        </div>
      <div class="grid-container">
	    <div class="ukupna-cena">
		    <p>Ukupna cena: {{ ukupnaCena.toFixed(2) }} EUR</p>
		    <button @click="createPorudzbina" class="najmi-button">Najmi</button>
      
		  </div>
      </div>
      </div>
  </div>


  `,
  computed: {
  ukupnaCena() {
    return this.getVozilaInKorpa().reduce((total, vozilo) => total + parseFloat(vozilo.cena), 0);
  }
},
  methods: {
   	getProfileLink() {
      const korisnickoIme = this.$route.params.korisnickoIme;
      return `/korisnikPocetna/${korisnickoIme}/profilKorisnika`;
    },
    getPocetnaLink() {
      const korisnickoIme = this.$route.params.korisnickoIme;
      return `/korisnikPocetna/${korisnickoIme}`;
    },
	splitVozilaList(vozila) {
      const vozilaList = vozila.split(',').map(id => id.trim());
      return vozilaList;
    },
   getVozilaInKorpa() {
  const vozilaInKorpa = this.korpa.vozila; // No need to split, it's already an array
  return this.vozila.filter(vozilo => vozilaInKorpa.includes(vozilo.IdVozila));
},
removeFromKorpa(voziloId) {
    const vozilaIndex = this.korpa.vozila.indexOf(voziloId);
    if (vozilaIndex !== -1 && this.korpa.vozila.length > 1) {
      this.korpa.vozila.splice(vozilaIndex, 1); // Remove the vehicle from korpa.vozila
    }
  },
  createPorudzbina() {
      // For example, you can clear the korpa and show a success message:
      this.korpa.vozila = []; // Clear the selected vehicles in korpa
      axios.post('rest/porudzbine/add', this.porudzbina)
		  .then(response => {
		    // Handle the response from the server
		  })
		  .catch(error => {
		    console.error(error);
		    // Handle any errors that occur during the request
		  });

      // You can also make an API request to create the porudzbina on the server if needed
    },
  },
  mounted()
  {
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
    console.log("KORPe", this.korpe);
    console.log("KORPA", this.korpa);
  })
  .catch(error => {
    console.error("Error fetching korpa data:", error);
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
  }
});