<template>
  <div v-if="currentRecord">
    <h3>Record</h3>
    <p v-if="message" class="alert alert-success mt-2">{{ message }}
    </p>
    <div v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul class="alert alert-danger">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>
    <button class="btn btn-sm btn-info mt-2 mb-2" v-on:click="isHidden = !isHidden" @click="getThePatient(currentRecord.patientId)">Show Patient info</button>
    <div v-if="!isHidden">
      <div class="shadow rounded p-3 mb-2 bg-light text-dark" v-if="patient != null">
        <h5><fa-icon :icon="['fas', 'id-card-alt']"/> &nbsp;&nbsp; {{ patient.firstName }} {{ patient.lastName }}</h5>
        <p>Birthdate: {{ patient.birthDate | formatDate }} &nbsp;&nbsp;|&nbsp;&nbsp; Age: {{age}}</p>
        <p>Gender: {{ patient.sex }}</p>
        <p>Address: {{ patient.address }}</p>
        <p>Phone: {{ patient.phone }}</p>

      </div>
    </div>

    <form>
      <div class="form-group">
        <label for="note">Note</label>
        <textarea type="text" class="form-control" 
        rows="5"
        id="note" 
        v-model="currentRecord.note"
        name="note">
        </textarea>
      </div>
    </form>
    <button type="submit" class="btn btn-success"
      @click="updateRecord"
    >
      Update
    </button>
    <a class="btn btn-secondary float-right mt-2"
          :href="'/records/patient/' + this.currentRecord.patientId">
          Go Back
    </a>
  </div>
  
</template>

<script>
import RecordDataService from '../services/RecordDataService.js'
import PatientDataService from '../services/PatientDataService.js'

export default {
  name: 'record-detail',
  data() {
    return {
      errors: [],
      currentRecord: null,
      patient: null,
      message: '',
      isHidden: true,
      age: null
    };
  },
  methods: {
    getARecord(id) {
      RecordDataService.getARecord(id)
        .then(response => {
          this.currentRecord = response.data;
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response);
        });
    },
    getThePatient(patientId) {
      PatientDataService.get(patientId)
        .then(response => {
          this.patient = response.data;
          //console.log(response.data);
          this.patientBirth = response.data.birthDate;
          //console.log(this.patientBirth);
          this.age = this.calculateAge(this.patientBirth);
          //console.log(this.age);
        })
        .catch(e => {
          console.log(e.response);
        });
    },

    updateRecord() {
      this.errors = [];
      var data = {
        patientId: this.currentRecord.patientId,
        note: this.currentRecord.note
      };
      RecordDataService.updateRecord(this.currentRecord.id, data)
        .then(response => {
          this.currentRecord = response.data;
          this.message = 'Record updated successfully!';
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response);
        });
    },
    calculateAge(patientBirth) {
      return Math.floor((new Date() - new Date(patientBirth).getTime()) / 3.15576e+10);
    }
  },
  mounted() {
    this.message = '';
    this.getARecord(this.$route.params.id);
  }
    
};
</script>