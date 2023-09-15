<template>
  <v-container>
    <div
      class="text-h3 heading-3 mb-5"
    >
      {{ getCurrentProject.name }}
    </div>
    <v-form
      v-model="isFormValid"
      @submit.prevent="sendForm"
    >
      <v-row>
        <v-col
          v-for="(criterion, i) in criteria"
          :key="i"
          xl="6"
          md="12"
        >
          <div
            class="text-h5 heading-5 mb-3"
          >
            {{ criterion.title }}
          </div>
          <v-row>
            <v-col
              v-for="(evaluation, j) in criterion.sub_criteria"
              :key="j"
              md="6"
            >
              {{ evaluation.question }}{{ evaluation.required ? " *" : "" }}
              <v-text-field
                :value="evaluation.score"
                label=""
                height="5"
                type="number"
                editable
                persistent-hint
                outline
                :rules="[
                  v => evaluation.required && !v ? 'O campo é obrigatório' : true,
                  v => v > 10 ? 'A nota não pode ser maior que 10' : true,
                  v => v < 0 ? 'A nota não pode ser menor que 0' : true,
                ]"
                @update:model-value="(d) => evaluation.score = `${d}`.replace(',', '.')"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col :md="12">
          <v-btn
            type="submit"
            block
            class="mt-8"
            color="primary"
            size="large"
            variant="tonal"
          >
            Avaliar Projeto
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'RateProject',
  data: () => ({
    requiredMessage: "O campo é obrigatório",
    isFormValid: false,
    loading: false,
    criteria: [
      {
        title: 'projeto',
        sub_criteria: [
          {
            id: 1,
            question: 'O projeto é um projeto?',
            required: true,

            score: null,
          }
        ]
      },
      {
        title: 'em caminho de paka...',
        sub_criteria: [
          {
            id: 2,
            question: 'o tatu caminha dentro?',
            required: true,

            score: null,
          },
          {
            question: 'se o caminho é..sim',
            id: 3,
            required: true,

          },
        ]
      },
    ],
  }),

  computed: {
    ...mapGetters('projects', [
      'getCurrentProject',
    ])
  },

  methods: {
    sendForm() {
      debugger;
      if (!this.isFormValid) return;
      debugger;
    },
  },
}
</script>

<style>

</style>