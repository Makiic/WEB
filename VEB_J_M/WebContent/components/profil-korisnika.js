Vue.component("profil-korisnika", {
		data : function()
		{
		return {
			korisnickoIme: this.$route.params.korisnickoIme,
 		     korisnik: {},
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
	      <!-- Display more user data properties as needed -->
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
  	fetchUserData() {
      const korisnickoIme = this.$route.params.korisnickoIme;
      console.log('Fetching user data for:', korisnickoIme);
      axios.get(`rest/korisnici/getUser/`+ this.$route.params.korisnickoIme)
        .then(response => {
          this.korisnik = response.data;
          console.log('User data fetched successfully:',response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    },
},
mounted() {
	this.fetchUserData();
 }


});
