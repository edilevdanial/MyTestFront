<template>
  <v-container fluid>
    <v-row v-if="test.questions!==undefined">
      <v-col cols="12" align-self="center" class="pa-16 grey">
        <h3>{{ test.name }}</h3>

      </v-col>
      <v-col cols="12">
        <div class="questions d-flex justify-space-between px-16 mt-5">
          <!--        <v-alert-->
          <!--            v-for="(item,index) in test.questions"-->
          <!--            :key="index"-->
          <!--            class="mr-3"-->
          <!--            style="padding: 10px 19px"-->
          <!--             width="50px"-->
          <!--             height="50px"-->
          <!--            color="blue"-->
          <!--             dark-->
          <!--        >-->
          <!--          <div class="text-h6">-->
          <!--             {{index+1}}-->
          <!--          </div>-->
          <!--        </v-alert>-->
          <div class="navigate__questions">
            <div class="d-flex test__index" v-if="!proverka">

              <div class="question_button_index" v-for="(item,index) in test.questions" :key="item.correctAnswers">
                <v-btn
                    height="50px"
                    class="mr-3"
                    depressed
                    :color="questionIndex===index||answerQuestion[index]!==null?'primary':'lighten-1'"

                    @click="questionIndex=index"
                >
                  <h3>{{ index + 1 }}</h3>
                </v-btn>
              </div>
            </div>
            <div v-else class="d-flex test__answers">
              <div class="question_button_index" v-for="(item,index) in test.questions" :key="item.correctAnswers">
                <v-btn
                    height="50px"
                    class="mr-3"
                    depressed
                    dark
                    :color="checkAnswers[index]?'green':'red'"
                    @click="questionIndex=index"
                >
                  <h3>{{ index + 1 }}</h3>
                </v-btn>
              </div>
            </div>
          </div>
          <div class="timer">
            <h3>{{ timerMinute }}:{{ timerSecund }}</h3>
          </div>
        </div>
        <div class="question__content px-16 mt-10">
          <div v-for="(item, index) in test.questions" :key="item.question" v-show="questionIndex===index">
            <h2>{{ item.question }}</h2>
            <v-row class="ml-0">
              <v-radio-group v-model="answerQuestion[index]">
                <v-radio
                    v-for="(answer) in item.answers"
                    :key="answer.answer"
                    :label="`${answer.answer}`"
                    :value="answer.answer"
                ></v-radio>
              </v-radio-group>
            </v-row>
          </div>
          <div v-if="(+timerSecund===0&&+timerMinute===0)||showBtnResult" class="d-flex justify-end">
            <v-btn @click="finishTest" color="primary">
              Показать результаты
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <!--      <svg-icon :name="'../../assets/error.svg'" />-->
        <v-img height="100%" :src="require('./../../assets/error.png')" alt="logo"/>
      </v-col>
    </v-row>
    <v-row v-show="checkIsSdanTest">
      <v-col cols="12">
        <div class="text-center black opacity loading">
          <div>
            <v-progress-circular
                :size="70"
                :width="7"
                color="white"
                indeterminate
            ></v-progress-circular>
            <h2>Подождите несколько секунд...</h2>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
// import SvgIcon from "../SvgIcon";

export default {
  name: "ProitiTest",
  // components: {SvgIcon},
  data: function () {
    return {
      proverka:false,
      showBtnResult: false,
      checkIsSdanTest: false,
      questionIndex: 0,
      answerQuestion: [],
      test: {},
      timerMinute: 11,
      timerSecund: 59,
      checkAnswers:[]
    }
  },
  watch: {
    answerQuestion: function () {
      this.answerQuestion.some(el => {
        if (el !== null) {
          this.showBtnResult = true
        } else {
          this.showBtnResult = false
          return true
        }
      })
    }
  },
  computed: {
    getImg() {
      return require('./../../assets/error.svg')
    }
  },
  mounted() {

    console.log('http://localhost:3600/api/test/' + this.$route.params.id)
    // axios.get('http://localhost:3600/api/test/'+this.$route.params.id).then(response=>{
    //   this.test = response
    // }).catch(error=>{
    //   console.log(error)
    // })
    axios.get('http://localhost:3600/api/test/' + this.$route.params.id).then(response => {
      this.test = response.data
    }).then(() => {
      this.test.questions.forEach(() => {
        this.answerQuestion.splice(0, 0, null)
      })
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      let timerInterval = setInterval(() => {
        if (+this.timerSecund === 0 && +this.timerMinute !== 0) {
          this.timerSecund = 59;
          this.timerMinute--;
          if (this.timerMinute < 10) {
            this.timerMinute = '0' + this.timerMinute
          }
        } else if (+this.timerSecund !== 0) {
          this.timerSecund -= 1;
        } else {
          console.log('cleared')
          clearInterval(timerInterval)
        }
        if(this.checkIsSdanTest){
          clearInterval(timerInterval)
        }
        // console.log(this.timerSecund, +this.timerSecund)
        if (+this.timerSecund < 10 && this.timerSecund !== '00') {
          this.timerSecund = '0' + this.timerSecund
        }
      }, 1000)
    })
  },
  methods: {
    finishTest() {
      this.checkIsSdanTest = true
      setTimeout(() => {
        this.checkIsSdanTest = false
        this.test.questions.every(question=>{
          this.answerQuestion.every(answers=>{
            console.log(answers, +question.correctAnswers, answers.toString()===question.correctAnswers)
              if(answers===question.correctAnswers){
                this.checkAnswers.splice(0,0,true)
              }else {
                this.checkAnswers.splice(0,0,false)
              }
          })
        })
        this.proverka = true
      }, 5000)
    }
  }

}
</script>

<style scoped>
.loading {
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: .6;
}
</style>