import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/HomeView.vue'
import Layout from '../views/layout/Layout.vue'
const About = () => import('../views/AboutView.vue')
const Article = () => import ('../views/article/ArticleView.vue');
const Audio = () => import ('../views/audio/AudioView.vue');
const Video = () => import ('../views/video/VideoView.vue');
const Baike = () => import ('../views/baike/BaikeView.vue');

const routes = [
  {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
          {
              path: '/',
              name: 'home',
              component: Home
          },
          {
              path: '/article',
              component: Article
          },
          {
              path: '/audio',
              component: Audio
          },
          {
              path: '/video',
              component: Video
          },
          {
              path: '/baike',
              component: Baike
          },
          {
              path: '/about',
              name: 'about',
              component: About
          }
      ]
  },
]

const router = createRouter({
    history: createWebHistory(),
    //process.env.BASE_URL
    routes
})

export default router
