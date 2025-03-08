import axios from "axios";

export default {
    sendGetEquipmentRequest() {
        return axios.get('/equipment');
    },
}