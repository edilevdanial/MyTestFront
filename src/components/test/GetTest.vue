<template>
  <v-container fluid>
    <v-row align-content="center">
      <v-col cols="12" :key="index" v-for="(item,index) in allTest.test">
        <v-card
            width="500px"
            elevation="3"
            class="d-flex justify-space-between pa-5"
        >
          {{item.name}}
          <v-btn @click="toTest(index)" elevation="2" outlined color="blue">пройти</v-btn>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import router from "../../plugins/router";
export default {
  name: "GetTest",
  data:function () {
    return {
      allTest: {
        test: []
      }
    }
  },
  mounted(){
    axios.get('http://localhost:3600/api/all/test').then(response=>{
      console.log(response)
      this.allTest.test = response.data.test
    })
  },
  methods:{
    toTest(index){
        router.push({name:'lesson.test', params:{id:`${this.allTest.test[index]._id}`} })
    }
  }
}
</script>

<style scoped>

</style>