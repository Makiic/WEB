Vue.component("login", {
		data : function()
		{
		return {
		korisnik: {
			korisnickoIme: null,
			lozinka: null,
					},
		errorMessages: {
			korisnickoIme: "",
			lozinka: "",
						},
		registeredUsers: null
			}
			},
template:
`
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
     
       <router-link class="login-button" @click="loginClicked" :to="{ name: 'logged-korisnik-pocetna', params: { korisnickoIme:korisnik.korisnickoIme } }">
            Login
          </router-link>
        <input type="button" class="register-button" value="REgister">
      </form>
    </div>
  </div>
</div>

  `

 
 
, methods: {

  loginClicked() {
    this.$emit('login', this.korisnik.korisnickoIme);
  },

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
        const registeredUsers = lines.map(line => {
          const userFields = line.split(',');
          const korisnik = {};
          userFields.forEach(field => {
            const [key, value] = field.split(':');
            korisnik[key] = value;
          });
          return korisnik;
        });

        const foundUser = registeredUsers.find(
          (korisnik) =>
            korisnik.korisnickoIme === this.korisnik.korisnickoIme &&
            korisnik.lozinka === this.korisnik.lozinka
        );

        if (foundUser) {
          this.$router.push("/homepage/" + foundUser.korisnickoIme);
        } else {
          this.errorMessages.korisnickoIme = "Invalid username or password.";
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

},
mounted() {
	//axios.get("resti").then(response => (this.registeredUsers = response.data));

 }


});
