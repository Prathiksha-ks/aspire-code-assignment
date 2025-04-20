<template>
  <main class="cards-view">
    <template v-if="isLoading">
      <p>Loading...</p>
    </template>
    <template v-else-if="isError">
      <p>Error loading data</p>
    </template>
    <template v-else>
      <p class="title">Available balance</p>
      <div class="balance-container">
        <div class="balance">
          <div class="unit">S$</div>
          <p class="amount">{{ balance.toLocaleString() }}</p>
        </div>
        <button class="add-card-btn" @click="isAddNewCardVisible = true">
          <img src="@/assets/plus-icon.svg" alt="plus icon" />
          New card
        </button>
      </div>
      <el-tabs v-model="activeName" class="tabs">
        <el-tab-pane label="My debit cards" name="Debit cards">
          <MyDebitCards />
        </el-tab-pane>
        <el-tab-pane label="All company cards" name="Company cards"
          >All company cards Details</el-tab-pane
        >
      </el-tabs>
      <AddNewCard
        v-model="isAddNewCardVisible"
        :isVisible="isAddNewCardVisible"
        @close="isAddNewCardVisible = false"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import MyDebitCards from '@/components/MyDebitCards.vue'
import { useCardsStore } from '@/stores/cards'
import AddNewCard from '@/components/AddNewCard.vue'

// We need to make api call to get the balance and debit cards details
const balance = 3000
const activeName = ref<string>('Debit cards')
const isLoading = ref<boolean>(false)
const isError = ref<boolean>(false)
const isAddNewCardVisible = ref<boolean>(false)
const store = useCardsStore()

onMounted(() => {
  getDebitCardsDetails()
})

const getDebitCardsDetails = async () => {
  // Simulate an API call to fetch debit cards details
  // Used some random userId = 1
  try {
    isLoading.value = true
    await store.dispatchGetDebitCardsDetails(1)
  } catch (error) {
    isError.value = true
    console.error('Error fetching debit cards details:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.cards-view {
  width: 100%;
  padding: 60px;

  .title {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .balance-container {
    @include flex(row, space-between, center);
    margin-bottom: 34px;

    .balance {
      @include flex(row, center, center);
      font-weight: bold;

      .unit {
        padding: 6px 13px;
        background-color: $green;
        color: $white;
        border-radius: 4px;
        font-size: 13px;
        margin-right: 12px;
      }

      .amount {
        font-size: 26px;
      }
    }

    .add-card-btn {
      @include flex;
      background-color: $mid-blue;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: bold;
      color: $white;
      border-radius: 4px;

      img {
        margin-right: 8px;
      }
    }
  }

  .el-tabs {
    --el-tabs-header-height: 32px;

    :deep(.el-tabs__item) {
      font-family: Avenir Next;
      opacity: 0.3;

      &.is-active {
        opacity: 1;
        color: $dark;
        font-weight: 600;

        &:hover {
          color: $dark;
        }
      }

      &:hover {
        color: $aqua-blue;
      }
    }

    :deep(.el-tabs__active-bar) {
      background-color: $aqua-blue;
    }

    :deep(.el-tabs__nav-wrap::after) {
      background-color: $white;
    }

    :deep(.el-tabs__header) {
      margin-bottom: 0px;
    }
  }
}

// Mobile styles
@media (max-width: 1024px) {
  .cards-view {
    padding: 0 24px 30px;

    .add-card-btn {
      color: $aqua-blue !important;
      background-color: $prussian-blue !important;
    }

    .el-tabs {
      :deep(.el-tabs__item) {
        color: rgba(255, 255, 255, 0.5);

        &.is-active {
          opacity: 1;
          color: $white;
          font-weight: 600;

          &:hover {
            color: $white;
          }
        }
      }

      :deep(.el-tabs__nav-wrap::after) {
        background-color: $prussian-blue;
      }
    }
  }
}
</style>
