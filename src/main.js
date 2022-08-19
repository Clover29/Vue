import { createApp } from 'vue'
import App from './App.vue'
import {createRouter,createWebHistory} from 'vue-router'
import EmployeeList from './components/views/EmployeeList.vue'
import CustomerList from './components/views/CustomerList.vue'

const routers = [
    {path: '/',component: EmployeeList},
    {path: '/employee', component: EmployeeList},
    {path: '/customer', component: CustomerList},
]
const vueRouter =createRouter({
     history: createWebHistory(),
     routes: routers
});
createApp(App).use(vueRouter).mount('#app')
