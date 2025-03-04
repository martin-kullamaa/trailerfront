import axios from "axios";

export default {
    sendLocationStartsRequest() {
        return axios.get('/home');
    },
}