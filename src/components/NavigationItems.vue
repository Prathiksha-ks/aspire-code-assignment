<template>
  <div
    v-for="icon in iconsList"
    :key="icon.title"
    class="item"
    @click="navigateTo(icon.title)"
    role="button"
  >
    <component :is="icon.component" :isClicked="isClicked(icon.title)" />
    <span :class="['title', { clicked: isClicked(icon.title) }]">{{ icon.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HomeIcon from '../components/icons/HomeIcon.vue'
import CardIcon from '../components/icons/CardIcon.vue'
import PaymentsIcon from '../components/icons/PaymentsIcon.vue'
import CreditIcon from '../components/icons/CreditIcon.vue'
import ProfileIcon from '../components/icons/ProfileIcon.vue'

const router = useRouter()
const route = useRoute()
const activeIcon = ref('Home')

const iconsList = [
  { component: HomeIcon, title: 'Home' },
  { component: CardIcon, title: 'Cards' },
  { component: PaymentsIcon, title: 'Payments' },
  { component: CreditIcon, title: 'Credit' },
  { component: ProfileIcon, title: 'Profile' },
]

const isClicked = (title: string) => activeIcon.value === title

const navigateTo = (title: string) => {
  activeIcon.value = title
  const routeName = title.toLowerCase()
  router.push({ name: routeName })
}

watch(
  () => route.name,
  (newRouteName) => {
    const icon = iconsList.find((icon) => icon.title.toLowerCase() === newRouteName)
    if (icon) {
      activeIcon.value = icon.title
    }
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.item {
  @include flex(row, flex-start, center);
  padding: 30px 0;
  cursor: pointer;

  .title {
    margin-left: 16px;
    font-size: 16px;
    color: $white;

    &.clicked {
      color: $green;
      font-weight: bold;
    }
  }
}

@media (max-width: 1024px) {
  .item {
    @include flex(column, center, center);
    padding: 0;

    .title {
      color: $light-grey;
      margin-left: 0;
      margin-top: 4px;
      font-size: 9px;
    }
  }
}
</style>
