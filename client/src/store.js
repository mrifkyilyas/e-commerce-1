import Vue from "vue";
import Vuex from "vuex";
import axios from "@/api/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    role: '',
    isLogin: false,
    name: '',
    allProducts: [],
  },
  mutations: {
    setUserStatus(state, payload) {
      state.role = payload.role,
        state.isLogin = payload.status
      state.name = payload.name
    },
    postProduct(state, payload) {
      state.allProducts = payload.data.reverse()
      

    }

  },
  actions: {
    logout({ commit }) {
      localStorage.clear()
      commit("setUserStatus", {
        status: false,
        role: "",
      })
    },
    getProducts({ commit }) {
      axios
        .get("/product")
        .then(({ data }) => {

          commit("postProduct", {
            data
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
});
