<template>
  <div class="list row">
    <div class="col-md-12">
      <h3>Record List</h3>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>PatientId</th>
            <th>Note</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>EDIT</th>
            <th>DELETE</th>
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

export default {
  name: "records",
  data() {
    return {
      records: [],
    };
  },
  methods: {
    getRecords() {
      RecordDataService.getAllRecords()
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
          this.getPatientRecords(this.$route.params.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getRecords();
  }
};
</script>