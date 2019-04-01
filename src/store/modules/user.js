const user = {
  state: {
    uid: '',
    loginType: ''
  },

  mutations: {
    SET_UID: (state, id) => {
      state.userId = id
    },
    SET_TYPE: (state, loginType) => {
      state.loginType = loginType
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const uid = userInfo.uid.trim()
      const type = userInfo.type.trim()
      commit('SET_UID', uid)
      commit('SET_TYPE', type)
    }
  }
}

export default user
