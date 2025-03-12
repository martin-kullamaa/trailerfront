import axios from "axios";

export default {
    sendLocationStartsRequest() {
        return axios.get('/location/start');
    },
    sendFilteredLocationRequest(typeId) {
        return axios.get(`/location/type`, {
            params: { typeId: typeId }
        });
    }
}