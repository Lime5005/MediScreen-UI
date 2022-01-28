import axios from "axios";

const REPORT_API_BASE_URL = "http://localhost:8083/api";

class AssessmentService {
    getAssessment(patientId) {
        return axios.get(REPORT_API_BASE_URL + `/assessment/${patientId}`);
    }
}

export default new AssessmentService();