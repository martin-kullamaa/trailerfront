import axios from "axios";

export default {
    sendGetTypesRequest() {
        return axios.get('/type');
    },

    // todo: move this to trailService
    sendGetTrailTypeRequest(trailId) {
        return axios.get('/trail/type', {
                params: {
                    trailId: trailId
                }
            }
        );
    },

    // todo: move this to trailService
    sendPostTrailTypeRequest(trailId, typeId) {
        return axios.post('/trail/type', null, {
                params: {
                    trailId: trailId,
                    typeId: typeId
                }
            }
        );
    },

    // todo: move this to trailService
    sendDeleteTrailTypeRequest(trailId, typeId) {
        return axios.delete('/trail/type', {
                params: {
                    trailId: trailId,
                    typeId: typeId
                }
            }
        );
    },
}