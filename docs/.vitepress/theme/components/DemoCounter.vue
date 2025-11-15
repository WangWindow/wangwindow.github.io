<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="demo-counter">
    <p>这是一个示例计数器组件：</p>
    <button type="button" @click="count++">
      点击了 {{ count }} 次
    </button>
  </div>
</template>

<style scoped>
.demo-counter {
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--vp-c-border);
  background: rgba(148, 163, 184, 0.08);
}

.demo-counter button {
  margin-top: 0.5rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 0.9rem;
}

.demo-counter button:hover {
  opacity: 0.9;
}
</style>
