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
    url: new URL('@/assets/images/fuyang/ecology-waterway/wild-coffee-leaf.jpg', import.meta.url).href,
    alt: '九節木(葉子)',
    caption: '九節木(葉子)  Wild Coffee (Leaf)',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/wild-coffee.jpg', import.meta.url).href,
    alt: '九節木',
    caption: '九節木  Wild Coffee',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/formosan-palm.jpg', import.meta.url).href,
    alt: '山棕',
    caption: '山棕	Formosan Palm',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/saurauia.jpg', import.meta.url).href,
    alt: '水冬瓜',
    caption: '水冬瓜	Saurauia',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/saurauia-03.jpg', import.meta.url).href,
    alt: '水冬瓜3',
    caption: '水冬瓜3	Saurauia 03',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/common-yellow-stem-fig.jpg', import.meta.url).href,
    alt: '水同木',
    caption: '水同木	Common Yellow Stem-fig',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/wendlandia.jpg', import.meta.url).href,
    alt: '水金京',
    caption: '水金京	Wendlandia',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/wendlandia-02.jpg', import.meta.url).href,
    alt: '水金京2',
    caption: '水金京2	Wendlandia 02',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/alocasia-odora.jpg', import.meta.url).href,
    alt: '姑婆芋',
    caption: '姑婆芋	Giant Upright Elephant Ear',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/crab-eating-mongoose.jpg', import.meta.url).href,
    alt: '食蟹獴',
    caption: '食蟹獴	Crab-eating Mongoose',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/crab-eating-mongoose-02.jpg', import.meta.url).href,
    alt: '食蟹獴2',
    caption: '食蟹獴2	Crab-eating Mongoose 02',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/house-centipede.jpg', import.meta.url).href,
    alt: '蚰蜒',
    caption: '蚰蜒	House Centipede',
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/lewis-linear-fern.jpg', import.meta.url).href,
    alt: '萊氏線蕨',
    caption: "萊氏線蕨	Lewis's Linear Fern",
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/lewis-linear-fern-02.jpg', import.meta.url).href,
    alt: '萊氏線蕨2',
    caption: "萊氏線蕨2	Lewis's Linear Fern 02",
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/lewis-linear-fern-03.jpg', import.meta.url).href,
    alt: '萊氏線蕨3',
    caption: "萊氏線蕨3	Lewis's Linear Fern 03",
  },
  {
    url: new URL('@/assets/images/fuyang/ecology-waterway/hokou-gecko-egg.jpg', import.meta.url).href,
    alt: '鉛山壁虎 蛋',
    caption: '鉛山壁虎 蛋	Hokou Gecko Egg',
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
