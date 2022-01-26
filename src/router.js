import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
            alias: "/patients",
            name: "patients",
            component: () =>
                import ("./components/PatientsList")
        },
        {
            path: "/patients/:id",
            name: "patient-details",
            component: () =>
                import ("./components/Patient")
        },
        {
            path: "/patient/add",
            name: "add-patient",
            component: () =>
                import ("./components/AddPatient")
        },
        {
            path: "/records",
            name: "records",
            component: () =>
                import ("./components/RecordsList")
        },
        {
            path: "/records/patient/:id",
            name: "patient-records",
            component: () =>
                import ("./components/PatientRecords")
        },
        {
            path: "/records/patient/:patientId/add",
            name: "add-record",
            component: () =>
                import ("./components/AddRecord")
        },
        {
            path: "/records/:id",
            name: "record-details",
            component: () =>
                import ("./components/Record")
        }
    ]
});