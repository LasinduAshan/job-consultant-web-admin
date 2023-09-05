import axios from 'axios';





export default function testHeaderConfig() {
    const instance = axios.create({
        baseURL: 'http://localhost:8080/api/v1/',
    });

    const access_token = localStorage.getItem("ACCESS_TOKEN");

// Set the JWT token in the request header
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    // instance.defaults.headers.common.Accept['Authorization'] = 'Bearer ' + access_token;

// Now you can use 'instance' to make your API requests
    instance.get('/admin-service')
        .then(response => {
            // Handle the response
        })
        .catch(error => {
            // Handle errors
        });
}