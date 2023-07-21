<template>
    <!-- Container boshlandi -->
    <div class="container-fluid d-flex p-0">
            <!-- Sidebar boshlandi -->
            <SideBar />
            <!-- Sidebar tugadi -->
            <!-- Content boshlandi -->
            <router-view class="main"></router-view>
    </div>
    <!-- Container tugadi -->
</template>

<script>
import SideBar from "@/components/SideBar";

export default {
  name: 'App',
  components: {
        SideBar,
  }
}
</script>

<style>
.main {
    width: 100%;
    padding: 1rem;
}
</style>
