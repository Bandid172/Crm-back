import axios from "axios";

export default {
    actions: {
        fetchUsers(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get('http://localhost:8505/api/users')
                    .then((response) => {
                        let users = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }
                        context.commit('updateUsers', users)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },
        postUser(context, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('http://localhost:8505/api/users/my', data)
                    .then(() => {
                        resolve()
                    })
                    .catch(() => {
                        console.log('error')
                        reject()
                    })
            })
        },

        deleteUser(context, userId) {
            return new Promise((resolve, reject) => {
                axios
                    .patch(`http://localhost:8505/api/users/${userId}`, {
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

        searchUser(context, data) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`http://localhost:8505/api/users?name=${data.name}&email=${data.email}`)
                    .then((response) => {
                        let users = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }

                        context.commit('updateUsers', users)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        }
    },
    mutations: {
        updateUsers(state, users) {
            state.users = users
        }
    },
    state: {
        users: {
            models: [],
            totalItems: 0
        }
    },
    getters: {
        getUsers(state) {
            return state.users.models
        }
    }
}