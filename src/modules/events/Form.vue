<template>
  <v-container
    class="create-event-container"
  >
    <div
      class="text-h6 heading-6 mb-5"
    >
      {{ isEditing ? "Editando evento" : "Cadastro de Eventos" }}
    </div>
    <loading
      v-if="loading"
      :text="loadingText"
    />
    <v-card
      v-else
      class="mx-auto pa-6 pb-8 create-event-container__card"
      elevation="8"
      rounded="lg"
    >
      <v-form
        v-model="v$.$invalid"
        @submit.prevent="handleSaveEvent"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="state.description"
              name="title"
              label="Titulo"
              :error-messages="getDescriptionErrors"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-date-input
              v-model="state.startDate"
              label="Data de ínicio"
              placeholder="DD/MM/AAAA"
              autocomplete="new-password"
              name="start_date"
              :min="getStartDateMinDate"
              :error-messages="getStartDateErrors"
              prepend-icon=""
              @update:model-value="() => state.endDate = null"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              :model-value="state.startTime"
              label="Horário de início"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
            >
              <v-dialog
                v-model="showDialogStartTime"
                activator="parent"
                width="auto"
              >
                <v-time-picker
                  v-model="state.startTime"
                  format="24hr"
                  color="green-darken-2"
                />
              </v-dialog>
            </v-text-field>
          </v-col>
          <v-col
            v-if="state.startDate"
            cols="12"
            sm="6"
          >
            <v-date-input
              v-model="state.endDate"
              label="Data de Encerramento"
              placeholder="DD/MM/AAAA"
              autocomplete="new-password"
              name="end_date"
              :min="getEndDateMinDate"
              :error-messages="getEndDateErrors"
              prepend-icon=""
            />
          </v-col>
          <v-col
            v-if="state.startDate"
            cols="12"
            sm="6"
          >
            <v-text-field
              :model-value="state.endTime"
              label="Horário de Fim"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
            >
              <v-dialog
                v-model="showDialogEndTime"
                activator="parent"
                width="auto"
              >
                <v-time-picker
                  v-model="state.endTime"
                  format="24hr"
                  color="green-darken-2"
                />
              </v-dialog>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col cols="6" />
          <v-col
            cols="6"
          >
            <v-btn
              block
              color="primary"
              size="large"
              variant="tonal"
              type="submit"
            >
              {{ isEditing ? "Salvar" : "Cadastrar" }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import * as eventsService from '@/modules/events/services/events.service.js';

import { reactive } from 'vue';
import { required } from '@vuelidate/validators';
import { VDateInput } from 'vuetify/labs/VDateInput'
import { mapGetters } from 'vuex';

export default {
  name: 'CreateEvents',

  components: {
    VDateInput,
  },

  props: {
    isEditing: {
      type: Boolean,
      default: false,
    }
  },

  setup () {
    const state = reactive({
      description: '',
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
    })

    const rules = {
      description: { required },
      startDate: { required },
      startTime: { required },
      endDate: { required },
      endTime: { required },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },

  data: () => ({
    requiredMessage: "O campo é obrigatório",
    showDialogStartTime: false,
    showDialogEndTime: false,
    loading: false,
    loadingText: "",
  }),

  computed: {
    ...mapGetters("events", [
      "getCurrentEvent"
    ]),

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
        initial_date: this.getFormatedDateTime(this.state.startDate, this.state.startTime),
        final_date: this.getFormatedDateTime(this.state.endDate, this.state.endTime)
      }
    },
  },

  mounted() {
    this.isEditing && this.handleSetEventData()
  },

  methods: {
    getFormatedDate (date) {
      let DATE = new Date(date)
      return DATE.toISOString().split('T')[0]
    },

    getFormatedDateTime(date, time) {
      return `${this.getFormatedDate(date)} ${time}:00`
    },

    getDateFromDateTime(dateTime) {
      const [datePart] = dateTime.split(' ');
      const [year, month, day] = datePart.split('-');

      const date = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );

      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    },

    getTimeFromDateTime(dateTime) {
      const timePart = dateTime.split(' ')[1];
      const [hour, minute] = timePart.split(':');

      return `${hour}:${minute}`;
    },

    handleSetEventData() {
      this.state.description = this.getCurrentEvent?.description || ""
      this.state.startDate = this.getDateFromDateTime(this.getCurrentEvent?.initial_datetime)
      this.state.startTime = this.getTimeFromDateTime(this.getCurrentEvent?.initial_datetime)
      this.state.endDate = this.getDateFromDateTime(this.getCurrentEvent?.final_datetime)
      this.state.endTime = this.getTimeFromDateTime(this.getCurrentEvent?.final_datetime)
    },

    async handleSaveEvent() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        return;
      }

      if (this.isEditing) {
        return this.updateEvent();
      }
      await this.saveEvent();
    },

    async saveEvent () {
      try {
        this.loading = true;
        this.loadingText = "Salvando dados..."
        await eventsService.create(this.getParams);
        this.$router.push({ name: "listEvents" })
      } finally {
        this.loading = false;
      }
    },

    async updateEvent () {
      try {
        this.loading = true;
        this.loadingText = "Atualizando dados do evento..."
        await eventsService.update(this.getCurrentEvent.uuid, this.getParams);
        this.$router.push({ name: "showEvent" })
      } finally {
        this.loading = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
