import axios from "axios";

export default {
    actions: {
        fetchCompanies(context) {
            return new Promise((resolve, reject) => {
                axios
                    .get('http://localhost:8505/api/companies')
                    .then((response) => {
                        let companies = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }

                        context.commit('updateCompanies', companies)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },

        postCompany(context,data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('http://localhost:8505/api/companies/my', data)
                    .then(() => {
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        },

        deleteCompany(context, userId) {
            return new Promise((resolve, reject) => {
                axios
                    .patch(`http://localhost:8505/api/companies/${userId}`, {
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

        searchCompany(context, data) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`http://localhost:8505/api/companies?email=${data.email}&name=${data.name}`)
                    .then((response) => {

                        let companies = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }

                        context.commit('updateCompanies', companies)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        }
    },

    mutations: {
        updateCompanies(state,companies) {
            state.companies = companies
        }
    },

    state: {
        companies: {
            models: [],
            totalItems: 0
        }
    },

    getters: {
        getCompanies(state) {
            return state.companies.models
        }
    }
}