<script setup>
defineProps({
  src: { type: String, default: null },
  alt: { type: String, default: '' },
  label: { type: String, default: '画像準備中' },
  ratio: { type: String, default: '4 / 3' },
})
</script>

<template>
  <img v-if="src" :src="src" :alt="alt" class="placeholder-image-real" />
  <div v-else class="placeholder-image" :style="{ aspectRatio: ratio }">
    {{ label }}
  </div>
</template>

<style scoped>
.placeholder-image-real {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-md);
}
</style>
