Vue.component("login", {
  data() {
    return {
      korisnik: {
        korisnickoIme: null,
        lozinka: null,
      },
      errorMessages: {
        korisnickoIme: "",
        lozinka: "",
      },
    };
  },
  template: `
 <body>
  <div class="page">
    <div class="container">
      <div class="left">
        <div class="login">Login</div>
      </div>
      <div class="right">
        <form class="login-form" @submit="TryLogin">
          <small>{{ errorMessages.korisnickoIme }}</small>
          <input type="text" placeholder="Korisnicko Ime" v-model="korisnik.korisnickoIme">
          <small>{{ errorMessages.lozinka }}</small>
          <input type="password" placeholder="Lozinka" v-model="korisnik.lozinka">
          <button class="login-button"  type="submit">Login</button>
          <router-link to="/registracija"  class="register-button-link">
            <button class="login-button">Registracija</button>
          </router-link>
        </form>
      </div>
    </div>
  </div>
</body>

  `,
  methods: {
    TryLogin() {
      let valid = true;
      this.errorMessages = {};

      if (!this.korisnik.korisnickoIme) {
        valid = false;
        this.errorMessages.korisnickoIme = "Please enter a username.";
      }

      if (!this.korisnik.lozinka) {
        valid = false;
        this.errorMessages.lozinka = "Please enter a password.";
      }

     if (valid) {
  // Read the registered users' data from the file
  fetch('korisnik.txt')
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\n');
      const registeredUsernames = [];
      const registeredUloga = [];

      lines.forEach(line => {
        const parts = line.split(';');
        if (parts.length >= 8) {
          registeredUsernames.push(parts[0].trim());
          registeredUloga.push(parts[6].trim());
        }
      });

      if (registeredUsernames.includes(this.korisnik.korisnickoIme)) {
        const userIndex = registeredUsernames.indexOf(this.korisnik.korisnickoIme);
        const userRole = registeredUloga[userIndex];
        
        if (userRole === 'Administrator') {
          this.$router.push({ name: 'logged-admin-pocetna', params: { korisnickoIme: this.korisnik.korisnickoIme } });
        } else if (userRole === 'Kupac') {
          this.$router.push({ name: 'logged-korisnik-pocetna', params: { korisnickoIme: this.korisnik.korisnickoIme } });
        }
      } else {
        this.errorMessages.korisnickoIme = "Invalid username.";
      }
    })
    .catch(error => {
      console.error(error);
    });
}


    }
  },
});
