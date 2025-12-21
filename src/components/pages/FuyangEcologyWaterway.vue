<template>
  <div class="content-page ecology-waterway">
    <h2>富陽自然生態公園 生態水道區</h2>
    <p class="description">生態水道是富陽公園的生命之源，蜿蜒的水道滋養了豐富的動植物生態。漫步於此，您可以觀察到魚兒悠游、蜻蜓點水，感受水與生態交織出的美好景致。</p>

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

// Sample images for the ecology waterway gallery
const images = [
  {
    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
    alt: '生態水道全景',
    caption: '生態水道全景 - 蜿蜒流淌的生命之源',
  },
  {
    url: 'https://images.unsplash.com/photo-1485841890310-6a055c88698a?w=800&h=600&fit=crop',
    alt: '水中生態',
    caption: '水中生態 - 清澈水流中的生命',
  },
  {
    url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop',
    alt: '水道植被',
    caption: '水道植被 - 水岸邊的綠色生態',
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: '水道景觀',
    caption: '水道景觀 - 自然與水的和諧共生',
  },
  {
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
    alt: '水生植物',
    caption: '水生植物 - 豐富的水域生態系統',
  },
  {
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop',
    alt: '水道倒影',
    caption: '水道倒影 - 水面映照的自然之美',
  },
]
</script>

<style scoped>
.content-page {
  text-align: left;
}

.ecology-waterway {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.ecology-waterway h2 {
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

  .ecology-waterway h2 {
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
