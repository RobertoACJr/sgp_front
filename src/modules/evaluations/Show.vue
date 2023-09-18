<template>
  <v-container>
    <div
      class="text-h6 heading-6 mb-5"
    >
      {{ getCurrentProject.title }}
    </div>
    <v-row>
      <v-col
        cols="9"
        class="d-flex flex-column"
      >
        <div
          class="text-body-1 mb-3 font-weight-black"
        >
          Avaliador
        </div>
        {{ getEvaluation?.created_by || "" }}
        <v-btn
          :color="getEvaluation.active ? 'tertiary' : 'primary'"
          :title="getEvaluation.active ? 'Desativar Avaliação' : 'Ativar Avaliação'"
          width="fit-content"
          class="mt-3"
          variant="tonal"
        >
          <v-icon
            :color="getEvaluation.active ? 'tertiary' : 'primary'"
          >
            {{ getEvaluation.active ? 'mdi-close-circle-outline' : 'mdi-checkbox-marked-circle-outline' }}
          </v-icon>
          {{ getEvaluation.active ? 'Desativar Avaliação' : 'Ativar Avaliação' }}
        </v-btn>
      </v-col>
      <v-col
        class="d-flex align-center flex-column"
        cols="3"
      >
        <div
          class="text-body-1 mb-3 font-weight-black"
        >
          Média
        </div>
        <v-progress-circular
          v-model="getProgressValue"
          class="mb-3"
          :size="100"
          :width="10"
          :color="getProgressColor"
        >
          {{ getCurrentProject?.average }}
        </v-progress-circular>
        <p>avaliações: {{ getCurrentProject?.evaluations?.length || "não avaliado" }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        md="12"
        sm="12"
      >
        <div
          class="text-body-1 mb-3 font-weight-black"
        >
          Critários Avaliados
        </div>
        <v-table
          v-if="getEvaluation?.criterion"
          fixed-header
          height="fit-content"
        >
          <thead>
            <tr>
              <th class="text-left text-h6 heading-6">
                Critério
              </th>
              <th class="text-left text-h6 heading-6">
                Pergunta
              </th>
              <th class="text-center text-h6 heading-6">
                Nota
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(key, i) in Object.keys(getEvaluation?.criterion)"
              :key="i"
            >
              <tr>
                <td class="font-weight-black">
                  {{ getEvaluation?.criterion[key][0].criterion_description }}
                </td>
                <td />
                <td />
              </tr>
              <tr
                v-for="(criterion, j) in getEvaluation?.criterion[key]"
                :key="j"
              >
                <td />
                <td class="text-body-2">
                  {{ criterion.question }}
                </td>
                <td class="text-body-2 text-center">
                  {{ criterion.score }}
                </td>
              </tr>
            </template>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'ShowEvaluations',
  computed: {
    ...mapGetters('projects', [
      'getCurrentProject',
      'getCurrentEvaluation',
    ]),
    getProgressColor() {
      if (this.getCurrentProject.average < 6) return 'tertiary';
      else if (this.getCurrentProject.average < 8) return 'warning';
      return 'success';
    },
    getProgressValue() {
      return parseInt(this.getCurrentProject?.average) * 10;
    },
    getEvaluation() {
      return this.getCurrentEvaluation;
    },
  },
  beforeUnmount() {
    this.setCurrentProjectEvaluationIndex(null);
  },
  methods: {
    ...mapMutations('projects', [
      'setCurrentProjectEvaluationIndex'
    ]),
  }
});
</script>
