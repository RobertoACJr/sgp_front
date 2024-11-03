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
    verifyPermission ({ getters }, { permission, module }) {
      return Boolean(Object.keys(getters.getPermissions?.length || 0)) &&
        getters.getPermissions[module] &&
        Boolean(getters.getPermissions[module].includes(permission))
    },
    verifyRoutePermission ({ dispatch }, to) {
      return !to.meta?.permission || dispatch('verifyPermission', {
        permission: to.meta.permission,
        module: to.meta.mainModule
      })
    },
  },
}
