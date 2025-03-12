import axios from "axios";

export default {
    sendLocationStartsRequest() {
        return axios.get('/location/start');
    },
}