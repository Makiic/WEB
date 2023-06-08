Vue.component("rentACar", {
  data: function () {
		    return {
		      objects: null
		    }
  },
  template: 
  `
    <div class="rentHeader">
    <center>
  		<h1>Raspolozivi objekti:</h1>
	</center>
	<table class="styled-table" border="1">
	<tr bgcolor="lightgrey">
		<th>Naziv</th>
		<th>Lokacija</th>
		<th>Prosecna ocena</th>
	</tr>
		
	<tr v-for="p in objects" :key="p.id">
		<td>{{p.naziv }}</td>
		<td>{{p.lokacija }}</td>
		<td>{{p.ocena}}</td>
	</tr>
</table>
</div>
  `,
  mounted() {
    axios
      .get('rent-car.txt')
      .then(response => {
        const data = response.data.split("\n");
        const objects = data.map(line => {
          const [id, naziv, lokacija, ocena] = line.split(";");
          return {
            id: id.trim(),
            naziv: naziv.trim(),
            lokacija: lokacija.trim(),
            ocena: ocena.trim()
          };
        });
        this.objects = objects;
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  },
  
  methods:{
	  
  }
});