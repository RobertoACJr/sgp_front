<template>
  <v-app>
    <v-app-bar
      v-if="getShowNavBar"
      color="light_primary"
      density="compact"
      title=""
      variant="text"
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
    </v-app-bar>
    <v-main>
      <v-container class="h-100">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
  <Toast />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Toast from './modules/core/components/Toast.vue';

export default {
  name: 'App',

  components: {
    Toast,
  },

  computed: {
    ...mapGetters([
      'getShowNavBar',
      'getHasViewToGoBack',
    ])
  },

  mounted() {
    this.$router.push({ name: "listEvents" });
  },

  methods: {
    ...mapActions("auth", ["isSigned"]),
  },
}
</script>
