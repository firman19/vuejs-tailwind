import Vue from "vue";
import Vuex from "vuex";

// Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      id: "",
      name: "",
    },
    user_id:"",
    name:""
  },

  getters: {
    user(state) {
      // return state.user;
      const str = JSON.stringify(state.user);
      return JSON.parse(str);
    },
    user_id(state) {
      return state.user_id;
    },
    name(state) {
      return state.name;
    },
  },

  actions: {
    user_id(context, data) {
      context.commit("user_id", data);
    },
    name(context, data) {
      context.commit("name", data);
    },
  },

  mutations: {
    user(state, data) {
      state.user = data;
    },
    user_id(state, data) {
      state.user_id = data;
    },
    name(state, data) {
      state.name = data;
    },
  },
});

export default store;
