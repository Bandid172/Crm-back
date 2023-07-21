<template>
    <div>
        <div class="modal-window" v-if="isActive">
            <div class="modal-box">
                <strong>Mijoz qo'shish</strong>
                <hr>
                <form @submit="pushClient">
                    <label for="name">Ismi<span>*</span></label>
                    <input type="text" id="name" required v-model="client.name" placeholder="John Doe"/>
                    <label for="email">Email<span>*</span></label>
                    <input type="email" id="email" required v-model="client.email" placeholder="lorem.inc@gmail.com"/>
                    <label for="password">Parol<span>*</span></label>
                    <input type="password" id="password" required v-model="client.password" placeholder="12345678"/>
                    <label for="workPlace">Ishlash joyi<span>*</span></label>
                    <select id="workPlace" v-model="client.workplace" required>
                        <option v-for="company in getCompanies" :key="company.id" :value="company['@id']">{{ company.name }}</option>
                    </select>
                    <button>Qo'shish</button>
                </form>
            </div>
        </div>
        <div class="modal-window" v-if="isCalled">
            <div class="modal-box">
                <strong>Mijoz o`zgartirish</strong>
                <hr>
                <form @submit.prevent="patchClient">
                    <label for="name">Ismi<span>*</span></label>
                    <input type="text" id="name" v-model="patchData.name" placeholder="John Doe"/>
                    <label for="email">Email<span>*</span></label>
                    <input type="email" id="email" v-model="patchData.email" placeholder="lorem.inc@gmail.com" />
                    <label for="password">Parol<span>*</span></label>
                    <input type="password" id="password" v-model="patchData.password" placeholder="12345678" />
                    <label for="workPlace">Ishlash joyi<span>*</span></label>
                    <select id="workPlace" v-model="patchData.workplace">
                        <option v-for="company in getCompanies" :key="company.id" :value="company['@id']">{{ company.name }}</option>
                    </select>
                    <button>O`zgartirish</button>
                </form>
            </div>
        </div>
        <div class="success-message" v-if="successMessage">
            <img src="../assets/images/check.png" />
            <p>{{ successMessage }}</p>
        </div>
        <div class="pop-up-window" v-if="isClicked">
            <div class="pop-up-box">
                <p>Rostan ham o'chirilsinmi ?</p>
                <div class="choice-btn">
                    <button class="danger" @click="eraseClient">Ha</button>
                    <button class="success" @click="togglePopUpWindow">Yo'q</button>
                </div>
            </div>
        </div>
        <!-- Foydalanuvchi qoshish tugmasi -->
        <div class="btn">
            <button id="adduser-btn" @click="toggleModalWindow">Mijoz qo'shish</button>
        </div>
        <!-- Filter -->
        <div class="filter">
            <p class="text-secondary">Mijozlar: <span class="text-primary">Hammasi </span>
                <font-awesome-icon icon="fa-solid fa-angle-down" class="icon" />
            </p>
        </div>
        <div class="row">
            <div class="col-12 col-xl-3 col-lg-3 col-md-6 col-sm-12 my-2">
                <input type="text" placeholder="Mijozlar qidirish" class="search" v-model="formClient.name" @change="handleChange">
                <img src="../assets/images/search.png" class="search-icon"/>
            </div>
            <div class="col-12 col-xl-3 col-lg-3 col-md-6 col-sm-12 my-2">
                <input type="text" placeholder="Email qidirish" class="search" v-model="formClient.email" @change="handleChange">
                <img src="../assets/images/search.png" class="search-icon"/>
            </div>
            <div class="col-12 col-xl-3 col-lg-3 col-md-6 col-sm-12 my-2">
                <input type="text" placeholder="Ishlash joyini qidirish" class="search" v-model="formClient.workplace" @change="handleChange">
                <img src="../assets/images/search.png" class="search-icon"/>
            </div>
            <div class="col-12 col-xl-3 col-lg-3 col-md-6 col-sm-12 my-2">
                <input type="text" placeholder="S'ongi faolikni qidirish" class="search">
                <img src="../assets/images/search.png" class="search-icon"/>
            </div>
        </div>
        <div class="table">
            <table>
                <thead>
                <tr>
                    <th scope="col">Ism</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ish</th>
                    <th scope="col">So'ngi</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="client in getClients" :key="client.id">
                    <td data-label="Ism" class="name" v-if="!client.isDeleted">{{ client.name }}</td>
                    <td data-label="Email" v-if="!client.isDeleted">{{ client.email }}</td>
                    <td data-label="Ish" v-if="!client.isDeleted">{{ client.workplace.name }}</td>
                    <td data-label="So'ngi faollik" v-if="!client.isDeleted">5 minut oldin</td>
                    <td v-if="!client.isDeleted">
                        <div class="edit-delete">
                            <font-awesome-icon icon="fa-regular fa-pen-to-square" class="edit-icon" @click="handleCall(client.id)" />
                            <font-awesome-icon icon="fa-solid fa-trash" class="delete-icon" @click="handleClick(client.id)"/>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>
