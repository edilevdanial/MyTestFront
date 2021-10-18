import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld";
import CreateTest from "../components/create/Test"
import GetTest from "../components/test/GetTest";
import Test from "../components/Landing/ProitiTest";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: HelloWorld,
        name:'home',
    },
    {
        path: '/create',
        component: CreateTest,
        name: 'create.test',
    },
    {
        path: '/get/test',
        component: GetTest,
        name: 'get.test',
    },
    //TODO не создал компонент и не назвал
    {
        path: '/test/:id',
        component: Test,
        name: 'lesson.test',
    }
]
const router = new VueRouter({
    mode: 'history',
    routes: routes
})
export default router

