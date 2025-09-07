import { createRouter, createWebHistory } from 'vue-router'
// 將所有靜態匯入改為動態匯入，以解決型別衝突並啟用路由懶載入
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/pages/Home.vue'),
  },
  {
    path: '/wild-bird/guide',
    name: 'WildBirdGuide',
    component: () => import('@/components/pages/WildBirdGuide.vue'),
  },
  {
    path: '/wild-bird/urban-birds',
    name: 'WildBirdUrbanBirds',
    component: () => import('@/components/pages/WildBirdUrbanBirds.vue'),
  },
  {
    path: '/wild-bird/quiz',
    name: 'WildBirdQuiz',
    component: () => import('@/components/pages/WildBirdQuiz.vue'),
  },
  {
    path: '/wild-bird/cute-bird-diy',
    name: 'WildBirdCuteBirdDIY',
    component: () => import('@/components/pages/WildBirdCuteBirdDIY.vue'),
  },
  {
    path: '/fuyang/cicada-rest-area',
    name: 'FuyangCicadaRestArea',
    component: () => import('@/components/pages/FuyangCicadaRestArea.vue'),
  },
  {
    path: '/fuyang/ecology-waterway',
    name: 'FuyangEcologyWaterway',
    component: () => import('@/components/pages/FuyangEcologyWaterway.vue'),
  },
  {
    path: '/fuyang/wetland-observation',
    name: 'FuyangWetlandObservation',
    component: () => import('@/components/pages/FuyangWetlandObservation.vue'),
  },
  {
    path: '/cute/upcoming-events',
    name: 'CUTEUpcomingEvents',
    component: () => import('@/components/pages/CUTEUpcomingEvents.vue'),
  },
  {
    path: '/cute/historical-events',
    name: 'CUTEHistoricalEvents',
    component: () => import('@/components/pages/CUTEHistoricalEvents.vue'),
  },
  {
    path: '/temple/historical-sites',
    name: 'TempleHistoricalSites',
    component: () => import('@/components/pages/TempleHistoricalSites.vue'),
  },
  {
    path: '/temple/cultural-tour',
    name: 'TempleCulturalTour',
    component: () => import('@/components/pages/TempleCulturalTour.vue'),
  },
  {
    path: '/dawo/veterans-stories',
    name: 'DawoVeteransStories',
    component: () => import('@/components/pages/DawoVeteransStories.vue'),
  },
  {
    path: '/dawo/tour',
    name: 'DawoTour',
    component: () => import('@/components/pages/DawoTour.vue'),
  },
  {
    path: '/lihe/story',
    name: 'LiheStory',
    component: () => import('@/components/pages/LiheStory.vue'),
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/components/pages/Privacy.vue'),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/components/pages/Terms.vue'),
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: () => import('@/components/pages/Disclaimer.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
