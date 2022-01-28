<template>
  <div class="submit-form">
    <div v-if="!submmited">
      <div class="form-group">
        <label for="note">Note</label>
        <textarea type="text" 
        class="form-control" 
        rows="5"
        id="note"
        required
        v-model="record.note"
        name="note">
        </textarea>
      </div>
      <button @click="saveRecord" class="btn btn-success">Submit</button>
      <a class="btn btn-secondary float-right" :href="'/records/patient/' + this.$route.params.patientId">Cancel</a>
    </div>
    <div v-else>
      <p class="alert alert-success">Record saved successfully!</p>
      <a class="btn btn-secondary" :href="'/records/patient/' + this.$route.params.patientId">Go Back</a>
    </div>

  </div>
</template>

<script>
import RecordDataService from '../services/RecordDataService.js'

export default {
  name: 'add-record',
  data() {
    return {
      errors: [],
      record: {
        note: ""
      },
      submmited: false
    };
  },
  methods: {
    saveRecord() {
      var data = {
        note: this.record.note
      };
      RecordDataService.createRecord(this.record.patientId, data)
        .then(response => {
          this.record = response.data.id;
          console.log(response.data);
          this.submmited = true;
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response);
        });
    }
  },
  mounted() {
    this.record.patientId = this.$route.params.patientId;
  }
};
</script>