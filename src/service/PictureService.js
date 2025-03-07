import axios from "axios";

export default {

    sendPostPictureRequest(trailId, trailPictures) {
        return axios.post('/picture', trailId, trailPictures);
    },

    sendGetPicturesRequest(trailId) {
        return axios.get('/picture', {
                params: {
                    trailId: trailId,
                }
            }
        );
    },

}