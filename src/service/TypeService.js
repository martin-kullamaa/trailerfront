import axios from "axios";

export default {
    sendGetTypesRequest() {
        return axios.get('/type');
    },

    // move this to trailService
    sendGetTrailTypeRequest(trailId) {
        return axios.get('/trail/type', {
                params: {
                    trailId: trailId
                }
            }
        );
    },

    sendPostTrailTypeRequest(trailId, typeId) {
        return axios.post('/trail/type', null, {
                params: {
                    trailId: trailId,
                    typeId: typeId
                }
            }
        );
    },
}