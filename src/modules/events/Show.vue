<template>
  <v-container>
    <loading
      v-if="loading"
    />
    <div
      v-else
      class="show-event-container"
    >
      <div class="title elevation-4">
        <v-img
          :src="require('@/assets/WallpaperIFMS.png')"
          class="img align-end"
          height="350px"
          cover
        >
          {{ getCurrentEvent.text }}
        </v-img>
      </div>

      <v-row>
        <v-col
          v-for="({ icon, title, route }, index) in getAllowedMenus"
          :key="index"
          cols="12"
          md="6"
          lg="4"
        >
          <div
            class="item elevation-4"
            @click="goTo(route)"
          >
            <v-icon
              class="icon"
              :icon="icon"
            />
            <h3>
              {{ title }}
            </h3>
          </div>
        </v-col>
      </v-row>
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
    ...mapGetters('permissions', [
      'getAllowedMenus',
      'getIsAdmin',
    ]),
    ...mapGetters("events", [
      "getCurrentEvent",
      "getShouldFetchEventPermissions"
    ]),
  },

  mounted() {
    this.shouldFetchEventPermissions() && this.getEventPermissions();
  },

  methods: {
    ...mapMutations("events", [
      "setShouldFetchEventPermissions"
    ]),

    handlePermissions() {
      if (!this.getIsAdmin && this.getShouldFetchEventPermissions) {
        this.$router.push({ name: "listProjects" })
      }
      this.setShouldFetchEventPermissions(false)
    },

    goTo(name) {
      this.$router.push({ name });
    },

    shouldFetchEventPermissions() {
      const HAS_CURRENT_EVENT = this.getCurrentEvent && Object.keys(this.getCurrentEvent)?.length
      return !HAS_CURRENT_EVENT || this.getShouldFetchEventPermissions
    },

    getEventPermissions() {
      this.loading = true
      eventsService.saveEventPermission({
        event_uuid: this.getCurrentEvent.value,
      })
        .then(() => {
          this.handlePermissions()
        })
        .finally(() => {          
          this.loading = false
        })
    },
  },
});
</script>

<style lang="scss" scoped>
.title {
  color: rgb(var(--v-theme-background));
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  border-radius: 8px;

  .img {
    border-radius: 8px;

    :deep() {
      .v-responsive__content {
        padding: 16px 32px;
        background: linear-gradient(90deg, rgb(var(--v-theme-primary)) 40%, transparent 100%) !important;
      }
    }
  }
}

.item {
  color: rgb(var(--v-theme-primary));
  display: flex;
  padding: 20px 16px;
  border-radius: 8px;
  gap: 16px;
  background-color: rgb(var(--v-theme-background));
  align-items: baseline;
  cursor: pointer;

  .icon {
    font-size: 64px;
  }

  .h4 {
    white-space: wrap;
  }

  &:hover {
    color: rgb(var(--v-theme-primary-darken-1));
    transform: scale(1.01);
  }
}
</style>