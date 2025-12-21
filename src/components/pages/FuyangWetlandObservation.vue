<template>
  <div class="content-page wetland-observation">
    <h2>富陽自然生態公園 溼地觀察區</h2>
    <p class="description">溼地觀察區是生物多樣性的寶庫，這裡棲息著各種水鳥、兩棲類動物和昆蟲。透過觀察步道，您可以近距離欣賞溼地生態的豐富樣貌，體驗大自然的奧妙。</p>

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

// Sample images for the wetland observation gallery
const images = [
  {
    url: 'https://images.unsplash.com/photo-1484591974057-265bb767ef71?w=800&h=600&fit=crop',
    alt: '溼地觀察區全景',
    caption: '溼地觀察區全景 - 生物多樣性的天堂',
  },
  {
    url: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&h=600&fit=crop',
    alt: '溼地水鳥',
    caption: '溼地水鳥 - 優雅的溼地居民',
  },
  {
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop',
    alt: '溼地植物',
    caption: '溼地植物 - 獨特的水生植被',
  },
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    alt: '觀察步道',
    caption: '觀察步道 - 近距離接觸自然',
  },
  {
    url: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&h=600&fit=crop',
    alt: '溼地生態',
    caption: '溼地生態 - 豐富的生態系統',
  },
  {
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop',
    alt: '溼地日落',
    caption: '溼地日落 - 黃昏時分的溼地美景',
  },
]
</script>

<style scoped>
.content-page {
  text-align: left;
}

.wetland-observation {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.wetland-observation h2 {
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

  .wetland-observation h2 {
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
