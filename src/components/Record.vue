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
      <div v-if="patient != null">
        <h5> {{ patient.firstName }} {{ patient.lastName }}</h5>
        <p>Birthdate: {{ patient.birthDate | formatDate }}</p>
        <p>Gender: {{ patient.sex }}</p>
        <p>Address: {{ patient.address }}</p>
        <p>Phone: {{ patient.phone }}</p>

      </div>
    </div>

    <form>
      <div class="form-group">
        <label for="note">Note</label>
        <input type="text" class="form-control" 
        id="note" 
        v-model="currentRecord.note"
        name="note">
      </div>
    </form>
    <button type="submit" class="badge badge-success"
      @click="updateRecord"
    >
      Update
    </button>
    <a class="badge badge-secondary float-right mt-2"
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
      isHidden: true
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
    }
  },
  mounted() {
    this.message = '';
    this.getARecord(this.$route.params.id);
  }
    
};
</script>