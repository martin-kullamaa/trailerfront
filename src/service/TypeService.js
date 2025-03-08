import axios from "axios";

export default {
    sendGetTypesRequest() {
        return axios.get('/type');
    },

    // move this to trailService
    sendGetTrailTypeRequest(trailId) {
        return axios.get('/trail', {
                params: {
                    trailId: trailId
                }
            }
        );
    },
}