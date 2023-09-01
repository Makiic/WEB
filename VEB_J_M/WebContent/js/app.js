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
const Create = {template: "<create-rac></create-rac>"}

const router = new VueRouter({
	mode: 'hash',  
	routes: [
		{path : "/login", component: LogIn},
		{path : "/homepage/:korisnickoIme", component: HomePage},
		{path : "/registracija", component: Registracija},
		{path : "/edit/:korisnickoIme", component: Edit},
		{path : "/rentACar", component: RentACar},
		{path : "/Administrator", component: Administrator},
		{path : '/rentACar/:id', name: 'rent-a-car-details', component: PrikazObjekta },
 		{path : "/korisnikPocetna/:korisnickoIme/profilKorisnika", component: ProfilKorisnika },
		{path : "/korisnikPocetna/:korisnickoIme",name: 'logged-korisnik-pocetna', component: KorisnikPocetna},
		{path : "/adminPocetna/:korisnickoIme",name: 'logged-admin-pocetna', component: ProfilAdmina},
		{path : "/create-rac",name: 'logged-admin-pocetna', component: Create},
  
		]
	
});

var app = new Vue({
	router,
	el: "#mainPage"
});