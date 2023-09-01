Vue.component("create-rac",{
	
	data:function(){
		 return {
      name: "",
      location: "",
      startTime: "",
      endTime: "",
      logoFile: null,
      selectedManager: null,
      availableManagers: [], 
        showConfirmation: false, // Add this property// List of managers not assigned to any object
    };
	},
	
	
	template: 
	`
<div class="reg-container">
    <form class="reg-form" @submit.prevent="createRentACar">
      <div class="wrapper">
        <div class="form_container">
          <div class="title_container">
            <h2>Create New Rent-A-Car</h2>
          </div>
          <div class="row clearfix">
            <div class="">
              <form>
                <div class="input-box">
                  <span><i aria-hidden="true" class="fa fa-building"></i></span>
                  <input type="text" name="name" placeholder="Name" required v-model="name" />
                </div>
                <div class="input-box">
                  <span><i aria-hidden="true" class="fa fa-map-marker"></i></span>
                  <input type="text" name="location" placeholder="Location" required v-model="location" />
                </div>
                <div class="row clearfix">
                  <div class="col_half">
                    <div class="input-box">
                      <span><i aria-hidden="true" class="fa fa-clock"></i></span>
                      <input type="time" name="startTime" placeholder="Start Time" required v-model="startTime" />
                    </div>
                  </div>
                  <div class="col_half">
                    <div class="input-box">
                      <span><i aria-hidden="true" class="fa fa-clock"></i></span>
                      <input type="time" name="endTime" placeholder="End Time" required v-model="endTime" />
                    </div>
                  </div>
                </div>
                <div class="input-box">
                  <span><i aria-hidden="true" class="fa fa-image"></i></span>
                  <input type="file" accept="image/*" @change="uploadLogo" required />
                </div>
              
                 <button class="reg_button" type="submit">Create</button>
      <p v-if="showConfirmation" class="confirmation-message">Rent-A-Car created successfully!</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>`,
	methods:
	{
		TryCreate: function () {
      console.log('TryRegister method called.');
      let valid = true;
      this.errorMessages = {};

        axios
        .post('rest/rentACar/createRAC', this.rentACar)
        .then(response => {
          // Handle the response from the server
          this.showConfirmation = true; // Show the confirmation message
        })
        .catch(error => {
          console.error(error);
          // Handle any errors that occur during the request
        });
    },
	uploadLogo(event) {
      // Handle the file upload here
      const file = event.target.files[0];
      // Do something with the uploaded file
    },
	}
	,
	
})