<template>
  <v-container>
    <loading
      v-if="loading"
    />
    <div
      v-else
      class="show-event-container"
    >
      n sei o que botar aqui, mas serão algumas informações do evento, e uma op para ir até a listagem de projetos
      <v-btn 
        block
        class="mt-8"
        color="primary"
        size="large"
        variant="tonal"
        @click="() => $router.push({ name: 'listProjects' })"
      >
        por enquanto clique aqui para ver a lista de projetos
      </v-btn>
      <v-btn 
        block
        class="mt-8"
        color="tertiary"
        size="large"
        variant="tonal"
        @click="() => $router.push({ name: 'listEvents' })"
      >
        clique aqui para voltar
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

import * as eventsService from '@/modules/events/services/events.service.js';

export default defineComponent({
  name: 'ShowEvent',
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters("events", [
      "getCurrentEvent",
    ]),
  },
  mounted() {
    this.getEventPermissions();
  },
  methods: {
    ...mapMutations("permissions", [
      "setPermissions",
      "setRole"
    ]),

    getEventPermissions() {
      eventsService.saveEventPermission({
        event_uuid: this.getCurrentEvent.value,
      })
        .then(() => {
          this.$router.push({ name: "listProjects" });
        })
    },
  },
});
</script>
