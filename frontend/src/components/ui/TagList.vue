<script setup>
defineProps({
  tags: { type: Array, required: true },
})
</script>

<template>
  <ul class="tag-list">
    <li v-for="tag in tags" :key="tag">#{{ tag }}</li>
  </ul>
</template>
