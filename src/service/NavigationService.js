import router from "@/router";

export default {
    navigateToRegisterView() {
        router.push({name: 'registerRoute'})
    },
    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },
    navigateToTrailDetailsView(trailId) {
        router.push({name: 'trailDetailsRoute', params: {trailId}})
    },
    navigateToTrailView(startId) {
        router.push({name: 'trailRoute', params: {startId}})
    },


}