import axios from "axios";

export default {

    sendGetStartIdRequest(trailId) {
        return axios.get('/location', {
                params: {
                    trailId: trailId
                }
            }
        );
    },

    sendLocationStartsRequest() {
        return axios.get('/location/start');
    },
    sendFilteredLocationRequest(typeId) {
        return axios.get(`/location/type`, {
            params: { typeId: typeId }
        });
    }
}