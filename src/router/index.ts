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
import RouterLayout from '@/components/RouterLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/wild-bird',
      name: 'wild-bird',
      component: RouterLayout,
      children: [
        {
          path: 'guide',
          name: 'WildBirdGuide',
          component: WildBirdGuide,
        },
        {
          path: 'urban-birds',
          name: 'WildBirdUrbanBirds',
          component: WildBirdUrbanBirds,
        },
        {
          path: 'quiz',
          name: 'WildBirdQuiz',
          component: WildBirdQuiz,
        },
        {
          path: 'cute-bird-diy',
          name: 'WildBirdCuteBirdDIY',
          component: WildBirdCuteBirdDIY,
        },
      ],
    },
    {
      path: '/fuyang',
      name: 'fuyang',
      component: RouterLayout,
      children: [
        {
          path: 'cicada-rest-area',
          name: 'FuyangCicadaRestArea',
          component: FuyangCicadaRestArea,
        },
        {
          path: 'ecology-waterway',
          name: 'FuyangEcologyWaterway',
          component: FuyangEcologyWaterway,
        },
        {
          path: 'wetland-observation',
          name: 'FuyangWetlandObservation',
          component: FuyangWetlandObservation,
        },
      ],
    },
    {
      path: '/cute',
      name: 'cute',
      component: RouterLayout,
      children: [
        {
          path: 'upcoming-events',
          name: 'CUTEUpcomingEvents',
          component: CUTEUpcomingEvents,
        },
        {
          path: 'historical-events',
          name: 'CUTEHistoricalEvents',
          component: CUTEHistoricalEvents,
        },
      ],
    },
    {
      path: '/temple',
      name: 'temple',
      component: RouterLayout,
      children: [
        {
          path: 'historical-sites',
          name: 'TempleHistoricalSites',
          component: TempleHistoricalSites,
        },
        {
          path: 'cultural-tour',
          name: 'TempleCulturalTour',
          component: TempleCulturalTour,
        },
      ],
    },
    {
      path: '/dawo',
      name: 'dawo',
      component: RouterLayout,
      children: [
        {
          path: 'veterans-stories',
          name: 'DawoVeteransStories',
          component: DawoVeteransStories,
        },
        {
          path: 'tour',
          name: 'DawoTour',
          component: DawoTour,
        },
      ],
    },
    {
      path: '/lihe',
      name: 'lihe',
      component: RouterLayout,
      children: [
        {
          path: 'story',
          name: 'LiheStory',
          component: LiheStory,
        },
      ],
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy,
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms,
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: Disclaimer,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
