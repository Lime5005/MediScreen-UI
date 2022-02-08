<template>
  <div class="submit-form">
    <div v-if="!submitted">
      
      <div class="form-group">
        <div v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul class="alert alert-danger">
            <li v-for="(error, id) in errors" :key="id">{{ error }}</li>
          </ul>

        </div>
        <label for="firstName">First name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          required
          v-model="patient.firstName"
          name="firstName"
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last name</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          required
          v-model="patient.lastName"
          name="lastName"
        />
      </div>

      <div class="form-group">
        <label for="birthDate">Birth Date: &nbsp;</label>
        <date-pick
          v-model="patient.birthDate"
          name="birthDate"
          >
        </date-pick>
      </div>

      <div class="form-group">
        <label for="gender">Gender: &nbsp;</label>
        <label for="man">Man&nbsp;</label>
        <input
          type="radio"
          v-model="patient.sex"
          value="M"
        />
        <label for="Female">&nbsp;&nbsp;&nbsp;Female&nbsp;</label>
        <input
          type="radio"
          v-model="patient.sex"
          value="F"
        />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="patient.address"
          name="address"
        />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          v-model="patient.phone"
          name="phone"
        />
      </div>

      <button @click="savePatient" class="btn btn-success">Submit</button>
      <a class="btn btn-secondary float-right"
          :href="'/patients'"
        >
          Cancel
      </a>
    </div>

    <div v-else>
      <p class="alert alert-success">Patient saved successfully!</p>
      <button class="btn btn-primary" @click="newPatient">Add</button>
    </div>
  </div>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import PatientDataService from "../services/PatientDataService";

export default {
  components: {DatePick},
  name: "add-patient",
  data() {
    return {
      errors: [],
      patient: {
        id: null,
        firstName: "",
        lastName: "",
        birthDate: "",
        sex: null,
        address: "",
        phone: ""
      },
      submitted: false
    };
  },
  methods: {
    savePatient() {
      var data = {
        firstName: this.patient.firstName,
        lastName: this.patient.lastName,
        birthDate: this.patient.birthDate,
        sex: this.patient.sex,
        address: this.patient.address,
        phone: this.patient.phone
      };

      this.errors = []

      PatientDataService.create(data)
        .then(response => {
          this.patient.id = response.data.id;
          //console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e.response.data);
          this.errors = e.response.data;
        });
    },
    
    newPatient() {
      this.submitted = false;
      this.patient = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>