import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [],
    types: [
      "Fudbalski klub",
      "Navijac"
    ],
    modalVisible: false,
    modalTag: null
  },
  mutations: {
    ADD_TAG (state, tag) {
      if (tag.id || state.tags.find((item) => item.id === tag.id)) return;
      let max = state.tags.length ? state.tags.reduce((prev, current) => (prev.id > current.id) ? prev : current) : {id: 0};
      tag.id = max.id + 1;
      state.tags.push(Object.assign({}, tag));
    },
    DELETE_TAG (state, id) {
      const idx = state.tags.findIndex((item) => item.id === id);
      state.tags.splice(idx, 1);
    },
    UPDATE_TAG (state, tag) {
      const idx = state.tags.findIndex((item) => item.id === tag.id);
      state.tags.splice(idx, 1, tag);
    },
    ADD_TYPE (state, type) {
      if (state.types.find((item) => item === type)) return;
      state.types.push(type);
    },
    SHOW_MODAL (state, tag) {
      state.modalVisible = true;
      if (tag == null) return;
      state.modalTag = tag;
    },
    HIDE_MODAL (state) {
      state.modalVisible = false;
      state.modalTag = null;
    }
  },
  actions: {
    addTag ({ commit }, tag) {
      commit('ADD_TAG', tag);
    },
    deleteTag ({ commit }, id) {
      commit('DELETE_TAG', id);
    },
    updateTag ({ commit }, tag) {
      commit('UPDATE_TAG', tag);
    },
    showModal ({ commit, state }, id) {
      const tag = state.tags.find((item) => item.id === id);
      commit('SHOW_MODAL', tag);
    },
    hideModal ({ commit }) {
      commit('HIDE_MODAL');
    }
  }
})
