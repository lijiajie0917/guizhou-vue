import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={
     projectId:'2',
   };
const mutations = {
  setprojectId(state, pId) {
    state.projectId= pId;
  },
}
const store = new Vuex.Store({
  state,
  mutations
});

export default store;
