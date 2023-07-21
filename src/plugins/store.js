import { createStore } from "vuex";
import user from "@/plugins/vuex/user";
import company from "@/plugins/vuex/company";
import client from "@/plugins/vuex/client";

export default createStore({
    modules: {
        user,
        company,
        client
    }
})