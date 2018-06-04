const state = {
  collapsed: true
}

const mutations = {
  changeLayoutCollapsed (state, payload) {
    state.collapsed = payload
  }
}

const module = {
  namespaced: true,
  state,
  mutations
}

export default module
