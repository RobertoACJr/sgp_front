<template>
  <v-row justify="center">
    <v-dialog
      v-model="isModalOpen"
      persistent
      width="512"
    >
      <v-form
        v-model="isFormValid"
        @submit.prevent="verifyCode"
      >
        <v-card>
          <v-toolbar
            color="primary"
            :title="title"
          />
          <v-card-title>
            {{ text }}
          </v-card-title>
          <v-card-text>
            <v-text-field
              :value="code"
              label="Insira o código do Projeto"
              height="5"
              type="String"
              editable
              outline
              max="5"
              :rules="[
                v => v ? true : 'O campo é obrigatório',
              ]"
              @update:model-value="(d) => code = `${d}`.toUpperCase()"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              variant="tonal"
              type="submit"
            >
              Verificar
            </v-btn>
            <v-btn
              color="secondary"
              variant="text"
              @click="closeModal"
            >
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>

  <v-dialog
    v-model="showInvalidCodeWarning"
    width="256"
  >
    <v-card>
      <v-toolbar
        color="tertiary"
        class="text-center"
        title="Código Inválido"
      />
      <v-card-title
        class="text-center"
      >
        {{ invalidCodeMsg }}
      </v-card-title>
      <v-card-actions>
        <v-btn
          color="primary"
          variant="text"
          @click="closeModal"
        >
          Voltar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalValidateProjectCode",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    projectCode: {
      type: String,
      default: "",
    },
    invalidCodeMsg: {
      type: String,
      default: "Por favor verifique o nome do Projeto novamente",
    },
    title: {
      type: String,
      default: "Confirmação de Projeto",
    },
    text: {
      type: String,
      default: "Para confirmar que está no projeto correto, por favor, insira o código do projeto",
    },
    handleCodeValidation: {
      type: Function,
      default: null,
    }
  },
  emits: [
    "close",
    "is-valid",
  ],
  data: () => ({
    code: '',
    isFormValid: false,
    showInvalidCodeWarning: false,
  }),
  computed: {
    isModalOpen: {
      get() {
        return this.isOpen;
      },
      set() {
        this.closeModal()
      },
    },
  },
  methods: {
    verifyCode() {
      if (!this.isFormValid) return;
      if (this.handleCodeValidation) {
        this.handleCodeValidation(this.code.toUpperCase())
          .then(response => {
            this.showInvalidCodeWarning = response;
          });
      } else {
        if (this.code.toUpperCase() == this.projectCode.toUpperCase()) {
          this.$emit("is-valid")
        } else {
          this.showInvalidCodeWarning = true;
        }
      }
    },
    closeModal() {
      this.showInvalidCodeWarning = false;
      this.$emit("close");
    },
  },
}
</script>

<style lang="scss" scoped>
.v-card-title {
  white-space: wrap;
}
</style>
