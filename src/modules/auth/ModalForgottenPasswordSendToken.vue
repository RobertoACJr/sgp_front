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
              <v-text-field
                v-model="email"
                label="E-mail"
                :error-messages="getEmailErrors"
              />
            </v-col>

            <v-col
              cols="12"
            >
              <v-text-field
                v-model="token"
                label="Token"
                name="token"
                maxlength="5"
                minlength="5"
                :error-messages="getTokenErrors"
              />
            </v-col>

            <v-col
              cols="12"
            >
              <v-text-field
                v-model="password"
                label="Senha"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="getPasswordErrors"
                @click:append-inner="showPassword = !showPassword"
              />
            </v-col>

            <v-col
              cols="12"
            >
              <v-text-field
                v-model="verifyPassword"
                label="Repetir a senha"
                :type="showVerifyPassword ? 'text' : 'password'"
                :append-inner-icon="showVerifyPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="getVerifyPasswordErrors"
                @click:append-inner="showVerifyPassword = !showVerifyPassword"
              />
              <button
                class="text-blue text-decoration-none text-center mt-2"
                href="#"
                rel="noopener noreferrer"
                @click="openForgottenPasswordGetToken"
              >
                Não possui token?
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

import { reactive, computed } from 'vue';
import { required, minLength, email, sameAs } from '@vuelidate/validators';

export default {
  name: "ModalGetTokenForgottenPassword",

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    }
  },

  emits: [
    "user-without-token",
    "close"
  ],

  setup () {
    const state = reactive({
      email: '',
      token: '',
      password: '',
      verifyPassword: '',
    })

    const password = computed(() => state.password);

    const rules = {
      email: {
        required,
        email
      },
      token: {
        required,
      },
      password: {
        required,
        min: minLength(6)
      },
      verifyPassword: {
        required,
        sameAs: sameAs(password)
      },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },

  data: () => ({
    requiredMessage: "O campo é obrigatório 😿",
    loading: false,
    showPassword: false,
    showVerifyPassword: false,
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
    token: {
      get () {
        return this.state.token;
      },
      set (value) {
        this.state.token = value
      }
    },
    password: {
      get () {
        return this.state.password;
      },
      set (value) {
        this.state.password = value
      }
    },
    verifyPassword: {
      get () {
        return this.state.verifyPassword;
      },
      set (value) {
        this.state.verifyPassword = value
      }
    },
    getEmailErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.email.required.$invalid && errors.push(this.requiredMessage);
      this.v$.email.email.$invalid && errors.push("Email inválido");
      return errors;
    },
    getTokenErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.token.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },
    getPasswordErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.password.required.$invalid && errors.push(this.requiredMessage);
      this.v$.password.min.$invalid && errors.push("Mínimo de seis caracteres");
      return errors;
    },
    getVerifyPasswordErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.verifyPassword.required.$invalid && errors.push(this.requiredMessage);
      this.v$.verifyPassword.sameAs.$invalid && errors.push("As senhas não coincidem");
      return errors;
    },
    getParams() {
      return {
        email: this.email,
        token: this.token,
        new_password: this.password,
        confirm_new_password: this.verifyPassword
      }
    },
  },

  methods: {
    async handleForgottenPassword () {
      this.v$.$touch()
      if (this.v$.$invalid) return;
      await this.sendToken();
    },
    async sendToken () {
      try {
        this.loading = true;
        await authService.forgottenPasswordSendToken(this.getParams);
        this.close();
      } finally {
        this.loading = false;
      }
    },
    openForgottenPasswordGetToken() {
      this.$emit("user-without-token")
    },
    close() {
      this.$emit("close");
    }
  },
}
</script>
