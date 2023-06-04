Vue.component("homepage", {
  data() {
    return {
      korisnickoIme: this.$route.params.korisnickoIme,
      korisnik: {
        korisnickoIme: null,
        lozinka: null,
        ime: null,
        prezime: null,
        pol: null,
        datumRodjenja: null,
        uloga: null,
        tip: null
      }
    };
  },
  template: `
    <div class="page">
      <div class="container">
        <div class="left">
          <div class="korisnik">Welcome, {{ korisnickoIme }}!</div>
        </div>
        <div class="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient
                inkscape:collect="always"
                id="linearGradient"
                x1="13"
                y1="193.49992"
                x2="307"
                y2="193.49992"
                gradientUnits="userSpaceOnUse">
              </linearGradient>
            </defs>
            <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
          </svg>
          <form>
            <p>Pol: {{ korisnik.pol }}</p>
            <p>Datum rodjenja: {{ korisnik.datumRodjenja }}</p>
            <p>Uloga: {{ korisnik.uloga }}</p>
            <p>Korisnicko ime: {{ korisnik.korisnickoIme }}</p>
            <p>Prezime: {{ korisnik.prezime }}</p>
            <p>Tip: {{ korisnik.tip }}</p>
            <router-link class="login-button" :to="'/edit/' + korisnik.korisnickoIme " >
            Edit
             </router-link>
          </form>
        </div>
      </div>
    </div>
  `,
  methods: {
  submitForm(event) {
      event.preventDefault();
    }
  },
  mounted() {
    // Fetching user data from "korisnik.txt"
    axios
      .get('korisnik.txt')
      .then(response => {
        const usersData = response.data.split('\n');
        let userFound = false;

        for (let i = 0; i < usersData.length; i++) {
          const userData = usersData[i];
          const [korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja, uloga] = userData.split(';');

          if (korisnickoIme.trim() === this.korisnickoIme.trim()) {
            this.korisnik.korisnickoIme = korisnickoIme.trim();
            this.korisnik.lozinka = lozinka.trim();
            this.korisnik.ime = ime.trim();
            this.korisnik.prezime = prezime.trim();
            this.korisnik.pol = pol.trim();
            this.korisnik.datumRodjenja = datumRodjenja.trim();
            this.korisnik.uloga = uloga.trim();
            userFound = true;
            break;
          }
        }

        if (!userFound) {
          console.error('User not found');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }
});
