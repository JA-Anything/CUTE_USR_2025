<script setup lang="ts">
import FuyangGallery, { type Photo } from '@/components/FuyangGallery.vue'

const photos: Photo[] = [
  { id: 1,  imageUrl: new URL('@/assets/images/fuyang/wetland-observation/schefflera-tree.jpg',                import.meta.url).href, chineseName: '江某',         englishName: 'Schefflera Tree' },
  { id: 2,  imageUrl: new URL('@/assets/images/fuyang/wetland-observation/mientien-tree-frog.jpg',            import.meta.url).href, chineseName: '面天樹蛙',      englishName: 'Mientien Tree Frog' },
  { id: 3,  imageUrl: new URL('@/assets/images/fuyang/wetland-observation/lichen-moth-larva.jpg',             import.meta.url).href, chineseName: '閃光苔蛾幼蟲',  englishName: 'Lichen Moth Larva' },
  { id: 4,  imageUrl: new URL('@/assets/images/fuyang/wetland-observation/swinhoes-snail.jpg',                import.meta.url).href, chineseName: '斯文豪氏蝸牛',  englishName: "Swinhoe's Snail" },
  { id: 5,  imageUrl: new URL('@/assets/images/fuyang/wetland-observation/loepa-moth-eating-saurauia.jpg',    import.meta.url).href, chineseName: '黃豹天蠶蛾吃水冬瓜葉', englishName: 'Loepa Moth eating Saurauia Leaf' },
  { id: 6,  imageUrl: new URL('@/assets/images/fuyang/wetland-observation/loepa-moth-eating-saurauia-02.jpg', import.meta.url).href, chineseName: '黃豹天蠶蛾吃水冬瓜葉 02', englishName: 'Loepa Moth eating Saurauia Leaf 02' },
  { id: 7,  imageUrl: new URL('@/assets/images/fuyang/wetland-observation/round-leaf-lasianthus-01.jpg',      import.meta.url).href, chineseName: '圓葉雞屎樹',    englishName: 'Round-leaf Lasianthus 01' },
  { id: 8,  imageUrl: new URL('@/assets/images/fuyang/wetland-observation/round-leaf-lasianthus-02.jpg',      import.meta.url).href, chineseName: '圓葉雞屎樹 02', englishName: 'Round-leaf Lasianthus 02' },
  { id: 9,  imageUrl: new URL('@/assets/images/fuyang/wetland-observation/freshwater-mangrove.jpg',           import.meta.url).href, chineseName: '穗花棋盤腳',    englishName: 'Freshwater Mangrove' },
  { id: 10, imageUrl: new URL('@/assets/images/fuyang/wetland-observation/freshwater-mangrove-02.jpg',        import.meta.url).href, chineseName: '穗花棋盤腳 02', englishName: 'Freshwater Mangrove 02' },
]
</script>

<template>
  <FuyangGallery
    parkName="富陽自然生態公園"
    sectionTitle="濕地生態觀察區"
    subtitle="探索水域生態系的多樣生命"
    :photos="photos"
  />
</template>
