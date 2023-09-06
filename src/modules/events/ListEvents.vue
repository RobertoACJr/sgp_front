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
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import CardEvent from '@/modules/events/components/CardEvent.vue';

export default defineComponent({
  name: 'ListEvents',
  data: () => ({
    events: [
      { title: 'primeiro evento' },
      { title: 'segundo evento' },
      { title: 'terceiro evento' },
      { title: 'quarto evento' },
      { title: 'quinto evento' },
    ],
  }),
  components: {
    CardEvent,
  },
});
</script>
