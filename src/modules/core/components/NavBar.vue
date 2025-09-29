<template>
  <v-app-bar
    v-if="getShowNavBar"
    color="light_primary"
    density="compact"
    title=""
    variant="text"
    class="d-flex"
  >
    <v-btn
      v-if="getHasViewToGoBack"
      icon
      :to="{ name: getHasViewToGoBack }"
    >
      <v-icon
        color="primary"
      >
        mdi-arrow-left-circle-outline
      </v-icon>
    </v-btn>
    <v-spacer />
    <div
      v-if="getUser?.name"
      class="user-name"
    >
      {{ getUser?.name?.split(" ")[0] }}
    </div>
    <v-app-bar-nav-icon
      class="align-self-end"
      @click="() => drawer = !drawer"
    />
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
  >
    <v-list
      density="compact"
      nav
    >
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Eventos"
        value="listEvents"
        @click="goTo('listEvents')"
      />
    </v-list>
    <v-list
      v-if="getCurrentEventName"
      class="mt-3"
      density="compact"
      nav
    >
      <v-list-item
        :title="`Evento: ${getCurrentEventName}`"
        disabled
      />
      <v-list-item
        v-for="({ icon, title, route }, index) in getAllowedMenus"
        :key="index"
        :prepend-icon="icon"
        :title="title"
        :value="route"
        @click="goTo(route)"
      />
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn
          block
          color="primary"
          variant="tonal"
          @click="logout"
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "NavBar",

  data: () => ({
    drawer: false,
  }),

  computed: {
    ...mapGetters([
      'getShowNavBar',
      'getHasViewToGoBack',
    ]),
    ...mapGetters('auth', [
      'getUser',
    ]),
    ...mapGetters('permissions', [
      'getAllowedMenus'
    ]),
    ...mapGetters("events", [
      "getCurrentEvent"
    ]),

    getCurrentEventName() {
      return this.getCurrentEvent?.description
    }
  },

  methods: {
    ...mapMutations('auth', [
      'reset',
    ]),
    goTo(name) {
      this.$router.push({ name });
    },
    logout() {
      this.reset();
      this.$router.push({ name: "login" });
    },
  },

}
</script>

<style lang="scss" scoped>
.user-name {
  margin-right: 10px;
}

.hide {
  display: none;
}
</style>