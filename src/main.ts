import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import '~/styles/main.scss'
import App from './App.vue'
import router from '~/router'
import pinia from '~/store'
import useRegisterUtils from '~/utils/register.util.ts'
const { registerLayouts } = useRegisterUtils()

const app = createApp(App)
registerLayouts(app)

app.use(pinia)
app.use(router)
app.mount('#app')
