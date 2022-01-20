import axios from "axios";

const PATIENT_API_BASE_URL = "http://localhost:8080/api";

class PatientDataService {
    getAll() {
        return axios.get(PATIENT_API_BASE_URL + "/patients");
    }

    get(id) {
        return axios.get(PATIENT_API_BASE_URL + `/patients/${id}`);
    }

    create(data) {
        return axios.post(PATIENT_API_BASE_URL + "/patient/add", data);
    }

    update(id, data) {
        return axios.put(PATIENT_API_BASE_URL + `/patients/update/${id}`, data);
    }

    delete(id) {
        return axios.delete(PATIENT_API_BASE_URL + `/patients/${id}`);
    }

    findByLastName(lastName) {
        return axios.get(PATIENT_API_BASE_URL + `/patients/family?lastName=${lastName}`);
    }
}

export default new PatientDataService();