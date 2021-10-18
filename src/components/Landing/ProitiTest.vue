<template>
<v-container>
  <v-row v-if="checkIsFind">
      <v-col>
        <v-img :src="getImg" alt="logo"/>
      </v-col>
  </v-row>
  <v-row v-else>
    <v-col>
      <v-img :src="require('./../../assets/error.png')" alt="logo"/>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ProitiTest",
  data:function () {
    return {
      test: null,
      checkIsFind:true
    }
  },
  computed:{
    getImg(){
     return  require('./../../assets/error.svg')
    }
  },
  mounted() {
    console.log('http://localhost:3600/api/test/'+this.$route.params.id)
    // axios.get('http://localhost:3600/api/test/'+this.$route.params.id).then(response=>{
    //   this.test = response
    // }).catch(error=>{
    //   console.log(error)
    // })
    axios.get('http://localhost:3600/api/test/'+this.$route.params.id).then(response=>{
      this.test = response.data
    }).catch(error=>{
      console.log(error)
    }).finally(()=>{
      if (!this.test){
        this.checkIsFind = false
      }
    })
  },

}
</script>

<style scoped>

</style>