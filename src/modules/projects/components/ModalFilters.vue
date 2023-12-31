<template>
  <v-row justify="center">
    <v-dialog
      v-model="isModalOpen"
      persistent
      width="512"
    >
      <v-form
        v-model="isFormValid"
        @submit.prevent="applyFilters"
      >
        <v-card>
          <v-toolbar
            color="primary"
            title="Selecione os filtros desejados"
          />
          <v-card-text>
            <v-select
              v-model="teachingLevel"
              clearable
              chips
              label="Nível de Ensino"
              :items="['Ensino Fundamental', 'Ensino Médio']"
              multiple
            />
            <v-select
              v-model="category"
              clearable
              chips
              label="Categoria do Projeto"
              :items="['Pesquisa Científica', 'Pesquisa Tecnológica']"
              multiple
            />
            <v-select
              v-model="knowledgeArea"
              clearable
              chips
              label="Áreas do conhecimento"
              :items="[
                'Ciências Biológicas e da Saúde',
                'Ciências Exatas e da Terra',
                'Ciências Humanas, Sociais Aplicadas e Linguística e Artes',
                'Ciências Agrárias e Engenharias',
                'Multidisciplinar'
              ]"
              multiple
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              variant="tonal"
              type="submit"
            >
              Filtrar
            </v-btn>
            <v-btn
              color="secondary"
              variant="text"
              @click="closeModal"
            >
              Cancelar
            </v-btn>
            <v-btn
              icon
              color="tertiary"
              title="Limpar Filtros"
              @click="limparFiltros"
            >
              <v-icon
                color="tertiary"
              >
                mdi-alpha-x-circle-outline
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: "ModalValidateProjectCode",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "close",
    "set-filters",
  ],
  data: () => ({
    isFormValid: false,
    category: [],
    knowledgeArea: [],
    teachingLevel: [],
  }),
  computed: {
    ...mapGetters('projects', [
      'getCategoryFilter',
      'getTeachingLevelFilter',
      'getKnowledgeAreaFilter',
    ]),
    isModalOpen: {
      get() {
        return this.isOpen;
      },
      set() {
        this.closeModal()
      },
    },
  },
  mounted() {
    this.category = this.getCategoryFilter;
    this.teachingLevel = this.getTeachingLevelFilter;
    this.knowledgeArea = this.getKnowledgeAreaFilter;
  },
  methods: {
    ...mapMutations('projects', [
      'setFilters',
      'resetFilters',
    ]),
    closeModal() {
      this.showInvalidCodeWarning = false;
      this.$emit("close");
    },
    applyFilters() {
      const filters = {
        category: this.category?.length ? this.category : null,
        teachingLevel: this.teachingLevel?.length ? this.teachingLevel : null,
        knowledgeArea: this.knowledgeArea?.length ? this.knowledgeArea : null,
      };
      this.setFilters(filters);
      this.$emit(
        'set-filters',
        [
          ...filters.category ? filters.category.map(f => ({ title: f, type: 'category' })) : [],
          ...filters.knowledgeArea ? filters.knowledgeArea.map(f => ({ title: f, type: 'knowledge_area' })) : [],
          ...filters.teachingLevel ? filters.teachingLevel.map(f => ({ title: f, type: 'teaching_level' })) : [],
        ]
      );
      this.closeModal();
    },
    limparFiltros() {
      this.category = [];
      this.teachingLevel = [];
      this.knowledgeArea = [];
      this.resetFilters();
      this.$emit('set-filters', []);
      this.closeModal();
    }
  },
}
</script>

<style lang="scss" scoped>
.white-space-initial {
  white-space: initial !important;
}
</style>
