<template>
  <v-container>
    <div
      class="text-h6 heading-6 mb-5 d-flex justify-space-between"
    >
      Lista de Eventos
      <div>
        <v-btn
          icon
          title="Recarregar Listagem"
          @click="() => getEvents(true)"
        >
          <v-icon
            color="secondary"
          >
            mdi-sync
          </v-icon>
        </v-btn>
        <v-btn
          v-if="getIsAdmin"
          icon
          title="Criar Evento"
          class="ml-3"
          @click="() => $router.push({ name: 'createEvent' })"
        >
          <v-icon color="primary">
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
    </div>
    <loading
      v-if="loading"
    />
    <v-row
      v-else-if="getListEvents.length"
    >
      <v-col
        v-for="(event, key) in getListEvents"
        :key="key"
        cols="12"
        md="4"
        sm="6"
      >
        <CardEvent
          :event-title="event.description"
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
  }),
  computed: {
    ...mapGetters('permissions', [
      'getIsAdmin',
    ]),
    ...mapGetters("auth", [
      "getUserUuid",
      "getToken"
    ]),
    ...mapGetters("events", [
      "getListEvents",
      "getCurrentEvent",
      "getShouldFetchEventPermissions"
    ]),
  },
  mounted() {
    if (this.getToken) {
      this.getEvents();
      this.reset();
    } else {
      this.$router.push({ name: "login" })
    }
  },
  methods: {
    ...mapMutations("events", [
      "setListEvents",
      "setCurrentEvent",
      "setShouldFetchEventPermissions"
    ]),
    ...mapMutations('projects', ['reset']),

    getEvents(refresh = false) {
      if (this.getListEvents?.length && !refresh) {
        this.loading = false;
        return
      }
      this.loading = true;

      eventsService.list({ userUuid: this.getUserUuid })
        .then(({ data }) => {
          this.setListEvents(data);
        })
        .finally(() => {
          this.loading = false;
        })
    },

    goToEvent(event) {
      const IS_SAME_EVENT = event.uuid == this.getCurrentEvent.uuid
      this.setCurrentEvent(event);
      this.setShouldFetchEventPermissions(!IS_SAME_EVENT || this.getShouldFetchEventPermissions);
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
