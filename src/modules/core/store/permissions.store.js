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
    verifyPermission: (state) => ({ module, permission }) => {
      const HAS_PERMISSIONS = Boolean(Object.keys(state.permissions)?.length || 0)
      const HAS_PERMISSION_TO_MODULE = state.permissions[module] &&
        Boolean(state.permissions[module].includes(permission))
      return HAS_PERMISSIONS && HAS_PERMISSION_TO_MODULE
    },
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
    verifyRoutePermission ({ getters }, to) {
      return !to.meta?.permission ||
        getters.verifyPermission({
          permission: to.meta.permission,
          module: to.meta.mainModule
        })
    },
  },
}
