import router from "@/router";

export default {
    navigateToRegisterView() {
        router.push({name: 'registerRoute'})
    },
    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },
    navigateToNewTrailView() {
        router.push({name: 'trailRoute'})
    },
    navigateToNewTrailDetailsView() {
        router.push({name: 'trailDetailsRoute'})
    },
}