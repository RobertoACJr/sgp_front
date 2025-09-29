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
  <ModalChangePassword />
</template>

<script>
import Toast from '@/modules/core/components/Toast.vue'
import NavBar from '@/modules/core/components/NavBar.vue'
import ModalChangePassword from '@/modules/auth/ModalChangePassword.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',

  components: {
    Toast,
    NavBar,
    ModalChangePassword,
  },

  computed: {
    ...mapGetters("events", [
      "getCurrentEvent",
    ]),

    shouldFetchEventPermissions() {
      return this.getCurrentEvent && Object.keys(this.getCurrentEvent)?.length
    },
  },

  mounted() {
    this.initializeStore()

    this.handleEvent()
  },
  
  methods: {
    ...mapMutations([
      'initializeStore',
    ]),
    ...mapMutations("events", [
      "setShouldFetchEventPermissions"
    ]),

    handleEvent() {
      if (this.shouldFetchEventPermissions) {
        this.setShouldFetchEventPermissions(true)
        this.$router.push({ name: 'showEvent' })
        return
      }

      this.$router.push({ name: "listEvents" })
    }
  }
}
</script>

<style lang="scss">
html {
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

html::-webkit-scrollbar {
  display: none; /* Chrome, Safari e Opera */
}

.v-main {
  background-color: #f6f6f6;
}

.v-table {
  border-radius: 8px !important;
}
</style>