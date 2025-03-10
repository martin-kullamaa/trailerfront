import axios from "axios";

export default {
    createTrail(newTrail) {
        return axios.post('/trail', newTrail);
    },
}