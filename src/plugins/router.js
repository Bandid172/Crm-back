import { createRouter, createWebHistory } from "vue-router";
import UsersPage from "@/pages/UsersPage";

const routes = [
    {
        path: '/',
        component: UsersPage
    },
    {
        path: '/companies',
        component: () => import('@/pages/CompanyPage')
    },
    {
        path: '/clients',
        component: () => import('@/pages/ClientsPage')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})