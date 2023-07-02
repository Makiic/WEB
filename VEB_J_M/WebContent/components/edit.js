Vue.component("edit", {
  data() {
    return {
      korisnickoIme: this.$route.params.korisnickoIme,
      korisnik: null
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      axios
        .get('rest/korisnici/getUser/' + this.korisnickoIme)
        .then(response => {
          this.korisnik = response.data;
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    },
    tryEdit() {
      this.saveUser();
    },
    saveUser() {
		console.log(this.korisnik)
      axios
        .put('rest/korisnici/edit/' + this.korisnickoIme, this.korisnik)
        .then(response => {
          console.log('User updated successfully:', response.data);
          // Add code to display a success message for user update
        })
        .catch(error => {
          console.error('Error updating user:', error);
          // Display error details
          if (error.response) {
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
          } else if (error.request) {
            console.log('Request:', error.request);
          } else {
            console.log('Error:', error.message);
          }
          // Add code to display an error message for user update failure
        });
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
