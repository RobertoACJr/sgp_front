<template>
  <v-container class="login-container">
    <v-card
      class="mx-auto pa-12 pb-8 login-container__card"
      elevation="8"
      width="448"
      rounded="lg"
    >
      <v-text-field
        v-model="email"
        label="E-mail"
        hide-details=""
      />

      <v-text-field
        v-model="password"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="Senha"
        hint="Pelo menos 8 caracteres"
        counter
        @click:append="showPassword = !showPassword"
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
import { required } from '@vuelidate/validators'

export default {
  name: 'LoginView',
  data: () => ({
    showPassword: false,
    email: '',
    password: '',
  }),
  validations () {
    return {
      email: { required },
      password: { required }
    }
  }
}
</script>

<style lang="scss" scope>
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
