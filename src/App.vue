<template>
  <div class="aspire-app">
    <NavigationBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
</script>

<style lang="scss" scoped>
.aspire-app {
  @include flex;
  height: 100%;
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .aspire-app {
    @include flex(column, flex-start, center);
    background-color: $prussian-blue;
    color: $white;
    padding-top: 20px;
  }
}
</style>
