<template>
  <div v-if="currentRecord">
    <h3>Record</h3>
    <p v-if="message" class="alert alert-success mt-2">{{ message }}
    </p>
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

export default {
  name: 'record-detail',
  data() {
    return {
      errors: [],
      currentRecord: null,
      message: ''
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