import router from "@/router";

export default {
    navigateToRegisterView() {
        router.push({name: 'registerRoute'})
    },
    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },
    navigateToNewTrailDetailsView(trailId) {
        router.push({name: 'trailDetailsRoute', params: {trailId}})
    },
    navigateToTrailView(startId) {
        router.push({name: 'trailRoute', params: {startId}})
    },


}