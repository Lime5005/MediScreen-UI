import axios from "axios";

const RECORD_API_BASE_URL = "http://localhost:8082/api";

class RecordDataService {
    getAll() {
        return axios.get(RECORD_API_BASE_URL + "/records");
    }
    get(id) {
        return axios.get(RECORD_API_BASE_URL + `/records/${id}`);
    }
}