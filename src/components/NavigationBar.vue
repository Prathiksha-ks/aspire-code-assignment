<template>
  <img v-if="!isWeb" src="@/assets/logo-mobile.svg" alt="logo" class="mobile-logo" />
  <div class="navigation-bar">
    <template v-if="isWeb">
      <img src="@/assets/logo-web.svg" alt="logo" />
      <p class="description">Trusted way of banking for 3,000+ SMEs and startups in Singapore</p>
    </template>
    <NavigationItems />
  </div>
</template>

<script setup lang="ts">
import NavigationItems from './NavigationItems.vue'
import { useIsWeb } from '../composables/useIsWeb'

const { isWeb } = useIsWeb()
</script>

<style lang="scss" scoped>
.navigation-bar {
  background-color: $prussian-blue;
  width: 340px;
  padding: 48px;

  .description {
    color: rgba(255, 255, 255, 0.3);
    padding: 20px 0 50px;
  }
}

@media (max-width: 1024px) {
  .navigation-bar {
    @include flex(row, space-between, center);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: $white;
    padding: 8px 30px;
    box-shadow: 0px -3px 6px #00000014;
    z-index: 10;
  }

  .mobile-logo {
    align-self: flex-end;
    margin-right: 24px;
  }
}
</style>
