<template>
<v-container>
  <v-row justify="center">
    <v-col cols="12" class="text-center">
      <h3>Создайте свои тесты для себя!</h3>
    </v-col>
    <v-col cols="6">
      <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
          label="Название Теста"
          :rules="nameRules"
          outlined
          clearable
          v-model="test.name"
      ></v-text-field>
      <div class="questions">
      <div v-for="(item,indexQuestions) in test.questions" :key="indexQuestions">
        <h3>Вопрос  №{{ indexQuestions+1 }} </h3>
        <v-text-field
            :rules="nameRules"
            label="Заголовок Вопрос"
            outlined
            clearable
            v-model="item.question"
        ></v-text-field>
        <v-text-field
            :rules="nameRules"
            label="Правильный ответ"
            outlined
            v-model="item.correctAnswers"
        ></v-text-field>
        <v-row>
            <v-col cols="6" class="py-0" v-for="(answer,indexAnswer) in item.answers" :key="indexAnswer">
            <v-text-field
                :rules="nameRules"
                :label="'Ответ ' + (indexAnswer+1)"
                outlined
                v-model="answer.answer"
            ></v-text-field>
            </v-col>
        </v-row>
          <v-btn class="mb-4" @click="addAnswer(indexQuestions)" elevation="1" outlined color="blue">Добавить ответ</v-btn>
        <v-text-field
            :rules="nameRules"
            label="Cообщение в случае правильного ответа"
            outlined
            v-model="test.correct_message"
        ></v-text-field>
        <v-text-field
            :rules="nameRules"
            label="Cообщение в случае НЕправильного ответа"
            outlined
            v-model="test.no_correct_message"
        ></v-text-field>
        <v-divider v-show="test.questions.length>(indexQuestions+1)" class="my-10 black"></v-divider>
      </div>
      <v-btn class="mb-4" @click="addQuestion()" elevation="2" outlined color="blue">Добавить Вопрос</v-btn>

        <v-divider class="my-10 black"></v-divider>
        <v-btn class="mb-4" @click="setTests()" elevation="2" outlined color="blue">Отправить</v-btn>
      </div>
      </v-form>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import axios from 'axios'
import router from "../../plugins/router";
export default {
  name: "Test",
  data:function () {
    return{
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 1) || 'Name must be less than 10 characters',
      ],
      valid:false,
      test:{
        name: "Кто знает Даниала лучше всех?",
        correct_message:"Ты знаешь Даниала Молодец!",
        no_correct_message:"Ты не знаешь Даниала Урод!",
        questions:[
          {
            question: "Сколько Даниалу лет?",
            answers:[
              {
                answer:20
              },
              {
                answer:29
              },
              {
                answer:18
              },
            ],
            correctAnswers:18,
          }
        ]
      }
    }
  },
  methods:{
    validate () {
      this.$refs.form.validate()
    },
    async setTests(){
      this.validate();
      console.log(this.test)
      await axios.post("http://localhost:3600/api/users", this.test).then(()=>{
        router.push({name:'get.test'})
      })
      console.log(JSON.stringify(this.test))
    },
    addAnswer(id){
      this.test.questions[id].answers.push({answer: null})
    },
    addQuestion(){
      let object =  {
        question: null,
        answers:[
          {
            answer:null
          },
          {
            answer:null
          },
          {
            answer:null
          },
        ],
        correctAnswers:null,
      }
      this.test.questions.push(object)
    }
  }
}
</script>

<style scoped>

</style>