import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//导入样式初始化
import 'normalize.css'

//全局方法
import Verify from '@/utils/Verify'
import Message from '@/utils/Message'
import Request from '@/utils/Request'

//全局组件
import Dialog from '@/components/Dialog.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(store).use(router)

//注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)

app.config.globalProperties.VueCookies = VueCookies
app.config.globalProperties.Verify = Verify
app.config.globalProperties.Message = Message
app.config.globalProperties.Request = Request

app.component("Dialog", Dialog)

app.mount('#app')