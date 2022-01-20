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
        }
    ]
});