import axios from "axios";

export default {
    actions: {
        fetchClients(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get('http://localhost:8505/api/clients')
                    .then((response) => {
                        let clients = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }

                        context.commit('updateClients', clients)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },

        addClient(context,data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('http://localhost:8505/api/clients/my', data)
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },

        deleteClient(context, userId) {
            return new Promise((resolve, reject) => {
                axios
                    .patch(`http://localhost:8505/api/clients/${userId}`, {
                        isDeleted: true, // Set isDeleted to true to indicate user deletion
                    }, {
                        headers: {
                            'Content-Type': 'application/merge-patch+json', // Use the specific MIME type
                        },
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        searchClient(context, data) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`http://localhost:8505/api/clients?name=${data.name}&email=${data.email}&workplace=${data.workplace}`)
                    .then((response) => {
                        let clients = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }

                        context.commit('updateClients', clients)
                        resolve()
                    })
                    .catch((error) => {
                        console.log(error)
                        reject()
                    })
            })
        }
    },

    mutations: {
        updateClients(state, clients) {
            state.clients = clients
        }
    },

    state: {
        clients: {
            models: [],
            totalItems: 0
        }
    },

    getters: {
        getClients(state) {
            return state.clients.models
        }
    }
}