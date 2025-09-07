import { createRouter, createWebHistory } from 'vue-router'
import Terms from '@/components/pages/Terms.vue'
import Privacy from '@/components/pages/Privacy.vue'
import Disclaimer from '@/components/pages/Disclaimer.vue'
import FuyangCicadaRestArea from '@/components/pages/FuyangCicadaRestArea.vue'
import FuyangEcologyWaterway from '@/components/pages/FuyangEcologyWaterway.vue'
import FuyangWetlandObservation from '@/components/pages/FuyangWetlandObservation.vue'
import DawoTour from '@/components/pages/DawoTour.vue'
import DawoVeteransStories from '@/components/pages/DawoVeteransStories.vue'
import LiheStory from '@/components/pages/LiheStory.vue'
import TempleCulturalTour from '@/components/pages/TempleCulturalTour.vue'
import TempleHistoricalSites from '@/components/pages/TempleHistoricalSites.vue'
import CUTEUpcomingEvents from '@/components/pages/CUTEUpcomingEvents.vue'
import CUTEHistoricalEvents from '@/components/pages/CUTEHistoricalEvents.vue'
import WildBirdGuide from '@/components/pages/WildBirdGuide.vue'
import WildBirdUrbanBirds from '@/components/pages/WildBirdUrbanBirds.vue'
import WildBirdQuiz from '@/components/pages/WildBirdQuiz.vue'
import WildBirdCuteBirdDIY from '@/components/pages/WildBirdCuteBirdDIY.vue'
import Home from '@/components/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/wild-bird/guide',
      name: 'WildBirdGuide',
      component: WildBirdGuide,
    },
    {
      path: '/wild-bird/urban-birds',
      name: 'WildBirdUrbanBirds',
      component: WildBirdUrbanBirds,
    },
    {
      path: '/wild-bird/quiz',
      name: 'WildBirdQuiz',
      component: WildBirdQuiz,
    },
    {
      path: '/wild-bird/cute-bird-diy',
      name: 'WildBirdCuteBirdDIY',
      component: WildBirdCuteBirdDIY,
    },
    {
      path: '/fuyang/cicada-rest-area',
      name: 'FuyangCicadaRestArea',
      component: FuyangCicadaRestArea,
    },
    {
      path: '/fuyang/ecology-waterway',
      name: 'FuyangEcologyWaterway',
      component: FuyangEcologyWaterway,
    },
    {
      path: '/fuyang/wetland-observation',
      name: 'FuyangWetlandObservation',
      component: FuyangWetlandObservation,
    },
    {
      path: '/cute/upcoming-events',
      name: 'CUTEUpcomingEvents',
      component: CUTEUpcomingEvents,
    },
    {
      path: '/cute/historical-events',
      name: 'CUTEHistoricalEvents',
      component: CUTEHistoricalEvents,
    },
    {
      path: '/temple/historical-sites',
      name: 'TempleHistoricalSites',
      component: TempleHistoricalSites,
    },
    {
      path: '/temple/cultural-tour',
      name: 'TempleCulturalTour',
      component: TempleCulturalTour,
    },
    {
      path: '/dawo/veterans-stories',
      name: 'DawoVeteransStories',
      component: DawoVeteransStories,
    },
    {
      path: '/dawo/tour',
      name: 'DawoTour',
      component: DawoTour,
    },
    {
      path: '/lihe/story',
      name: 'LiheStory',
      component: LiheStory,
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy,
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms,
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: Disclaimer,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
