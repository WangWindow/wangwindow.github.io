<script setup lang="ts">
import { computed } from 'vue'

const now = computed(() => new Date().toLocaleString())
</script>

<template>
  <div class="now-time">
    <span>当前时间：</span>
    <code>{{ now }}</code>
  </div>
</template>

<style scoped>
.now-time {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px dashed var(--vp-c-border);
}

.now-time code {
  font-family: var(--vp-font-family-mono);
}
</style>
