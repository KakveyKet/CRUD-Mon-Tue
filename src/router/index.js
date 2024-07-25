import { createWebHistory, createRouter } from 'vue-router'
import StudentPage from '../components/StudentPage.vue'
import AddStudent from '../forms/AddStudent.vue'

const routes = [
    { path: '/', name: 'student', component: StudentPage },
    { path: '/addstudent', name: 'addstudent', component: AddStudent }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router