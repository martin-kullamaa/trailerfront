import axios from "axios";

export default {

    createTrail(trailData) {
        return axios.post('/newtrail', trailData);
    },

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

    sendDeleteTrailTypeRequest(trailId, typeId) {
        return axios.delete('/trail/type', {
                params: {
                    trailId: trailId,
                    typeId: typeId
                }
            }
        );
    },

    sendGetTrailEquipmentRequest(trailId) {
        return axios.get('/trail/equipment', {
                params: {
                    trailId: trailId,
                }
            }
        );
    },
}