Vue.component("edit", {
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
      },
      originalKorisnikData: {}
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      axios.get('korisnik.txt')
        .then(response => {
          const usersData = response.data.split('\n');
          let userFound = false;

          for (let i = 0; i < usersData.length; i++) {
            const userData = usersData[i];
            const [korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja, uloga, brojBodova] = userData.split(';');

            if (korisnickoIme.trim() === this.korisnickoIme.trim()) {
				
              this.korisnik.korisnickoIme = korisnickoIme.trim();
              this.korisnik.lozinka = lozinka.trim();
              this.korisnik.ime = ime.trim();
              this.korisnik.prezime = prezime.trim();
              this.korisnik.pol = pol.trim();
              this.korisnik.datumRodjenja = datumRodjenja.trim();
              this.korisnik.uloga = uloga.trim();
              this.korisnik.brojBodova = brojBodova.trim();
            

              userFound = true;
               this.originalKorisnikData = { ...this.korisnik };
              break;
            }
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    },
    tryEdit() {
      this.saveUser();
    },
   saveUser() {
  axios.put('rest/korisnici/edit/' + this.korisnickoIme, this.korisnik)
    .then(response => {
      console.log('User updated successfully:', response.data);

      console.log('Changed properties:', this.calculateChanges());

      const updatedUserData = response.data;

      // Store the original dauser data
      this.originalKorisnikData = { ...this.korisnik };

      // Update the local component state to reflect the changes
      this.korisnik = updatedUserData;

      // Calculate and store the changes (not necessary here, as you've already logged them)
      // this.calculateChanges();

      // Add code to display a success message for user update
    })
    .catch(error => {
      console.error('Error updating user:', error);
      // Display error details...
    });
},

   calculateChanges() {
  const changes = {};
  for (const key in this.originalKorisnikData) {
    if (this.korisnik[key] !== this.originalKorisnikData[key]) {
      changes[key] = {
        from: this.originalKorisnikData[key],
        to: this.korisnik[key]
      };
    }
  }
  return changes;
},

    writeFile(filename, data) {
      // Simulated file write function, you should replace this with the appropriate code
      console.log(`Writing data to ${filename}:`, data);
    }
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
          <form class="login-form" v-if="korisnik" @submit="tryEdit">
            <input type="text" v-model="korisnik.lozinka" placeholder="Password">
            <input type="text" v-model="korisnik.ime" placeholder="First Name">
            <input type="text" v-model="korisnik.prezime" placeholder="Last Name">
            <select v-model="korisnik.pol">
              <option value="" disabled selected>Select Gender</option>
              <option value="muski">Muski</option>
              <option value="zenski">Zenski</option>
            </select>
            <input type="date" v-model="korisnik.datumRodjenja" placeholder="Date of Birth">
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  `
});

