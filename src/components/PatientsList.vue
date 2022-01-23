<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Last Name"
          v-model="lastName"/>
        <div class="input-group-append">
          <button class="btn btn-outline-info" type="button"
            @click="searchLastName"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-6">
          <h4>Patients List</h4>
        </div>  
        <div class="col-md-6">
          <button type="submit" class="badge badge-primary ml-5"
            @click="refreshList">Refresh
          </button>
        </div>
      </div>
      
      <table class="table table-hover">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
           <tr :class="{ active: index == currentIndex }"
          v-for="(patient, index) in patients"
          :key="index"
           @click="setActivePatient(patient, index)">
            <td>{{ patient.firstName }}</td>
            <td>{{ patient.lastName }}</td>
            <td>{{ patient.sex}}</td>
           </tr>
          
        </tbody>
      </table>

    </div>
    <div class="col-md-6">
      <div v-if="currentPatient">
        <h4>Patient</h4>
        <div>
          <label><strong>First Name:</strong></label> {{ currentPatient.firstName }}
        </div>
        <div>
          <label><strong>Last Name:</strong></label> {{ currentPatient.lastName }}
        </div>
        <div>
          <label><strong>Birth Date:</strong></label> {{ currentPatient.birthDate | formatDate }}
        </div>

        <div>
          <label><strong>Sex:</strong></label>{{ currentPatient.sex }}
        </div>

        <div>
          <label><strong>Address:</strong></label>{{ currentPatient.address }}
        </div>

        <div>
          <label><strong>Phone:</strong></label>{{ currentPatient.phone }}
        </div>

        <a class="badge badge-warning"
          :href="'/patients/' + currentPatient.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Patient...</p>
      </div>

    </div>
  </div>
</template>

<script>
import PatientDataService from "../services/PatientDataService";

export default {
  name: "patients",
  data() {
    return {
      patients: [],
      currentPatient: null,
      currentIndex: -1,
      lastName: "",
      firstName: "",
      sex: null
    };
  },
  methods: {
    getPatients() {
      PatientDataService.getAll()
        .then(response => {
          this.patients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e.response);
        });
    },

    refreshList() {
      this.getPatients();
      this.currentPatient = null;
      this.currentIndex = -1;
    },

    setActivePatient(patient, index) {
      this.currentPatient = patient;
      this.currentIndex = index;
    },
    
    searchLastName() {
      PatientDataService.findByLastName(this.lastName)
        .then(response => {
          this.patients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

  },
  mounted() {
    this.getPatients();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
