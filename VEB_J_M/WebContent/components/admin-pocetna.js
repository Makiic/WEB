
Vue.component("admin-pocetna",{
	data: function() {
		return {
			isImageBlurred: false,

			showAdministrator: false, // Add this flag
			showCreate: false,

			
		};
		
		
		
		
	},
	computed: {
		
	},
	
	 template: ` 
<div>
   <div class="rentHeader">
      <center>      
      	<link rel="stylesheet" href="css/pocetna.css">
		<div class="login-bar">
		    <router-link :to="getPocetnaLink()" class="pocetna-button">Pocetna stranica</router-link>
			<router-link :to="getProfileLink()" class="login-button">Moj profil</router-link>
		</div>
       <img id="headerImage" src="images/cover.JPG" alt="Image" style="width: 100%;">
   </center>
  </div>
<<<<<<< HEAD
  <div class="page">
        <div class="sort-container " >		
   		    <button class="login-button" style="margin-top: 60px; padding: 10px 20px;" @click="kreirajobjekat">Kreiraj novi objekat</button>
   		      <button class="login-button"style="margin-top: 60px; padding: 10px 20px;"  @click="toggleAdministrator">Pregled korisnika</button>
    		<button class="login-button" style="margin-top: 60px; padding: 10px 30px;" @click="navigateTo('sumnjivi-korisnici')">Sumnjivi korisnici</button>
   			<button class="login-button" style="margin-top: 60px; padding: 10px 60px;" @click="navigateTo('komentari')">Komentari</button>
        </div>
        <div class="grid-container"> 
        <Administrator v-if="showAdministrator" /> 
        <create-rac v-if="showCreate" />  </div>
        </div>
        

      



  </div>
  `,
  methods: {
   getPocetnaLink() {
	    const korisnickoIme = this.$data.korisnickoIme;
	    return `/adminPocetna/${korisnickoIme}`;
	  },
   getProfileLink() {
	    const korisnickoIme = this.$data.korisnickoIme;
		  console.log('korisnickoIme:', korisnickoIme); // Log the value to the console
		  return `/korisnikPocetna/${korisnickoIme}/profilKorisnika`;
			  },

    toggleAdministrator() {
      this.showAdministrator = !this.showAdministrator;
    },
     kreirajobjekat() {
      this.showCreate = !this.showCreate;
      },

    navigateTo(routeName) {
      // Implement this method to navigate to the specified route

    },
      handleScroll() {
      const headerImage = document.getElementById('headerImage');
      const scrollTop = window.scrollY;

      if (scrollTop > 100) {
        this.isImageBlurred = true;
        headerImage.classList.add('blurred');
      } else {
        this.isImageBlurred = false;
        headerImage.classList.remove('blurred');
      }
    },
  },
   mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
 beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
})