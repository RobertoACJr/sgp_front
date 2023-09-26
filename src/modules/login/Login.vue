<template>
  <v-container class="login-container">
    <loading
      v-if="loading"
    />
    <v-card
      v-else
      class="mx-auto pa-12 pb-8 login-container__card"
      elevation="8"
      width="448"
      rounded="lg"
    >
      <v-text-field
        v-model="state.email"
        label="E-mail"
        :error-messages="getEmailErrors"
      />

      <v-text-field
        v-model="state.password"
        label="Senha"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :error-messages="getPasswordErrors"
        @click:append-inner="showPassword = !showPassword"
      />

      <!-- <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          // TODO
          aqui deverá ficar o aviso para o meliante não ficar espamando o login
        </v-card-text>
      </v-card> -->

      <v-btn
        block
        class="mb-8"
        color="primary"
        size="large"
        variant="tonal"
        @click="login"
      >
        Log In
      </v-btn>

      <!-- <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          // TODO: aqui ficará o redirecionamento para cadastro, ainda a implementar
          Cadastre-se agora <v-icon icon="mdi-chevron-right" />
        </a>
      </v-card-text> -->
    </v-card>
  </v-container>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import * as authService from '@/modules/core/services/auth.service.js';

import { reactive } from 'vue';
import { required, email, minLength } from '@vuelidate/validators';
import { mapMutations } from 'vuex';

export default {
  name: 'LoginView',
  setup () {
    const state = reactive({
      email: '',
      password: '',
    })
    const rules = {
      email: { required, email },
      password: { required, min: minLength(4) },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },
  data: () => ({
    requiredMessage: "O campo é obrigatório",
    minMessage: "O campo deve ter no mínimo 4 caracteres",
    emailMessage: "O E-mail inserido é inválido",
    loading: false,
    showPassword: false,
  }),

  computed: {
    getEmailErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.email.required.$invalid && errors.push(this.requiredMessage);
      this.v$.email.email.$invalid && errors.push(this.emailMessage);
      return errors;
    },
    getPasswordErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.password.required.$invalid && errors.push(this.requiredMessage);
      this.v$.password.min.$invalid && errors.push(this.minMessage);
      return errors;
    },
  },

  methods: {
    ...mapMutations("auth", [
      "setToken",
    ]),
    login() {
      this.v$.$touch()
      if (this.v$.$invalid) return;
      this.loading = true;

      authService.login({
        email: this.state.email,
        password: this.state.password,
      })
        .then(({ data }) => {
          this.setToken(data?.authorization?.token || '');
          this.$router.push({ name: 'listEvents' });
        })
        .catch(() => {
          this.loading = false;
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;

  &__card {
    display: flex;
    gap: 16px;
    flex-direction: column;
  }
}
</style>
