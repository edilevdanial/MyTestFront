<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="text-center">
        <h1>Добро пожаловать в Дэниелс Тест</h1>
      </v-col>
      <v-col align-self="center" cols="12" class="text-center">
        <v-btn class="mr-3" to="/create" elevation="2" outlined color="blue">Создать тест</v-btn>
        <v-btn @click="toAllTest" elevation="2" outlined color="blue">Все тесты</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "../plugins/router";

export default {
  name: 'HelloWorld',

  data: () => ({

  }),
  methods:{
    toAllTest(){
      router.push({name:'get.test'})
    }
  }
}
</script>
