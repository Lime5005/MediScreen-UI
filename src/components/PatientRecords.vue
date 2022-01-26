<template>
  <div class="list row">
    <div class="col-md-12">
      <h3>Patient Records List</h3>
      <a class="btn btn-primary" :href="'/records/patient/'+ this.patientId + '/add'">Add record</a>
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
              <a class="badge badge-danger"
                @click="deleteRecord(record.id)"
              >
                Delete
              </a>
            </td>
           </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script>
import RecordDataService from "../services/RecordDataService.js"

export default {
  name: "patient-records",
  data() {
    return {
      records: [],
      patientId: this.$route.params.id
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

    deleteRecord(id) {
      RecordDataService.deleteRecord(id)
        .then((response) => {
          console.log(response.data);
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