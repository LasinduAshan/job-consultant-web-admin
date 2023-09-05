export default function authHeader() {
    /*const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    } else {
        return { Authorization: '' }; // for Spring Boot back-end
    }*/

    const access_token = localStorage.getItem("ACCESS_TOKEN");

    if (null != access_token) {
        // return { Authorization: 'Bearer ' + access_token }; // for Spring Boot back-end
        return { Authorization: `Bearer ${access_token}` }; // for Spring Boot back-end
    } else {
        return { Authorization: '' }; // for Spring Boot back-end
    }
}