import axios from "axios";

export default {
    sendLoginRequest(username, password) {
        return axios.get('/login', {
                params: {
                    username: username,
                    password: password
                }
            });
    },
}