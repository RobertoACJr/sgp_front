<template>
  <v-container>
    <div
      class="text-h6 heading-6 mb-5"
    >
      Lista de Eventos
    </div>
    <loading
      v-if="loading"
    />
    <v-row
      v-else-if="events.length"
    >
      <v-col
        v-for="(event, key) in events"
        :key="key"
        cols="12"
        md="4"
        sm="6"
      >
        <CardEvent
          :event-title="event.text"
          @click="goToEvent(event)"
        />
      </v-col>
    </v-row>
    <div
      v-else
      class="no-content"
    >
      Nenhum Evento Encontrado
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import * as eventsService from '@/modules/events/services/events.service.js';
import CardEvent from '@/modules/events/components/CardEvent.vue';

export default defineComponent({
  name: 'ListEvents',
  components: {
    CardEvent,
  },
  data: () => ({
    loading: true,
    events: [],
  }),
  computed: {
    ...mapGetters("auth", [
      "getUserUuid",
    ])
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    ...mapMutations("events", ["setCurrentEvent"]),
    getEvents() {
      eventsService.list({ userUuid: this.getUserUuid })
        .then(({ data }) => {
          this.events = data;
        })
        .catch(() => {
          // TODO
          // algum tratamento
        })
        .finally(() => {
          this.loading = false;
        })
    },
    goToEvent (event) {
      this.setCurrentEvent(event);
      this.$router.push({ name: 'showEvent' });
    },
  },
});
</script>

<style lang="scss" scoped>
.no-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
