import { createApp } from 'vue'
import App from './App.vue'
import { apolloPlugin } from './plugins/apollo'
import './assets/less/main.less'

const app = createApp(App)
app.use(apolloPlugin)
app.mount('#app')