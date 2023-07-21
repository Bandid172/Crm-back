<template>
    <div class="sidebar" :style="{ width: sidebarWidth}">
        <div class="logo" :style="collapsed ? { position: 'relative', right: '12px'} : {}">
            <h3>{{ collapsed ? 'Inc' : 'Kadirov Inc' }}</h3>
        </div>
        <hr>

        <div class="profile">
            <img
                src="../assets/images/profile_photo.png"
                alt="profile-picture"
                :style="collapsed ? { position: 'relative', right: '9px', width: '35px', height: '35px'}: {}"
            />
            <div class="profile-info" v-if="!collapsed">
                <h4>Ameliya</h4>
                <p>ameliya.cer@gmail.com</p>
            </div>
        </div>
        <div class="navigation">
            <div class="nav-item user">
                <router-link to="/"><font-awesome-icon icon="fa-regular fa-user"/></router-link>
                <router-link to="/" v-if="!collapsed">Foydalanuvchi qo'shish</router-link>
            </div>

            <div class="nav-item">
                <router-link to="/companies"><font-awesome-icon icon="fa-solid fa-house"/></router-link>
                <router-link to="/companies" v-if="!collapsed">Kompaniyalar</router-link>
            </div>

            <div class="nav-item">
                <router-link to="/clients"><font-awesome-icon icon="fa-solid fa-users"/></router-link>
                <router-link to="/clients" v-if="!collapsed">Mijozlar</router-link>
            </div>

            <hr>

            <div class="nav-item">
                <font-awesome-icon icon="fa-solid fa-ellipsis"/>
                <a href="#" v-if="!collapsed">Sozlamalar</a>
            </div>

            <div class="nav-item toggle">
                <font-awesome-icon
                    icon="fa-solid fa-sliders"
                    :class="{ 'rotate-180': collapsed }"
                    class="collapse-icon"
                    @click="toggleSidebar"
                />
                <a href="#" @click="toggleSidebar" v-if="!collapsed">Menyuni yopish</a>
            </div>
        </div>
    </div>
</template>

<script>
import { useWindowResize, collapsed, toggleSidebar, sidebarWidth } from "@/plugins/state";

export default {
    name: "SideBar",
    setup() {
        useWindowResize()
        return { collapsed, toggleSidebar, sidebarWidth}
    }
}
</script>

<style scoped>

.sidebar {
    transition: 0.3s ease;
    height: 100vh;
    box-shadow: 6px 0 18px rgba(0,0,0,0.06);
}

.logo h3{
    padding: 1rem;
    font-family: 'Open Sans', sans-serif;
    color: #109CF1;
}


.profile {
    width: 100%;
    display: flex;
    padding: 0 1rem;
    align-items: center;
    gap: 15px;
    margin-top: 30px;
}

.profile-info {
    position: relative;
    font-family: 'Poppins', sans-serif;
    top: 8px;
}

.profile-info h4 {
    font-size: 14px;
    font-weight: bold;
    color: #192A3E;
}

.profile-info p {
    color: #707683;
    font-size: 11px;
}

.navigation {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
}

.nav-item {
    width: 100%;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

.nav-item a {
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
    font-size: 13px;
    color: #334D6E;
    user-select: none;
}

.user {
    position: relative;
    left: 2px;
}

.toggle {
    position: absolute;
    bottom: 15px;
}

.collapse-icon {
    transition: 0.2s linear;
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
}

</style>