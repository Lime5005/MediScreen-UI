<template>
  <div class="list row">
    <div class="col-md-12">
      <h3>Patient Records List</h3>
      <div class="row">
        <div class="col">
          <a class="btn btn-info btn-sm" @click="getAssessment(patientId)">Assessment: <span v-if="assessment">{{ assessment }}</span>
            <span v-else>No Assessment</span>
          </a>
        </div>
        <div class="col">
          <a class="btn btn-primary float-right mb-2" :href="'/records/patient/'+ this.patientId + '/add'">Add record</a>
        </div>
      </div>

      <table class="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Patient Id</th>
            <th>Note</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Edit</th>
            <th>Delete</th>
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
              <a class="badge badge-warning"
                :href="'/records/' + record.id"
              >
                Edit
              </a>
            </td>
            <td>
              <button class="badge badge-danger"
                @click="deleteRecord(record.id)"
              >
                Delete
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