import axios from "axios";

export default {

    sendPostPictureRequest(trailId, trailPictures) {
        return axios.post('/picture', trailPictures, {
            params: { trailId: trailId }
        });
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