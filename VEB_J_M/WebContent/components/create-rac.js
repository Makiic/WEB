Vue.component("createRAC", {
  data: function () {
    return {
      rentACar: {
        naziv: "",
        startVreme: "",
        endVreme: "",
        status: false,
        lokacija: "",
        logo: null,
      },
      showConfirmation: false,
    };
  },
  methods: {
    kreirajRentACar: function () {
      console.log("kreirajRentACar method called.");

      const formData = new FormData();
      for (const key in this.rentACar) {
        formData.append(key, this.rentACar[key]);
      }

      if (this.rentACar.logo) {
        formData.append("logo", this.rentACar.logo);
      }

      axios
        .post("rest/rentACar/createRAC", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.showConfirmation = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    uploadLogo(event) {
      const file = event.target.files[0];
      this.rentACar.logo = file;
    },
  },
  template: `
    <div>
      <form @submit.prevent="kreirajRentACar" class="rac-form">
        <div class="form-group">
          <label for="naziv">Naziv:</label>
          <input type="text" id="naziv" v-model="rentACar.naziv" required>
        </div>

        <div class="form-group">
          <label for="startVreme">Radno vreme od:</label>
          <input type="time" id="startVreme" v-model="rentACar.startVreme" required>
        </div>

        <div class="form-group">
          <label for="endVreme">Radno vreme do:</label>
          <input type="time" id="endVreme" v-model="rentACar.endVreme" required>
        </div>

        <div class="form-group">
          <label for="status">Status:</label>
          <input type="checkbox" id="status" v-model="rentACar.status">
        </div>

        <div class="form-group">
          <label for="lokacija">Lokacija:</label>
          <input type="text" id="lokacija" v-model="rentACar.lokacija" required>
        </div>

        <div class="form-group">
          <label for="logo">Logo:</label>
          <input type="file" id="logo" @change="uploadLogo" accept="image/*">
        </div>

        <button type="submit">Kreiraj Rent-a-Car</button>
      </form>

      <div v-if="showConfirmation" class="confirmation-message">
        Rent-a-Car je uspešno kreiran!
      </div>
    </div>
  `,
});
