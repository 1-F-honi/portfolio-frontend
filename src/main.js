import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// CoreUIのCSSをインポート（グローバルに反映される）
import '@coreui/coreui/dist/css/coreui.min.css'

createApp(App).mount('#app')
