import { createApp } from 'vue'
import './styles/variables.css'
import './styles/base.css'
import './styles/scroll-reveal.css'
import App from './App.vue'
import { vScrollReveal, vScrollRevealChild } from './directives/scrollReveal.js'

const app = createApp(App)
app.directive('scroll-reveal', vScrollReveal)
app.directive('scroll-reveal-child', vScrollRevealChild)
app.mount('#app')
