import axios from 'axios';
import authHeader from "./auth/AuthHeader";

const API_URL = 'http://localhost:8080/api/v1/booking-service';

class AppointmentService {
    acceptAppointment(appointmentDto) {
        return axios.post(API_URL + "/accept-appointment",
            appointmentDto
            , {headers: authHeader()});
    }

    rejectAppointment(appointmentDto) {
        return axios.post(API_URL + "/reject-appointment",
            appointmentDto
            , {headers: authHeader()});
    }

   /* updateConsultant(consultantDto) {
        return axios.put(API_URL + "/update",
            consultantDto
            , {headers: authHeader()});
    }*/

   /* getConsultantById(consultantId) {
        return axios.get(API_URL + `/view/${consultantId}`, {headers: authHeader()});
    }*/

    getAllAppointmentsForAdmin() {
        return axios.get(API_URL + `/view-all-admin`, {headers: authHeader()});
    }

    getAllAppointmentDetailListForConsultant(email, appointmentStatus) {
        return axios.get(API_URL + `/view-all-consultant/${email}/${appointmentStatus}`, {headers: authHeader()});
    }

    getDashboardDetailsForConsultant(email) {
        return axios.get(API_URL + `/view-consultant-dashboard/${email}`, {headers: authHeader()});
    }

    getDashboardDetailsForAdmin() {
        return axios.get(API_URL + `/view-admin-dashboard`, {headers: authHeader()});
    }
}

const appointmentService = new AppointmentService();
export default appointmentService;