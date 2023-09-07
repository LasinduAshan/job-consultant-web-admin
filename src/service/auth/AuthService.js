import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/v1/auth/";

class AuthService {

    login(email, password) {
        return axios
            .post(API_URL + "authenticate", {
                email,
                password
            }, {headers: authHeader()});
    }

    logout() {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("ROLE_LIST");
        localStorage.removeItem("CHECK_IS_ADMIN");
        localStorage.removeItem("USER_EMAIL");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }

    getCountryList() {
        // return axios.get(`https://trial.mobiscroll.com/content/countries.json`);
        return axios.get(`https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=country`);
    }

}

export default new AuthService();