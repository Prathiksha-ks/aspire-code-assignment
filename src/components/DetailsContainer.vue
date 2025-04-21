<template>
  <div class="details-container">
    <div :class="['header-content', { expand: !isClose }]">
      <div class="right">
        <img :src="getImageUrl(icon)" alt="icon" />
        <p>{{ text }}</p>
      </div>
      <img
        @click="updateIsClose()"
        :class="['arrow-icon', { 'open-icon': !isClose }]"
        src="@/assets/arrow-icon.svg"
        alt="arrow icon"
      />
    </div>
    <slot v-if="!isClose" name="details" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getImageUrl } from '@/utils'

defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

const isClose = ref<boolean>(true)

const updateIsClose = () => {
  isClose.value = !isClose.value
}
</script>

<style lang="scss" scoped>
.details-container {
  border-radius: 8px;
  box-shadow: 0px 0px 8px #0000000a;
  margin-bottom: 24px;
  background-color: $white;

  .header-content {
    @include flex(row, space-between, center);
    padding: 24px;
    background-color: $snow-white;
    border-radius: 8px;

    .right {
      @include flex(row, center, center);
      p {
        margin-left: 12px;
        color: $prussian-blue;
        font-size: 14px;
      }
    }

    .arrow-icon {
      cursor: pointer;
      &.open-icon {
        transform: rotate(180deg);
      }
    }

    &.expand {
      border-radius: 8px 8px 0 0;
    }
  }

  @media (max-width: 1024px) {
    .details-container {
      background-color: $white;
    }
  }
}
</style>