import {isActive, toggleModalWindow} from "@/plugins/active";
import {isClicked, togglePopUpWindow} from "@/plugins/popUp";
import {isCalled, toggleIsCalled} from "@/plugins/editPopUp";
import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default {
    name: "UsersPage",
    data() {
        return {
            isActive,
            toggleModalWindow,
            isClicked,
            togglePopUpWindow,
            clientId: null,
            isCalled,
            toggleIsCalled,
            successMessage: '',
            client: {
                email: null,
                password: null,
                name: null,
                workplace: null
            },
            patchForm: {
            },
            patchData: {
                email: '',
                password: '',
                name: '',
                workplace: ''
            },
            formClient: {
                email: '',
                name: '',
                workplace: ''
            }
        }
    },
    methods: {
        ...mapActions(['fetchClients','addClient','fetchCompanies','deleteClient','searchClient']),

        pushClient() {
            this.addClient(this.client)
        },

        eraseClient() {
            this.deleteClient(this.clientId)
                .then(() => {
                    this.togglePopUpWindow()
                })
                .then(() => {
                    location.reload()
                })
        },

        handleClick(id) {
            this.togglePopUpWindow()
            this.clientId = id
        },

        handleCall(id) {
            this.toggleIsCalled()
            this.clientId = id
        },

        handleChange() {
            this.searchClient(this.formClient)
        },

        patchClient() {
            this.updateClient()
        },

        updateClient() {
            if (this.patchData.email && this.patchData.email.trim().length > 0) {
                this.patchForm.email = this.patchData.email.trim();
            }

            // Check if editCompany.password is not empty
            if (this.patchData.password && this.patchData.password.trim().length > 0) {
                this.patchForm.password = this.patchData.password.trim();
            }

            // Check if editCompany.name is not empty
            if (this.patchData.name && this.patchData.name.trim().length > 0) {
                this.patchForm.name = this.patchData.name.trim();
            }

            if(this.patchData.workplace && this.patchData.workplace.trim().length > 0) {
                this.patchForm.workplace = this.patchData.workplace.trim()
            }

            axios
                .patch(`http://localhost:8505/api/clients/${this.clientId}`, this.patchForm, {
                    headers: {
                        'Content-Type': 'application/merge-patch+json',
                    }
                })
                .then(() => {
                    this.toggleIsCalled();
                })
                .then(() => {
                    this.successMessage = 'Ma’lumotlat muaffaqiyatli o’zgartirildi'
                    setTimeout(() => {
                        this.successMessage = ''
                        location.reload()
                    }, 2000)
                })
                .catch(error => {
                    console.error('Error updating company:', error);
                });
        },
    },
    computed: {
        ...mapGetters(['getClients','getCompanies'])
    },

    mounted() {
        this.fetchClients()
        this.fetchCompanies()
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.btn {
    padding: 0;
    display: flex;
    justify-content: end;
    margin-bottom: 10px;
}

#adduser-btn {
    background-color: #109CF1;
    color: #ffffff;
    border: none;
    font-family: 'Poppins', sans-serif;
    padding: .75rem 1rem;
    border-radius: 5px;
    outline: none;
    font-size: 14px;
}

#adduser-btn:hover {
    color: #F5F6F8;
}

.search {
    width: 100%;
    padding: .5rem 2rem;
    border: none;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
    outline: none;
}

.search-icon {
    position: absolute;
    left: 20px;
    top: 11px;
}

