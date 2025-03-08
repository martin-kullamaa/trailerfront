import axios from "axios";

export default {
    sendGetTypesRequest() {
        return axios.get('/type');
    },
}