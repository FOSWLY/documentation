<template>
  <div class="page-bg">
    <img class="page-bg__image" src="/bg.png" />
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
.page-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  pointer-events: none;
  overflow: hidden;
}

.page-bg__image {
  width: 90rem;
  max-width: none;
  max-height: 60vh;
}
</style>