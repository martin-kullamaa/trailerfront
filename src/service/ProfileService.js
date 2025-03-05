import axios from "axios";

export default {
    sentPostNewProfile(newProfile) {
        return axios.post('/register', newProfile);
    },
}