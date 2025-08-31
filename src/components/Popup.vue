<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: String,
  text: String,
  image: String,
})

const emits = defineEmits(['close'])

const closePopup = () => {
  emits('close')
}
</script>

<template>
  <div class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <button class="close-button" @click="closePopup">&times;</button>
      <h2 class="popup-title">{{ props.title }}</h2>
      <img v-if="props.image" :src="props.image" :alt="props.title" class="popup-image" />
      <p class="popup-text">{{ props.text }}</p>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.popup-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 90%;
  width: 500px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-out;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #333;
}

.popup-image {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 8px;
}

.popup-title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.popup-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  white-space: pre-wrap;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .popup-content {
    padding: 1.5rem;
  }
}
</style>
