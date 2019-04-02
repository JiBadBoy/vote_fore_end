const user = {
  state: {
    uid: '0',
    loginType: ''
  },

  mutations: {
    SET_UID: (state, id) => {
      state.uid = id
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
      return new Promise((resolve, reject) => {
        commit('SET_UID', uid)
        commit('SET_TYPE', type)
        resolve()
      })
    }
  }
}

export default user
