Vue.component("profil-korisnika", {
		data : function()
		{
		return {
			korisnickoIme: this.$route.params.korisnickoIme,
 		    korisnik: {},
 		     
      		porudzbine: [],
			}
},
template:
`
<div class="page">
		<div class="login-bar">
		    <router-link :to="getPocetnaLink()" class="pocetna-button">Pocetna stranica</router-link>
			<router-link :to="getProfileLink()" class="login-button">Moj profil</router-link>
		</div>
		<div class="korisnik-info">
      <p>Korisnik: {{ korisnickoIme }}</p>
      <p>Ime: {{ korisnik.ime }}</p>
      <p>Prezime: {{ korisnik.prezime }}</p>
      <p>Lozinka: {{ korisnik.lozinka }}</p>
      <p>Pol: {{ korisnik.pol }}</p>
      <p>Datum Rodjenja: {{ korisnik.datumRodjenja }}</p>
      <p>Uloga: {{ korisnik.uloga }}</p>
      <p>Broj Bodova: {{ korisnik.brojBodova }}</p>
      <p>Tip: {{ korisnik.tip }}</p>
    </div>
    <div >
      <h2>Porudzbine:</h2>
      <ul>
        <li v-for="porudzbina in korisnikPorudzbine">
        {{ porudzbina.id }} - {{ porudzbina.cena }}
        
      	<p>Trajanje Najma: {{ porudzbina.trajanjeNajma }}</p>
        </li>
      </ul>
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
              tipStr,
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
          console.log("Loaded korisnici:", this.korisnici);
          this.korisnik = this.korisnici.find(
            (user) => user.korisnickoIme === this.$route.params.korisnickoIme
          );
          console.log("Loaded korisnik:", this.korisnik);
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

      this.porudzbine = porudzbine.filter((porudzbina) => porudzbina !== null); // Remove null values
      console.log("Loaded porudzbine:", this.porudzbine);
    })
    .catch((error) => {
      console.error("Error fetching porudzbine data:", error);
    });
},

  },
computed: {
    korisnikPorudzbine() {
    return this.porudzbine.filter((porudzbina) => {
      return this.korisnik.svaIznajmljivanja.some((id) => id === porudzbina.id);
    });
  },
  },
  mounted() {
    this.loadKorisnici();
    this.loadPorudzbine();
  },
});
