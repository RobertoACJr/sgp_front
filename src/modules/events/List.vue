<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(event, key) in events"
        :key="key"
        md="4"
      >
        <CardEvent
          :event-title="event.title"
          @click="goToEvent(event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import CardEvent from '@/modules/events/components/CardEvent.vue';

export default defineComponent({
  name: 'ListEvents',
  components: {
    CardEvent,
  },
  data: () => ({
    events: [
      { title: 'primeiro evento' },
      { title: 'segundo evento' },
      { title: 'terceiro evento' },
      { title: 'quarto evento' },
      { title: 'quinto evento' },
    ],
  }),
  methods: {
    ...mapMutations('events', [
      'currentEvent',
    ]),
    goToEvent(event) {
      this.currentEvent(event);
      this.$router.push({ name: 'showEvent' });
    },
  },
});
</script>
