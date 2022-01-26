import axios from "axios";

const RECORD_API_BASE_URL = "http://localhost:8082/api";

class RecordDataService {
    getAllRecords() {
        return axios.get(RECORD_API_BASE_URL + "/records");
    }

    getARecord(id) {
        return axios.get(RECORD_API_BASE_URL + `/records/${id}`);
    }

    createRecord(patientId, data) {
        return axios.post(RECORD_API_BASE_URL + `/records/patient/${patientId}/add`, data);
    }

    updateRecord(id, data) {
        return axios.put(RECORD_API_BASE_URL + `/records/update/${id}`, data);
    }

    getRecords(patientId) {
        return axios.get(RECORD_API_BASE_URL + `/records/patient/${patientId}`);
    }

    deleteRecord(id) {
        return axios.delete(RECORD_API_BASE_URL + `/records/${id}`);
    }
}

export default new RecordDataService();