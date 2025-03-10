import axios from "axios";

export default {

    sendPostEquipmentRequest(newEquipment) {
        return axios.post('/equipment', null, {
                params: {
                    equipmentName: newEquipment
                }
            }
        );
    },

    sendGetEquipmentRequest() {
        return axios.get('/equipment');
    },
}