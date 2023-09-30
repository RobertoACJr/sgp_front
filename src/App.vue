<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container class="h-100">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
  <Toast />
</template>

<script>
import Toast from '@/modules/core/components/Toast.vue';
import NavBar from '@/modules/core/components/NavBar.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'App',

  components: {
    Toast,
    NavBar,
  },

  mounted() {
    this.initializeStore();
  },

  methods: {
    ...mapMutations([
      'initializeStore',
    ])
  }
}
</script>
