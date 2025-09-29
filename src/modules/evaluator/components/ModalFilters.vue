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
            <v-checkbox
              v-model="isApproved"
              label="Avaliadores Verificados"
              value="1"
            />
            <v-checkbox
              v-model="isApproved"
              label="Avaliadores Restringidos"
              value="0"
            />
            <v-text-field
              v-model="email"
              label="E-mail"
            />
            <v-select
              v-model="knowledgeArea"
              clearable
              chips
              label="Áreas do conhecimento"
              :menu-props="{ width: '250' }"
              :items="getKnowledgeAreasOptions"
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
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: "ModalFilters",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "close",
    "apply-filters",
    "set-filters",
  ],
  data: () => ({
    isFormValid: false,
    email: "",
    isApproved: null,
    knowledgeArea: [],
  }),
  computed: {
    ...mapGetters('evaluator', [
      'getFilterIsApproved',
      'getFilterEmail',
      'getFilterKnowledgeAreas',
    ]),
    ...mapGetters('knowledgeArea', [
      'getKnowledgeAreasOptions',
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
    this.fetchKnowledgeAreaOptionsIfNecessary()
    this.isApproved = this.getFilterIsApproved != null
      ? this.getFilterIsApproved ? 1 : 0
      : null;
    this.email = this.getFilterEmail;
    this.knowledgeArea = this.getFilterKnowledgeAreas;
  },
  methods: {
    ...mapMutations('evaluator', [
      'resetFilters',
    ]),
    ...mapActions('knowledgeArea', [
      'fetchKnowledgeAreaOptionsIfNecessary',
    ]),
    ...mapActions('evaluator', [
      'setFilters',
    ]),
    closeModal() {
      this.showInvalidCodeWarning = false;
      this.$emit("close");
    },
    applyFilters() {
      const filters = {
        isApproved: this.isApproved != null ? !!this.isApproved : null,
        email: this.email,
        knowledgeAreas: this.knowledgeArea?.length
          ? this.knowledgeArea.map(kArea => this.getKnowledgeAreasOptions
            .find(({ value }) => value == kArea))
          : null,
      };
      this.setFilters(filters);
      this.closeModal();
      this.$emit("apply-filters");
    },
    limparFiltros() {
      this.email = [];
      this.isApproved = [];
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
