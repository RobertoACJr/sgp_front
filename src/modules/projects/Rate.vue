<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(assessment, index) in assessments"
        :key="index"
        xl="6"
        md="12"
      >
        {{ assessment.title }}
        <v-text-field 
          v-model="assessment.score" 
          height="5" 
          :rules="rules" 
          editable 
          persistent-hint 
          outline 
          label="" 
          type="number"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RateProject',
  data: () => ({
    requiredMessage: "O campo é obrigatório",
    loading: false,
    rules: [
      v => v ? true : 'O campo é obrigatório',
      v => v > 10 ? 'A nota não pode ser maior que 10' : true,
      v => v < 0 ? 'A nota não pode ser menor que 0' : true,
    ],
    assessments: [
      {
        title: 'O projeto é um projeto?',
        uuid: 'uuuu-uuuu-iiii-dddd',

        score: null,
      },
      {
        title: 'O projeto é tem um banner?',
        uuid: 'uuuu-uuuu-iiii-dddd',

        score: null,
      },
      {
        title: 'O projeto é um bonito igual o palma?',
        uuid: 'uuuu-uuuu-iiii-dddd',

        score: null,
      },
    ],
  }),

  computed: {
  },

  methods: {
  },
}
</script>

<style>

</style>