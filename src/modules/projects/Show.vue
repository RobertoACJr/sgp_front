<template>
  <v-container>
    <div
      class="text-h3 heading-3 mb-5"
    >
      {{ getCurrentProject.name }}
    </div>
    <v-row v-if="getIsAdmin">
      <v-col :md="12">
        <v-table
          fixed-header
          height="500px"
        >
          <thead>
            <tr>
              <th class="text-left">
                Nome do Avaliador
              </th>
              <th class="text-left">
                Nota
              </th>
              <th class="text-left">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(evaluation, index) in evaluations"
              :key="index"
              :class="{'inactive': !evaluation.active}"
              @click="goToProject(evaluation)"
            >
              <td>{{ evaluation.evaluator_name }}</td>
              <td>{{ evaluation.score }}</td>
              <td>
                <v-btn
                  icon
                  :color="evaluation.active ? 'tertiary' : 'primary'"
                  :title="evaluation.active ? 'Desativar Avaliação' : 'Ativar Avaliação'"
                  variant="tonal"
                >
                  <v-icon
                    :color="evaluation.active ? 'tertiary' : 'primary'"
                  >
                    {{ evaluation.active ? 'mdi-close-circle-outline' : 'mdi-checkbox-marked-circle-outline' }}
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col :md="12">
        <v-pagination
          :value="currentPage"
          :length="lenghtOfPages"
          rounded="circle"
          @update:model-value="getProjectsByPage"
        />
      </v-col>
    </v-row>
    <v-btn 
      block
      class="mt-8"
      color="tertiary"
      size="large"
      variant="tonal"
      :to="{ name: 'rateProject' }"
    >
      Avaliar Projeto
    </v-btn>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';


// TODO informações da avaliação
export default defineComponent({
  name: 'ShowProject',
  data: () => ({
    loading: false,
    evaluations: [
      { evaluator_name: 'Pipipi popopo', score: 5.5, active: true },
      { evaluator_name: 'outro nome', score: 3.5, active: true },
      { evaluator_name: 'palminha um', score: 8.5, active: true },
      { evaluator_name: 'huguinho rei delas', score: 6.7, active: true },
      { evaluator_name: 'tonin n toma banho', score: 9.6, active: false },
      { evaluator_name: 'projeto dos projetos', score: 5.5, active: true },
      { evaluator_name: 'algum nome', score: 3.5, active: true },
      { evaluator_name: 'algum outro nome', score: 8.5, active: true },
      { evaluator_name: 'mais um nome', score: 5.4, active: true },
      { evaluator_name: 'n tenho mais ideia', score: 9.6, active: true },
      { evaluator_name: 'acabou a criatividade', score: 5.5, active: true },
      { evaluator_name: 'mas o tonin n toma banho mesmo', score: 3.5, active: false },
      { evaluator_name: 'fiiuu, e o pix?', score: 8.5, active: true },
      { evaluator_name: 'Kaizoku ore wa naru', score: 9.8, active: true },
      { evaluator_name: 'Pipipi popopo', score: 9.6, active: true },
    ],
  }),
  computed: {
    ...mapGetters('permissions', [
      'getIsAdmin',
    ]),
    ...mapGetters('projects', [
      'getCurrentProject',
    ])
  },
  methods: {
  },
});
</script>

<style lang="scss" scoped>
.inactive {
  background-color: rgb(var(--v-theme-light_gray));
}
</style>
