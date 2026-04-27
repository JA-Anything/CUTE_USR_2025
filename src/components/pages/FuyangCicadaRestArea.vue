<script setup lang="ts">
import FuyangGallery, { type Photo } from '@/components/FuyangGallery.vue'

const photos: Photo[] = [
  { id: 1,  imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/wild-coffee.jpg',                    import.meta.url).href, chineseName: '九節木',           englishName: 'Wild Coffee' },
  { id: 2,  imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/inchworm-larva.jpg',                 import.meta.url).href, chineseName: '尺蠖蛾幼蟲',       englishName: 'Inchworm' },
  { id: 3,  imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/oriental-blechnum.jpg',              import.meta.url).href, chineseName: '烏毛蕨',           englishName: 'Oriental Blechnum' },
  { id: 4,  imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/flying-spider-monkey-fern-spore.jpg',import.meta.url).href, chineseName: '鬼桫欏（胞子）',   englishName: 'Flying Spider-monkey Fern (Spore)' },
  { id: 5,  imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/flying-spider-monkey-fern.jpg',      import.meta.url).href, chineseName: '鬼桫欏',           englishName: 'Flying Spider-monkey Fern' },
  { id: 6,  imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/tortricid-moth-larva.jpg',           import.meta.url).href, chineseName: '偽捲蛾幼蟲',       englishName: 'Tortricid Moth Larva' },
  { id: 7,  imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/soft-haired-persimmon.jpg',          import.meta.url).href, chineseName: '軟毛柿',           englishName: 'Soft-haired Persimmon' },
  { id: 8,  imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/staff-sergeant-butterfly.jpg',       import.meta.url).href, chineseName: '單帶蛺蝶',         englishName: 'Staff Sergeant Butterfly' },
  { id: 9,  imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/sour-creeper.jpg',                   import.meta.url).href, chineseName: '酸藤',             englishName: 'Sour Creeper' },
  { id: 10, imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/sour-creeper-01.jpg',                import.meta.url).href, chineseName: '酸藤 01',          englishName: 'Sour Creeper 01' },
  { id: 11, imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/elliptic-linear-fern-sporangium.jpg',import.meta.url).href, chineseName: '橢圓線蕨（胞子囊）',englishName: 'Elliptic Linear Fern (Sporangium)' },
  { id: 12, imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/elliptic-linear-fern-02.jpg',        import.meta.url).href, chineseName: '橢圓線蕨 02',      englishName: 'Elliptic Linear Fern 02' },
  { id: 13, imageUrl: new URL('@/assets/images/fuyang/cicada-rest-area/angiopteris-fern.jpg',               import.meta.url).href, chineseName: '觀音座蓮蕨類',     englishName: 'Angiopteris Fern' },
]
</script>

<template>
  <FuyangGallery
    parkName="富陽自然生態公園"
    sectionTitle="戀戀蟬聲休憩區"
    subtitle="傾聽自然的樂章，尋訪蟬鳴棲地"
    :photos="photos"
  />
</template>
