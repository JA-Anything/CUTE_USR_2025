<script setup lang="ts">
import FuyangGallery, { type Photo } from '@/components/FuyangGallery.vue'

const photos: Photo[] = [
  { id: 1,  imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/wild-coffee-leaf.webp',          import.meta.url).href, chineseName: '九節木（葉子）',   englishName: 'Wild Coffee (Leaf)' },
  { id: 2,  imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/wild-coffee.webp',               import.meta.url).href, chineseName: '九節木',           englishName: 'Wild Coffee' },
  { id: 3,  imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/formosan-palm.webp',             import.meta.url).href, chineseName: '山棕',             englishName: 'Formosan Palm' },
  { id: 4,  imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/saurauia.webp',                  import.meta.url).href, chineseName: '水冬瓜',           englishName: 'Saurauia' },
  { id: 5,  imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/saurauia-03.webp',               import.meta.url).href, chineseName: '水冬瓜 03',        englishName: 'Saurauia 03' },
  { id: 6,  imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/common-yellow-stem-fig.webp',    import.meta.url).href, chineseName: '水同木',           englishName: 'Common Yellow Stem-fig' },
  { id: 7,  imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/wendlandia.webp',                import.meta.url).href, chineseName: '水金京',           englishName: 'Wendlandia' },
  { id: 8,  imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/wendlandia-02.webp',             import.meta.url).href, chineseName: '水金京 02',        englishName: 'Wendlandia 02' },
  { id: 9,  imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/alocasia-odora.webp',            import.meta.url).href, chineseName: '姑婆芋',           englishName: 'Giant Upright Elephant Ear' },
  { id: 10, imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/crab-eating-mongoose.webp',      import.meta.url).href, chineseName: '食蟹獴',           englishName: 'Crab-eating Mongoose' },
  { id: 11, imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/crab-eating-mongoose-02.webp',   import.meta.url).href, chineseName: '食蟹獴 02',        englishName: 'Crab-eating Mongoose 02' },
  { id: 12, imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/house-centipede.webp',           import.meta.url).href, chineseName: '蚰蜒',             englishName: 'House Centipede' },
  { id: 13, imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/lewis-linear-fern.webp',         import.meta.url).href, chineseName: '萊氏線蕨',         englishName: "Lewis's Linear Fern" },
  { id: 14, imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/lewis-linear-fern-02.webp',      import.meta.url).href, chineseName: '萊氏線蕨 02',      englishName: "Lewis's Linear Fern 02" },
  { id: 15, imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/lewis-linear-fern-03.webp',      import.meta.url).href, chineseName: '萊氏線蕨 03',      englishName: "Lewis's Linear Fern 03" },
  { id: 16, imageUrl: new URL('@/assets/images/fuyang/ecology-waterway/hokou-gecko-egg.webp',           import.meta.url).href, chineseName: '鉛山壁虎（蛋）',   englishName: 'Hokou Gecko Egg' },
]
</script>

<template>
  <FuyangGallery
    parkName="富陽自然生態公園"
    sectionTitle="生態水道區"
    subtitle="溯溪觀察，認識水生生物"
    :photos="photos"
  />
</template>
