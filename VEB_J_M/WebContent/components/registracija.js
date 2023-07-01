Vue.component("registracija", {
  data: function () {
    return {
      korisnik: {
        korisnickoIme: null,
        lozinka: null,
        ime: null,
        prezime: null,
        pol: null,
        datumRodjenja: null,
        uloga: null,
      },

      confirmationPassword: null,

      errorMessages: {
        korisnickoIme: " ",
        lozinka: " ",
        ime: " ",
        prezime: " ",
        pol: " ",
        datumRodjenja: " ",
        uloga: " ",
      },
    };
  },
  template: `
    <div class="reg-container">
      <form class="reg-form" >
        <div class="wrapper">
          <div class="form_container">
            <div class="title_container">
              <h2>Register</h2>
            </div>
            <div class="row clearfix">
              <div class="">
                <form>
                  <div class="input-box">
                    <span><i aria-hidden="true" class="fa fa-envelope"></i></span>
                    <input type="text" name="email" placeholder="KorisnickoIme" required v-model="korisnik.korisnickoIme" />
                  </div>
                  <div class="input-box">
                    <span><i aria-hidden="true" class="fa fa-lock"></i></span>
                    <input type="password" name="password" placeholder="Lozinka" required v-model="korisnik.lozinka" />
                  </div>
                  <div class="input-box">
                    <span><i aria-hidden="true" class="fa fa-lock"></i></span>
                    <input type="password" name="password" placeholder="Ponovi lozinku" required v-model="confirmationPassword" />
                  </div>
                  <div class="row clearfix">
                    <div class="col_half">
                      <div class="input-box">
                        <span><i aria-hidden="true" class="fa fa-user"></i></span>
                        <input type="text" name="name" placeholder="Ime" v-model="korisnik.ime" />
                      </div>
                    </div>
                    <div class="col_half">
                      <div class="input-box">
                        <span><i aria-hidden="true" class="fa fa-user"></i></span>
                        <input type="text" name="surname" placeholder="Prezime" required v-model="korisnik.prezime" />
                      </div>
                    </div>
                  </div>
                  <select v-model="korisnik.pol">
		          <option value="" disabled selected>Izaberi pol</option>
		          <option value="muski">Muski</option>
		          <option value="zenski">Zenski</option>
		        </select>	
		        <input type="date" class="reg_input_field" placeholder="Datum Rodjenja" v-model="korisnik.datumRodjenja"/>

                  <input class="reg_button" type="button" value="Register"  v-on:click="TryRegister()">
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="form-footer">
        <a href="#">Forgot Password?</a>
        <a href="#/login">Login</a>
      </div>
    </div>
  `,
  methods: {
    TryRegister: function () {
      console.log('TryRegister method called.');
      let valid = true;
      this.errorMessages = {};

        axios.post('rest/korisnici/registracija', this.korisnik)
		  .then(response => {
		    // Handle the response from the server
		  })
		  .catch(error => {
		    console.error(error);
		    // Handle any errors that occur during the request
		  });
    			
	}
}
});