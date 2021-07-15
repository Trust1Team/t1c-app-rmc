export const namespaced = true
import Trust1ConnectorService from "../../services/Trust1ConnectorService";

export const state = {
    connectedCars: []
}

export const mutations = {
    setConnectedCars(state, payload) {
        state.events = payload
    },
}

export const actions = {
    async getConnectedCards() {
        Trust1ConnectorService.getClient().core().readersCardAvailable().then((data)=>
            console.log(data)
        )
    }
}

export const getters = {

}