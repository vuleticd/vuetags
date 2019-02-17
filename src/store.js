import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [
    {
      "id": 1,
      "name": "Gogol",
      "feed": true,
      "favourite": false,
      "photo": "http://placehold.it/32x32",
      "type": "brown"
    },
    {
      "id": 2,
      "name": "Plutorque",
      "feed": true,
      "favourite": true,
      "photo": "http://placehold.it/32x32",
      "type": "ehoo"
    },
    {
      "id": 3,
      "name": "Magneato",
      "feed": true,
      "favourite": true,
      "photo": "http://placehold.it/32x32",
      "type": "bar"
    },
    {
      "id": 4,
      "name": "Darwinium",
      "feed": false,
      "favourite": false,
      "photo": "http://placehold.it/32x32",
      "type": "green"
    },
    {
      "id": 5,
      "name": "Bostonic",
      "feed": true,
      "favourite": true,
      "photo": "http://placehold.it/32x32",
      "type": "blah"
    },
    {
      "id": 6,
      "name": "Prowaste",
      "feed": false,
      "favourite": true,
      "photo": "http://placehold.it/32x32",
      "type": "trace"
    },
    {
      "id": 7,
      "name": "Veraq",
      "feed": true,
      "favourite": true,
      "photo": "http://placehold.it/32x32",
      "type": "fc"
    },
    {
      "id": 8,
      "name": "Venoflex",
      "feed": true,
      "favourite": true,
      "photo": "http://placehold.it/32x32",
      "type": "bar"
    },
    {
      "id": 9,
      "name": "Emtrac",
      "feed": false,
      "favourite": false,
      "photo": "http://placehold.it/32x32",
      "type": "blah"
    },
    {
      "id": 10,
      "name": "Codact",
      "feed": true,
      "favourite": true,
      "photo": "http://placehold.it/32x32",
      "type": "hugo"
    },
    {
      "id": 11,
      "name": "Toyletry",
      "feed": true,
      "favourite": false,
      "photo": "http://placehold.it/32x32",
      "type": "foo"
    },
    {
      "id": 12,
      "name": "Zenthall",
      "feed": true,
      "favourite": false,
      "photo": "http://placehold.it/32x32",
      "type": "trace"
    },
    {
      "id": 13,
      "name": "Andryx",
      "feed": false,
      "favourite": true,
      "photo": "http://placehold.it/32x32",
      "type": "trace"
    },
    {
      "id": 14,
      "name": "Entality",
      "feed": false,
      "favourite": true,
      "photo": "http://placehold.it/32x32",
      "type": "brown"
    },
    {
      "id": 15,
      "name": "Playce",
      "feed": false,
      "favourite": false,
      "photo": "http://placehold.it/32x32",
      "type": "hugo"
    },
    {
      "id": 16,
      "name": "Musanpoly",
      "feed": true,
      "favourite": false,
      "photo": "http://placehold.it/32x32",
      "type": "ehoo"
    },
    {
      "id": 17,
      "name": "Biotica",
      "feed": true,
      "favourite": false,
      "photo": "http://placehold.it/32x32",
      "type": "trace"
    },
    {
      "id": 18,
      "name": "Poshome",
      "feed": false,
      "favourite": true,
      "photo": "http://placehold.it/32x32",
      "type": "apple"
    },
    {
      "id": 19,
      "name": "Combot",
      "feed": false,
      "favourite": false,
      "photo": "http://placehold.it/32x32",
      "type": "blah"
    },
    {
      "id": 20,
      "name": "Portica",
      "feed": true,
      "favourite": false,
      "photo": "http://placehold.it/32x32",
      "type": "fc"
    }
  ],
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
