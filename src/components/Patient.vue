<template>
  <div v-if="currentPatient" class="edit-form">
    <h4>Patient</h4>
    <p v-if="message" class="alert alert-success mt-2">{{ message }}</p>
    <div v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul class="alert alert-danger">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>

    </div>
    <form>
      <div class="form-group">
        <label for="firstName">First name</label>
        <input type="text" class="form-control" id="firstName" v-model="currentPatient.firstName">
      </div>

      <div class="form-group">
        <label for="lastName">Last name</label>
        <input type="text" class="form-control" id="lastName" v-model="currentPatient.lastName">
      </div>

      <div class="form-group">
        <label for="birthDate">Birth Date: &nbsp;&nbsp;</label>
        <date-pick
        v-model="currentPatient.birthDate"
        name="birthDate"
        >
        </date-pick>
      </div>

      <div class="form-group">
        <label for="gender">Gender: &nbsp;&nbsp;</label>
        <label for="sex">Man &nbsp;</label>
        <input
          type="radio"
          id="sex"
          v-model="currentPatient.sex"
          value="M"
        />
        <label for="sex">&nbsp;&nbsp;&nbsp;Female &nbsp;</label>
        <input
          type="radio"
          id="sex"
          v-model="currentPatient.sex"
          value="F"
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input type="text" class="form-control" id="address"
        v-model="currentPatient.address">
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="text" class="form-control" id="phone"
        v-model="currentPatient.phone">
      </div>

    </form>

    <button class="badge badge-danger mr-2"
      @click="deletePatient"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updatePatient"
    >
      Update
    </button>
    <a class="badge badge-secondary float-right mt-2"
          :href="'/patients'"
        >
          Go Back
    </a>
    
  </div>

  <div v-else>
    <br />
    <p>Please click on a Patient...</p>
  </div>
</template>

<script>
import PatientDataService from "../services/PatientDataService";
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  name: "patient",
  components: {DatePick},
  data() {
    return {
      errors: [],
      currentPatient: null,
      message: ''
    };
  },
  methods: {
    getPatient(id) {
      PatientDataService.get(id)
        .then(response => {
          this.currentPatient = response.data;
          //console.log(response.data);
        })
        .catch(e => {
          console.log(e.response);
        });
    },

    updatePatient() {

      this.errors = [];
      this.message = "";

      PatientDataService.update(this.currentPatient.id, this.currentPatient)
        .then(response => {
          console.log(response.data);
          this.message = 'The patient\'s info was updated successfully!';
        })
        .catch(e => {
          console.log(e.response.data);
          this.errors = e.response.data;
        });
    },

    deletePatient() {
      PatientDataService.delete(this.currentPatient.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "patients" });
        })
        .catch(e => {
          console.log(e.response);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getPatient(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

