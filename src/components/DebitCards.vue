<template>
  <div class="debit-cards">
    <button class="show-card-number" @click="isShowCardNumber = !isShowCardNumber">
      <img src="@/assets/show-eye-icon.svg" alt="eye icon" />
      <p v-if="isShowCardNumber">Hide card number</p>
      <p v-else>Show card number</p>
    </button>
    <el-carousel
      :interval="2000"
      arrow="never"
      height="auto"
      indicator-position="outside"
      @change="onChange"
    >
      <el-carousel-item
        v-for="card in debitCardsDetails"
        :key="card.cardName"
        :class="{ 'grey-out': isFrozen(card.cardStatus) }"
      >
        <img src="@/assets/aspire-logo.svg" alt="aspire logo" />
        <p class="card-name">{{ card.cardName }}</p>
        <div class="card-number">
          <template v-if="!isShowCardNumber">
            <div class="dot" v-for="dot in 12" :key="dot" />
          </template>
          {{ getFormatedCardNumber(card.cardNumber) }}
        </div>
        <div class="crad-expiry-cvv">
          <p class="expiry">Thru: {{ card.expiryDate }}</p>
          <p class="cvv">
            CVV: <span>{{ getFormatedCardCvv(card.cardCvv) }}</span>
          </p>
        </div>
        <img src="@/assets/visa-logo.svg" alt="visa logo" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { CardStatus, type DebitCard } from '@/types'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import { ref } from 'vue'

defineProps({
  debitCardsDetails: {
    type: Array<DebitCard>,
    required: true,
  },
})
const emit = defineEmits(['currentCard'])

const isShowCardNumber = ref<boolean>(false)

const getFormatedCardNumber = (cardNumber: string) => {
  // Remove - betrween 4 digits
  cardNumber = cardNumber.replace(/-/g, ' ')
  if (isShowCardNumber.value) {
    return cardNumber
  }
  return cardNumber.slice(-4)
}

const getFormatedCardCvv = (cardCvv: number) => {
  // Convert to string and replace digits with '*'
  return cardCvv.toString().replace(/\d/g, '*')
}

const isFrozen = (cardStatus: CardStatus) => {
  return cardStatus === CardStatus.FROZEN
}

const onChange = (index: number) => {
  emit('currentCard', index)
}
</script>

<style lang="scss" scoped>
.debit-cards {
  position: relative;
  color: $white;
  padding-top: 20px;

  :deep(.el-carousel__container) {
    background-color: $green;
    border-radius: 24px;

    .el-carousel__item {
      padding: 26px;
      height: max-content;

      &.grey-out {
        opacity: 0.3;
      }
    }

    img {
      float: right;
    }
  }

  :deep(.el-carousel__indicator) {
    .el-carousel__button {
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background-color: rgba(1, 209, 103, 1);
    }

    &.is-active {
      .el-carousel__button {
        background-color: $green;
        width: 16px;
      }
    }
  }

  .card-name {
    font-weight: bold;
    font-size: 24px;
    letter-spacing: 1px;
    margin-top: 50px;
  }

  .card-number {
    font-size: 14px;
    margin-top: 26px;
    font-weight: bold;
    letter-spacing: 3px;

    .dot {
      width: 9px;
      height: 9px;
      background-color: $white;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;

      &:nth-child(4n) {
        margin-right: 26px;
      }
    }
  }

  .show-card-number {
    @include flex;
    position: absolute;
    right: 0;
    top: -12px;
    background-color: $white;
    color: $green;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;

    img {
      margin-right: 8px;
    }
  }

  .crad-expiry-cvv {
    @include flex;
    margin-top: 16px;
    font-size: 13px;
    font-weight: bold;

    .expiry {
      margin-right: 36px;
    }

    .cvv {
      position: relative;

      span {
        position: absolute;
        margin-left: 6px;
        font-size: 32px;
        top: -5px;
        letter-spacing: 2px;
      }
    }
  }
}

@media (max-width: 1024px) {
  .show-card-number {
    padding: 8px 8px 24px;
    border-radius: 8px;
    top: -6px !important;
  }
}
</style>
