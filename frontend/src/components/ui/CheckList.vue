<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <ul class="check-list">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
</template>
