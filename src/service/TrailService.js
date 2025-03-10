import axios from "axios";

export default {
    createTrail(trailData) {
        return axios.post('/newtrail', trailData);
    },
}