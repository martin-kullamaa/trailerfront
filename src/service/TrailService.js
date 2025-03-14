import axios from "axios";


export default {

    sendPostTrailRequest(newTrail) {
        return axios.post('/trail', newTrail);
    },

    sendGetTrailRequest(startId) {
        return axios.get('/trail', {
                params: {
                    startId: startId,
                }
            }
        );
    },

    sendPutTrailRequest(trail) {
        return axios.put('/trail', trail);
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

    sendPostTrailEquipmentRequest(trailId, equipmentId) {
        return axios.post('/trail/equipment', null, {
                params: {
                    trailId: trailId,
                    equipmentId: equipmentId
                }
            }
        );
    },

    sendDeleteTrailEquipmentRequest(trailId, equipmentId) {
        return axios.delete('/trail/equipment', {
                params: {
                    trailId: trailId,
                    equipmentId: equipmentId
                }
            }
        );
    },
}