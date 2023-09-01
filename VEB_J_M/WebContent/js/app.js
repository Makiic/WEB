const LogIn = {template: "<login></login>"}
const HomePage = {template: "<homepage></homepage>"}
const Registracija = {template: "<registracija></registracija>"}
const Edit = {template: "<edit></edit>"}
const RentACar = {template: "<rent-a-car></rent-a-car>"}
const Administrator = {template: "<administrator></administrator>"}
const PrikazObjekta = {template: "<prikaz-objekta></prikaz-objekta>"}
const KorisnikPocetna = {template: "<korisnik-pocetna></korisnik-pocetna>"}
const ProfilKorisnika = {template: "<profil-korisnika></profil-korisnika>"}
const ProfilAdmina = {template: "<admin-pocetna></admin-pocetna>"}
const Create = {template: "<createRAC></createRAC>"}
const PregledKorpe = {template: "<pregled-korpe></pregled-korpe>"}
const Menadzer = {template: "<menadzer-pocetna></menadzer-pocetna>"}
const ProfilMenadzera = {template: "<profil-menadzera></profil-menadzera>"}

const PrikazObjektaM = {template: "<prikaz-objekta-m></prikaz-objekta-m>"}
const Komentari = {template: "<komentari></komentari>"}


const router = new VueRouter({
	mode: 'hash',  
	routes: [
		{path : "/login", component: LogIn},
		{path : "/homepage/:korisnickoIme", component: HomePage},
		{path : "/registracija", component: Registracija},
		{path : "/edit/:korisnickoIme", component: Edit},
		{path : "/", component: RentACar},
		{path : "/Administrator", component: Administrator},
 		{path : "/korisnikPocetna/:korisnickoIme/profilKorisnika", component: ProfilKorisnika },
		{path : "/korisnikPocetna/:korisnickoIme",name: 'logged-korisnik-pocetna', component: KorisnikPocetna},
		{path : "/adminPocetna/:korisnickoIme",name: 'logged-admin-pocetna', component: ProfilAdmina},
		{path : "/menadzerPocetna/:korisnickoIme",name: 'menadzer', component: Menadzer},
		{path : "/menadzerPocetna/:korisnickoIme/profilMenadzera",name: 'profil-menadzera', component: ProfilMenadzera},
		{path : "/createRAC", component: Create},
		{path : '/login/:korisnickoIme/:id', name: 'rent-a-car-details', component: PrikazObjekta },
		{path : "/korisnikPocetna/:korisnickoIme/pregledKorpe",name: 'pregled-korpe', component: PregledKorpe},
  
  		
		{path : '/menadzerPocetna/:korisnickoIme/:id', name: 'rent-a-car-details-menadzer', component: PrikazObjektaM },
       
        {path : "/komentari",  component: Komentari },
		]
	
});

var app = new Vue({
	router,
	el: "#mainPage"
});