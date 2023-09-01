  Vue.component('komentari', {
            data() {
                return {
                    komentari: ''
                }
            },
            methods: {
                ucitajKomentare() {
                    axios.get('komentari.txt')  // Zamijenite s pravim putem prema vašem endpointu
                        .then(response => {
                            this.komentari = response.data;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            },
            mounted() {
                this.ucitajKomentare();
            },
            template: `
                <div>
                    <h1>Komentari</h1>
                    <pre>{{ komentari }}</pre>
                </div>
            `
        });