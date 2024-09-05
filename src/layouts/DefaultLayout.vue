<script setup lang="ts">
  import { useRoute } from 'vue-router';

  const route = useRoute()
</script>

<template>
  <div class="wrapper">
    <div class="sidebar">
      <sidebar-logo />
      <sidebar-menu />
    </div>
    <div class="wrap-container">
      <div class="toolbar">
        <span>left</span>
        <span>right</span>
      </div>
      <div class="wrap-content">
        <h1 class="h1-title">{{ route.meta.title }}</h1>
        <div class="article">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    height: 100dvh;
    overflow: hidden;
  }
  .wrap-container {
    display: flex;
    flex-direction: column;
    background-color: #F0F0F7;
    width: 100%;
  }
  .sidebar {
    background-color: #43425D;
    width: 260px;
    min-width: 260px;
    color: #FFFFFF;
    height: 100dvh;
    overflow: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .toolbar {
    box-shadow: 0 2px 6px #0000000A;
    height: 70px;
    min-height: 70px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
    background-color: #FFFFFF;
  }

  .wrap-content {
    padding: 32px 70px;
    overflow: auto;
  }

  .h1-title {
    margin-bottom: 32px;
    font-weight: 300;
    line-height: 36px;
    font-size: 28px;
  }

  .article {
    box-shadow: 0 2px 6px #0000000A;
    background-color: #FFFFFF;
    padding: 19px 20px;
  }
</style>
