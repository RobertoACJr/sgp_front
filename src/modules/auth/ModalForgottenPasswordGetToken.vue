<template>
  <div class="text-center pa-4">
    <loading
      v-if="loading"
    />
    <v-dialog
      v-model="isModalOpen"
      max-width="400"
    >
      <v-card
        prepend-icon="mdi-account-key"
        title="Esqueceu a senha?"
      >
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
            >
              Digite o E-mail relacionado à conta
              <v-text-field
                v-model="email"
                label="E-mail"
                :error-messages="getEmailErrors"
              />
              <button
                class="text-blue text-decoration-none text-center mt-2"
                href="#"
                rel="noopener noreferrer"
                @click="openForgottenPasswordSendToken"
              >
                Já possui token?
              </button>
            </v-col>
          </v-row>
        </v-card-text>
        <template #actions>
          <v-spacer />
          <v-btn @click="handleForgottenPassword">
            Enviar
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import * as authService from '@/modules/auth/services/auth.service.js';

import { reactive } from 'vue';
import { email, required } from '@vuelidate/validators';

export default {
  name: "ModalGetTokenForgottenPassword",

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    }
  },

  emits: [
    "user-with-token",
    "close"
  ],

  setup () {
    const state = reactive({
      email: '',
    })
    const rules = {
      email: {
        required,
        email
      },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },

  data: () => ({
    requiredMessage: "O campo é obrigatório 😿",
    loading: false,
  }),

  computed: {
    isModalOpen: {
      get () {
        return this.isOpen && !this.loading;
      },
      set () {
        this.close()
      }
    },
    email: {
      get () {
        return this.state.email;
      },
      set (value) {
        this.state.email = value
      }
    },
    getEmailErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.email.required.$invalid && errors.push(this.requiredMessage);
      this.v$.email.email.$invalid && errors.push("Email inválido");
      return errors;
    },
    getParams() {
      return {
        email: this.email,
      }
    },
  },

  methods: {
    async handleForgottenPassword () {
      this.v$.$touch()
      if (this.v$.$invalid) return;
      await this.getToken();
    },
    async getToken () {
      try {
        this.loading = true;
        await authService.forgottenPasswordGetToken(this.getParams);
        this.close();
      } finally {
        this.loading = false;
      }
    },
    openForgottenPasswordSendToken() {
      this.$emit("user-with-token")
    },
    close() {
      this.$emit("close");
    }
  },
}
</script>
