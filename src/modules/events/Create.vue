<template>
  <v-container
    class="create-event-container"
  >
    <div
      class="text-h6 heading-6 mb-5"
    >
      Cadastro de Eventos
    </div>
    <loading
      v-if="loading"
    />
    <v-card
      v-else
      class="mx-auto pa-12 pb-8 create-event-container__card"
      elevation="8"
      rounded="lg"
    >
      <v-row>
        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="state.description"
            label="Titulo"
            :error-messages="getDescriptionErrors"
          />
        </v-col>
        <v-col
          cols="12"
          lg="6"
        >
          <v-date-input
            v-model="state.startDate"
            label="Data de ínicio"
            :min="getStartDateMinDate"
            :error-messages="getStartDateErrors"
            prepend-icon=""
            @update:model-value="() => state.endDate = null"
          />
        </v-col>
        <v-col
          v-if="state.startDate"
          cols="12"
          lg="6"
        >
          <v-date-input
            v-model="state.endDate"
            label="Data de Encerramento"
            :min="getEndDateMinDate"
            :error-messages="getEndDateErrors"
            prepend-icon=""
          />
        </v-col>
        <v-col
          cols="6"
        >
          <v-btn
            block
            color="primary"
            size="large"
            variant="tonal"
            @click="handleSaveEvent"
          >
            Cadastrar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import * as eventsService from '@/modules/events/services/events.service.js';

import { reactive } from 'vue';
import { required } from '@vuelidate/validators';
import { VDateInput } from 'vuetify/labs/VDateInput'

export default {
  name: 'CreateEvents',
  components: {
    VDateInput,
  },
  setup () {
    const state = reactive({
      description: '',
      startDate: null,
      endDate: null,
    })
    const rules = {
      description: { required },
      startDate: { required },
      endDate: { required },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },
  data: () => ({
    requiredMessage: "O campo é obrigatório",
    loading: false,
  }),

  computed: {
    getDescriptionErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.description.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },
    getStartDateErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.startDate.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },
    getEndDateErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.endDate.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },
    getStartDateMinDate () {
      const MIN_DATE = new Date();
      MIN_DATE.setDate(MIN_DATE.getDate() - 1);
      return this.getFormatedDate(MIN_DATE);
    },
    getEndDateMinDate () {
      const MIN_DATE = new Date(this.state.startDate);
      return this.getFormatedDate(MIN_DATE);
    },
    getParams () {
      return {
        description: this.state.description,
        initial_date: this.getFormatedDate(this.state.startDate),
        final_date: this.getFormatedDate(this.state.endDate)
      }
    },
  },

  methods: {
    getFormatedDate (date) {
      const DATE = new Date(date);
      return DATE.toISOString().split('T')[0];
    },
    async handleSaveEvent() {
      this.v$.$touch()
      if (this.v$.$invalid) return;
      await this.saveEvent();
    },
    async saveEvent () {
      try {
        this.loading = true;
        await eventsService.create(this.getParams);
      } finally {
        this.loading = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
