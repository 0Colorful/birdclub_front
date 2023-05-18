import { createStore } from 'vuex'
import { getUUID } from '@/utils/uuid_token'

export default createStore({
  state: {
    uuid_token: getUUID(),
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
