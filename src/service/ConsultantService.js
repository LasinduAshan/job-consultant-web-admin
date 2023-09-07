import axios from 'axios';
import authHeader from "./auth/AuthHeader";

const API_URL = 'http://localhost:8080/api/v1/consultant-service';

class ConsultantService {
    saveConsultant(consultantDto) {
        return axios.post(API_URL + "/create",
            consultantDto
            , {headers: authHeader()});
    }

    updateConsultant(consultantDto) {
        return axios.put(API_URL + "/update",
            consultantDto
            , {headers: authHeader()});
    }

    getConsultantById(consultantId) {
        return axios.get(API_URL + `/view/${consultantId}`, {headers: authHeader()});
    }

    getConsultantByEmail(email) {
        return axios.get(API_URL + `/view/profile/${email}`, {headers: authHeader()});
    }

    getAllConsultants() {
        return axios.get(API_URL + `/view-all`, {headers: authHeader()});
    }

    getAvailabilityTimeSlots(date, day, consultantId) {
        return axios.get(API_URL + `/availability-time-slot/${date}/${day}/${consultantId}`, {headers: authHeader()});
    }

    deleteConsultant(consultantId) {
        return axios.delete(API_URL + `/${consultantId}`, {headers: authHeader()});
    }
}

const consultantService = new ConsultantService();
export default consultantService;