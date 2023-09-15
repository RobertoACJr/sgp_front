export default {
  namespaced: true,
  state: {
    permissions: {},
    role: {},
  },
  getters: {
    getPermissions: state => state.permissions,
    getRole: state => state.role,
    getIsAdmin: state => state.role?.is_admin,
  },
  mutations: {
    setPermissions(state, permissions) {
      state.permissions = permissions;
    },
    setRole(state, role) {
      state.role = role;
    },
  },
  actions: {
    verifyPermission({ getters }, to) {
      if (to.meta?.permission) {
        return Boolean(Object.keys(getters.getPermissions?.length)) &&
          getters.getPermissions[to.meta.mainModule] &&
          Boolean(getters.getPermissions[to.meta.mainModule].includes(to.meta.permission))
      }
      return true;
    },
  },
}
