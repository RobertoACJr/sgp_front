<template>
  <v-container
    class="create-knowledge-area-container"
  >
    <div
      class="text-h6 heading-6 mb-5"
    >
      Cadastro de Área do Conhecimento
    </div>
    <loading
      v-if="loading"
    />
    <v-card
      v-else
      class="mx-auto pa-6 pb-8 create-knowledge-area-container__card"
      elevation="8"
      rounded="lg"
    >
      <v-row>
        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="prefix"
            label="Prefixo"
            placeholder="Ex: MDIS"
            :error-messages="getPrefixErrors"
          />
        </v-col>
        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="state.description"
            label="Descrição"
            placeholder="Ex: Multidisciplinar"
            :error-messages="getDescriptionErrors"
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
            @click="handleSaveKnowledgeArea"
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
import * as knowledgeAreaService from '@/modules/knowledgeArea/services/knowledgeArea.service.js';

import { reactive } from 'vue';
import { required } from '@vuelidate/validators';

export default {
  name: 'CreateKnowledgeArea',
  setup () {
    const state = reactive({
      description: '',
      startDate: null,
      endDate: null,
    })
    const rules = {
      prefix: { required },
      description: { required },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },
  data: () => ({
    requiredMessage: "O campo é obrigatório",
    loading: false,
  }),

  computed: {
    prefix: {
      get () {
        return this.state.prefix;
      },
      set (value) {
        this.state.prefix = `${value}`.toUpperCase();
      }
    },
    getPrefixErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.prefix.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },
    getDescriptionErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.description.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },
    getParams () {
      return {
        prefix: this.state.prefix,
        description: this.state.description,
      }
    },
  },

  methods: {
    async handleSaveKnowledgeArea() {
      this.v$.$touch()
      if (this.v$.$invalid) return;
      await this.saveKnowledgeArea();
        this.$router.push({ name: "listEvents" }) //TODO mudar para lista de areas do co
    },
    async saveKnowledgeArea () {
      try {
        this.loading = true;
        await knowledgeAreaService.create(this.getParams);
      } finally {
        this.loading = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
