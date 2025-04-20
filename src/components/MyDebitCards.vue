<template>
  <div class="container">
    <div class="debit-cards">
      <DebitCards :debitCardsDetails="debitCardsDetails" @currentCard="currentCard" />
      <div class="card-action">
        <div
          v-for="action in cardActions"
          :key="action.icon"
          @click="action.action"
          class="action-item"
        >
          <img :src="`/src/assets/${action.icon}.svg`" alt="action icon" />
          <p>{{ action.title }}</p>
        </div>
      </div>
    </div>
    <div class="other-details">
      <DetailsContainer text="Card details" icon="card-details-icon">
        <template #details>
          <p>Card Name: {{ currentCardDetils.cardName }}</p>
          <p>Card Number: {{ currentCardDetils.cardNumber }}</p>
          <p>Expiry Date: {{ currentCardDetils.expiryDate }}</p>
          <p>CVV: {{ currentCardDetils.cardCvv }}</p>
          <p>Card Status: {{ currentCardDetils.cardStatus }}</p>
        </template>
      </DetailsContainer>
      <DetailsContainer text="Recent transactions" icon="transaction-icon">
        <template #details>
          <ul v-if="getTransactions.length">
            <li v-for="transaction in getTransactions" :key="transaction.id">
              <div class="right">
                <img
                  :src="`/src/assets/${transaction.image}.svg`"
                  alt="transaction icon"
                  class="transaction-icon"
                />
                <div class="content">
                  <p class="name">{{ transaction.name }}</p>
                  <p class="date">{{ transaction.date }}</p>
                  <div class="finance-status">
                    <img src="@/assets/finance.svg" alt="finance icon" />
                    <p>{{ getFinanceText(transaction.type) }}</p>
                  </div>
                </div>
              </div>
              <div class="left">
                <p>{{ getAmountWithUnit(transaction.type, transaction.amount) }}</p>
                <img src="@/assets/arrow-next.svg" alt="arrow next" />
              </div>
            </li>
          </ul>
          <p v-else>No data</p>
          <p v-if="currentCardDetils.transactions.length > 4" class="view-details">
            View all card transactions
          </p>
        </template>
      </DetailsContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCardsStore } from '@/stores/cards'
import { computed, onMounted, ref } from 'vue'
import DebitCards from './DebitCards.vue'
import { CardStatus, TransactionType, type DebitCard } from '@/types'
import DetailsContainer from './DetailsContainer.vue'

const store = useCardsStore()
const debitCardsDetails = ref<DebitCard[]>(store.debitCardsDetails)
const currentCardDetils = ref<DebitCard>({
  cardName: '',
  cardNumber: '',
  cardCvv: 0,
  expiryDate: '',
  cardStatus: CardStatus.UNFROZEN,
  transactions: [],
  cardType: '',
})

const getFrozenCardTitle = computed(() => {
  return isFrozen.value ? 'Unfreeze card' : 'Freeze card'
})

const isFrozen = computed(() => {
  return currentCardDetils.value?.cardStatus === CardStatus.FROZEN
})

const cardActions = [
  {
    title: getFrozenCardTitle,
    icon: 'freeze-card',
    action: () => {
      updateCardStatus()
    },
  },
  {
    title: 'Set spend limit',
    icon: 'spend-limit',
    action: () => {},
  },
  {
    title: 'Add to GPay',
    icon: 'gpay',
    action: () => {},
  },
  {
    title: 'Replace card',
    icon: 'replace-card',
    action: () => {},
  },
  {
    title: 'Cancel card',
    icon: 'deactivate-card',
    action: () => {},
  },
]

const updateCardStatus = async () => {
  const cardName = currentCardDetils.value?.cardName
  const newCardStatus = isFrozen.value ? CardStatus.UNFROZEN : CardStatus.FROZEN
  try {
    await store.dispatchUpdateDebitCardStatus(cardName, newCardStatus)
  } catch (error) {
    // We can handle the error here by showing a message to the user
    console.error('Error updating card status:', error)
  }
}

const currentCard = (index: number) => {
  currentCardDetils.value = debitCardsDetails.value[index]
}

const getFinanceText = (type: TransactionType): string => {
  return type === TransactionType.REFUND ? 'Refund on debit card' : 'Charged to debit card'
}

const getAmountWithUnit = (type: TransactionType, amount: number): string => {
  const sign = type === TransactionType.REFUND ? '+' : '-'
  return `${sign} S$ ${amount.toLocaleString()}`
}

const getTransactions = computed(() => {
  return currentCardDetils.value?.transactions.slice(0, 4)
})

onMounted(() => {
  currentCard(0)
})
</script>

<style lang="scss" scoped>
.container {
  @include flex(row, space-between);
  margin: 16px 4px;
  border-radius: 8px;
  box-shadow: 0px 2px 12px #00000014;
  padding: 40px;
}

.debit-cards {
  flex: 1;

  .card-action {
    @include flex(row, space-between, center);
    margin-top: 16px;
    padding: 26px;
    background-color: $lily-white;
    border-radius: 16px;

    .action-item {
      @include flex(column, center, center);
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 8px;
      }

      p {
        text-align: center;
        font-size: 13px;
        padding-top: 8px;
      }
    }
  }
}

.other-details {
  margin-left: 24px;
  flex: 1;

  ul {
    list-style: none;
    padding: 0 24px;

    li:not(:last-child) {
      border-bottom: 1px solid $light-grey;
    }
  }

  li {
    @include flex(row, space-between);
    padding: 16px 0;
  }

  .right {
    @include flex;
    .transaction-icon {
      padding: 16px 12px;
      background-color: $snow-white;
      border-radius: 50%;
    }

    .content {
      @include flex(column, space-between);
      margin-left: 12px;

      .name {
        font-size: 14px;
        font-weight: 600;
      }

      .date {
        font-size: 13px;
        color: $grey;
        padding-top: 4px;
      }

      .finance-status {
        @include flex(row, center, center);
        padding-top: 14px;

        img {
          background-color: $prussian-blue;
          padding: 6px;
          border-radius: 40%;
        }

        p {
          margin-left: 8px;
          font-size: 12px;
          color: $prussian-blue;
          font-weight: 600;
        }
      }
    }
  }

  .left {
    @include flex(row, center, center);
    font-size: 14px;
    font-weight: bold;

    img {
      margin-left: 16px;
    }
  }

  .view-details {
    padding: 16px;
    text-align: center;
    background-color: $mint-cream;
    color: $green;
  }
}

@media (max-width: 1024px) {
  .container {
    @include flex(column, center);
    border-radius: 0;
    box-shadow: none;
    padding: 0;
  }

  .card-action {
    color: $prussian-blue;
  }

  .other-details {
    margin-top: 24px;
    margin-left: 0;
    color: $dark;

    p,
    ul {
      background-color: $white;
    }
  }
}
</style>
