<template>
  <div class="content-page cicada-rest-area">
    <h2>富陽自然生態公園 戀戀蟬聲休憩區</h2>
    <p class="description">夏季來臨，蟬鳴在富陽公園的樹林間此起彼落。戀戀蟬聲休憩區提供一個寧靜的空間，讓您在悠揚的蟬聲中放鬆身心，享受大自然的寧靜與和諧。</p>

    <!-- Main Swiper -->
    <div class="gallery-container">
      <Swiper :modules="modules" :loop="true" :spaceBetween="10" :navigation="true" :thumbs="{ swiper: thumbsSwiper }" class="main-swiper">
        <SwiperSlide v-for="(image, index) in images" :key="index">
          <div class="slide-content">
            <img :src="image.url" :alt="image.alt" />
            <div class="slide-caption">{{ image.caption }}</div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Thumbs Swiper -->
      <Swiper @swiper="setThumbsSwiper" :modules="modules" :loop="true" :spaceBetween="10" :slidesPerView="4" :freeMode="true" :watchSlidesProgress="true" class="thumbs-swiper">
        <SwiperSlide v-for="(image, index) in images" :key="index">
          <img :src="image.url" :alt="image.alt" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs, FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'

const modules = [Navigation, Thumbs, FreeMode]
const thumbsSwiper = ref<SwiperType | null>(null)

const setThumbsSwiper = (swiper: SwiperType) => {
  thumbsSwiper.value = swiper
}

// Sample images for the gallery
const images = [
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/wild-coffee.jpg', import.meta.url).href,
    alt: '九節木',
    caption: `九節木 Wild Coffee`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/inchworm-larva.jpg', import.meta.url).href,
    alt: '尺蠖蛾幼蟲',
    caption: `尺蠖蛾幼蟲 Inchworm`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/oriental-blechnum.jpg', import.meta.url).href,
    alt: '烏毛蕨',
    caption: `烏毛蕨 Oriental Blechnum`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/flying-spider-monkey-fern-spore.jpg', import.meta.url).href,
    alt: '鬼桫欏胞子',
    caption: `鬼桫欏(胞子) Flying Spider-monkey Fern (Spore)`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/flying-spider-monkey-fern.jpg', import.meta.url).href,
    alt: '鬼桫欏',
    caption: `鬼桫欏 Flying Spider-monkey Fern`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/tortricid-moth-larva.jpg', import.meta.url).href,
    alt: '偽捲蛾幼蟲',
    caption: `偽捲蛾幼蟲 Tortricid Moth Larva`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/soft-haired-persimmon.jpg', import.meta.url).href,
    alt: '軟毛柿',
    caption: `軟毛柿 Soft-haired Persimmon`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/staff-sergeant-butterfly.jpg', import.meta.url).href,
    alt: '單帶蛺蝶',
    caption: `單帶蛺蝶 Staff Sergeant Butterfly`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/sour-creeper.jpg', import.meta.url).href,
    alt: '酸藤',
    caption: `酸藤 Sour Creeper`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/sour-creeper-01.jpg', import.meta.url).href,
    alt: '酸藤1',
    caption: `酸藤 Sour Creeper 01`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/elliptic-linear-fern-sporangium.jpg', import.meta.url).href,
    alt: '橢圓線蕨包子囊',
    caption: `橢圓線蕨(包子囊) Elliptic Linear Fern (Sporangium)`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/elliptic-linear-fern-02.jpg', import.meta.url).href,
    alt: '橢圓線蕨2',
    caption: `橢圓線蕨 Elliptic Linear Fern 02`,
  },
  {
    url: new URL('@/assets/images/fuyang/cicada-rest-area/angiopteris-fern.jpg', import.meta.url).href,
    alt: '觀音座蓮蕨類',
    caption: `觀音座蓮蕨類 Angiopteris Fern`,
  },
]
</script>

<style scoped>
.content-page {
  text-align: left;
}

.cicada-rest-area {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.cicada-rest-area h2 {
  color: #2c5f2d;
  margin-bottom: 16px;
  font-size: 28px;
  font-weight: 600;
}

.description {
  color: #555;
  line-height: 1.8;
  margin-bottom: 30px;
  font-size: 16px;
}

.gallery-container {
  width: 100%;
  margin-top: 20px;
}

/* Main Swiper Styles */
.main-swiper {
  width: 100%;
  height: 500px;
  margin-bottom: 10px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.slide-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: 20px;
  font-size: 16px;
  font-weight: 500;
}

/* Thumbs Swiper Styles */
.thumbs-swiper {
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  padding: 10px 0;
}

.thumbs-swiper :deep(.swiper-slide) {
  width: 25%;
  height: 100%;
  opacity: 0.5;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.thumbs-swiper :deep(.swiper-slide-thumb-active) {
  opacity: 1;
  border-color: #2c5f2d;
  transform: scale(1.05);
}

.thumbs-swiper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Navigation Buttons */
.main-swiper :deep(.swiper-button-next),
.main-swiper :deep(.swiper-button-prev) {
  color: white;
  background: rgba(44, 95, 45, 0.7);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-swiper :deep(.swiper-button-next):hover,
.main-swiper :deep(.swiper-button-prev):hover {
  background: rgba(44, 95, 45, 0.9);
  transform: scale(1.1);
}

.main-swiper :deep(.swiper-button-next::after),
.main-swiper :deep(.swiper-button-prev::after) {
  font-size: 14px;
  font-weight: bold;
}

/* SVG Icon Size Control */
.main-swiper :deep(.swiper-button-next svg),
.main-swiper :deep(.swiper-button-prev svg) {
  width: 20px;
  height: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-swiper {
    height: 350px;
  }

  .thumbs-swiper {
    height: 80px;
  }

  .thumbs-swiper :deep(.swiper-slide) {
    width: 25%;
  }

  .cicada-rest-area h2 {
    font-size: 24px;
  }

  .description {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .main-swiper {
    height: 250px;
  }

  .thumbs-swiper {
    height: 60px;
  }

  .slide-caption {
    font-size: 14px;
    padding: 15px;
  }
}
</style>
