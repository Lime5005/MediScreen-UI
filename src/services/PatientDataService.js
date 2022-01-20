import http from "../http-common";

class PatientDataService {
    getAll() {
        return http.get("/patients");
    }

    get(id) {
        return http.get(`/patients/${id}`);
    }

    create(data) {
        return http.post("/patient/add", data);
    }

    update(id, data) {
        return http.put(`/patients/update/${id}`, data);
    }

    delete(id) {
        return http.delete(`/patients/${id}`);
    }

    findByLastName(lastName) {
        return http.get(`/patients/family?lastName=${lastName}`);
    }
}

export default new PatientDataService();