.modal-window {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    width: 100%;
    height: 100vh;
    position: absolute;
    padding: 0 10px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.modal-box {
    width: 318px;
    height: 458px;
    box-shadow: 6px 0 18px rgba(0, 0, 0, 0.25);
    padding: .5rem 1rem;
    display: flex;
    background-color: #ffffff;
    flex-direction: column;
}

strong {
    align-self: center;
    color: rgba(23, 23, 23, 1);
    font-family: 'Poppins', sans-serif;
}

.modal-box form {
    display: flex;
    flex-direction: column;
}

.modal-box form input {
    border: 1px solid #D9D9D9;
    color: rgba(68, 65, 80, 1);
    font-family: 'Poppins',sans-serif;
    max-width: 270px;
    height: 36px;
    border-radius: 6px;
    outline: none;
    padding: .75rem;
    margin-bottom: 10px;
}

.modal-box form select {
    border: 1px solid #D9D9D9;
    max-width: 270px;
    height: 36px;
    border-radius: 6px;
    outline: none;
    padding-left: .75rem;
    margin-bottom: 10px;
}

.modal-box form input:focus {
    background-color: rgba(16, 156, 241, 0.16);
    border: 1px solid #109CF1;
}

form label {
    font-family: 'Poppins', sans-serif;
    color: rgba(68, 65, 80, 1);
}

form label span {
    color: rgba(16, 156, 241, 1);
}

form button {
    background-color: rgba(16, 156, 241, 1);
    font-family: 'Poppins', sans-serif;
    border-radius: 4px;
    padding: .25rem 1.5rem;
    margin-top: 10px;
    color: #ffffff;
    outline: none;
    border: none;
    align-self: center;
}

.success-message {
    width: 300px;
    padding: 5px 0;
    background-color: rgba(52, 212, 126, 1);
    color: #FFFFFF;
    font-family: 'Poppins', sans-serif;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    z-index: 100;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.success-message p {
    font-size: 11px;
    position: relative;
    top: 8px;
}


.success-message img {
    background-color: #ffffff;
    border-radius: 50%;
    padding: 5px 6px;
}

.pop-up-window {
    display: flex;
    z-index: 99;
    justify-content: center;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.pop-up-box {
    display: flex;
    margin: 35px 10px;
    gap: 20px;
    padding: 0 1.5rem;
    width: 513px;
    font-family: 'Poppins', sans-serif;
    color: rgba(0, 0, 0, 1);
    line-height: 23px;
    font-weight: 400;
    height: 60px;
    border-radius: 2px;
    background-color: #FFFFFF;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
    justify-content: center;
    align-items: center;
}

.pop-up-box p {
    position: relative;
    top: 8px;
}

.choice-btn {
    display: flex;
    gap: 20px;
}

.choice-btn button {
    width: 90px;
    border: none;
    color: rgba(255, 255, 255, 1);
    outline: none;
    padding: .25rem;
    border-radius: 4px;
}

.danger {
    background-color: rgba(247, 104, 91, 1);
}

.success {
    background-color: rgba(52, 212, 126, 1);
}

table {
    border-collapse: collapse;
    margin-top: 10px;
    width: 100%;
    color: rgba(112, 118, 131, 1);
    font-size: 15px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    font-family: 'Poppins', sans-serif;
}

.icon {
    position: relative;
    top: 2px;
}

table th {
    color: rgba(51, 77, 110, 1);
    font-size: 13px;
    opacity: 0.5;
    line-height: 20px;
    font-weight: 500;
    vertical-align: center;
}

table td {
    font-size: 13px;
    line-height: 20px;
    color: rgba(112, 118, 131, 1);
}

@media screen and (max-width: 600px) {
    table {
        border: 0;
    }

    table thead {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

    table tr {
        display: block;
        margin-bottom: .625em;
    }

    table td {
        display: block;
        font-size: .8em;
        text-align: right;
    }

    table td::before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
    }

    table td:last-child {
        border-bottom: 0;
    }

    .pop-up-box {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 120px;
    }

}

.name {
    color: rgba(50, 60, 71, 1);
    line-height: 22px;
    font-size: 15px;
}

.edit-delete {
    display: flex;
    gap: 10px;
}

.edit-icon {
    cursor: pointer;
    font-size: 1.2rem;
}

.delete-icon {
    cursor: pointer;
    font-size: 1.2rem;
}

</style>
