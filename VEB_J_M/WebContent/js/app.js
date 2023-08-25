const LogIn = {template: "<login></login>"}
const HomePage = {template: "<homepage></homepage>"}
const Registracija = {template: "<registracija></registracija>"}
const Edit = {template: "<edit></edit>"}
const RentACar = {template: "<rent-a-car></rent-a-car>"}
const Administrator = {template: "<administrator></administrator>"}
const PrikazObjekta = {template: "<prikaz-objekta></prikaz-objekta>"}

const router = new VueRouter({
	mode: 'hash',  
	routes: [
		{path : "/login", component: LogIn},
		{path : "/homepage/:korisnickoIme", component: HomePage},
		{path : "/registracija", component: Registracija},
		{path : "/edit/:korisnickoIme", component: Edit},
		{path : "/rentACar", component: RentACar},
		{path : "/Administrator", component: Administrator},
		{ path: '/rentACar/:id', name: 'rent-a-car-details', component: PrikazObjekta },
		]
	
});

var app = new Vue({
	router,
	el: "#mainPage"
});