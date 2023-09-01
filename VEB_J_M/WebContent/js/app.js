const LogIn = {template: "<login></login>"}
const HomePage = {template: "<homepage></homepage>"}
const Registracija = {template: "<registracija></registracija>"}
const Edit = {template: "<edit></edit>"}
const RentACar = {template: "<rent-a-car></rent-a-car>"}
const Administrator = {template: "<administrator></administrator>"}
const PrikazObjekta = {template: "<prikaz-objekta></prikaz-objekta>"}
const PrikazObjektaM = {template: "<prikaz-objekta-m></prikaz-objekta-m>"}
const KorisnikPocetna = {template: "<korisnik-pocetna></korisnik-pocetna>"}
const ProfilKorisnika = {template: "<profil-korisnika></profil-korisnika>"}
const ProfilAdmina = {template: "<admin-pocetna></admin-pocetna>"}
const PregledKorpe = {template: "<pregled-korpe></pregled-korpe>"}
const Menadzer = {template: "<menadzer-pocetna></menadzer-pocetna>"}
const ProfilMenadzera = {template: "<profil-menadzera></profil-menadzera>"}

const router = new VueRouter({
	mode: 'hash',  
	routes: [
		{path : "/login", component: LogIn},
		{path : "/homepage/:korisnickoIme", component: HomePage},
		{path : "/registracija", component: Registracija},
		{path : "/edit/:korisnickoIme", component: Edit},
		{path : "/rentACar", component: RentACar},
		{path : "/Administrator", component: Administrator},
 		{path : "/korisnikPocetna/:korisnickoIme/profilKorisnika", component: ProfilKorisnika },
		{path : '/login/:korisnickoIme/:id', name: 'rent-a-car-details', component: PrikazObjekta },
		{path : "/korisnikPocetna/:korisnickoIme",name: 'logged-korisnik-pocetna', component: KorisnikPocetna},
  		{path : "/adminPocetna/:korisnickoIme",name: 'logged-admin-pocetna', component: ProfilAdmina},
		{path : "/korisnikPocetna/:korisnickoIme/pregledKorpe",name: 'pregled-korpe', component: PregledKorpe},
		{path : "/menadzerPocetna/:korisnickoIme",name: 'logged-menadzer-pocetna', component: Menadzer},
  		{path : "/menadzerPocetna/:korisnickoIme/profilMenadzera",name: 'profil-menadzera', component: ProfilMenadzera},
		{path : '/menadzerPocetna/:korisnickoIme/:id', name: 'rent-a-car-details-menadzer', component: PrikazObjektaM },

		]
	
});

var app = new Vue({
	router,
	el: "#mainPage"
});