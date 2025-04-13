<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-outline-before>
      Мой пользовательский контент в верхней части боковой панели
    </template>
  </Layout>
</template>