<template>
  <div class="list row">
    <div class="col-md-12">
      <h3>Patient Records</h3>
      <div class="row pb-2">
        <div class="col">       
          <button class="btn btn-info mr-2" @click="getAssessment(patientId)">
            <fa-icon :icon="['fas', 'circle-notch']" />&nbsp;&nbsp;Diabetes Assessment
          </button>
          <span class="border-bottom border-info border-5 pb-2 font-weight-bold" v-if="assessment">{{ assessment }}</span>
        </div>
        <div class="col">
          <a class="btn btn-primary float-right" :href="'/records/patient/'+ this.patientId + '/add'"><fa-icon :icon="['fas', 'plus']"/></a>
        </div>
      </div>

      <table class="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>PatientId</th>
            <th class="text-center"><fa-icon :icon="['fas', 'laptop-medical']"/>&nbsp;&nbsp;Note</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th class="action">EDIT</th>
            <th class="action">DELETE</th>
          </tr>
        </thead>
        <tbody>
           <tr
          v-for="(record, index) in records"
          :key="index"
           >
            <td>{{ record.id }}</td>
            <td>{{ record.patientId }}</td>
            <td>{{ record.note}}</td>
            <td>{{ record.createdAt | formatDateTime }}</td>
            <td>{{ record.updatedAt | formatDateTime }}</td>
            <td>
              <a class="btn btn-warning"
                :href="'/records/' + record.id"
              >
                <fa-icon :icon="['fas', 'edit']"/>
              </a>
            </td>
            <td>
              <button class="btn btn-danger"
                @click="deleteRecord(record.id)"
              >
                <fa-icon :icon="['fas', 'trash']"/>
              </button>
            </td>
           </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script>
import RecordDataService from "../services/RecordDataService.js"
import AssessmentService from "../services/AssessmentService.js"

export default {
  name: "patient-records",
  data() {
    return {
      records: [],
      patientId: this.$route.params.id,
      assessment: ""
    };
  },
  methods: {
    getPatientRecords(patientId) {
      RecordDataService.getRecords(patientId)
        .then((response) => {
          this.records = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAssessment(patientId) {
      AssessmentService.getAssessment(patientId)
        .then((response) => {
          this.assessment = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteRecord(id) {
      RecordDataService.deleteRecord(id)
        .then((response) => {
          console.log(response.data);
          this.getPatientRecords(this.$route.params.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getPatientRecords(this.$route.params.id);
  }
};
</script>

<style scoped>
.action{
  color: indigo;
}
</style>