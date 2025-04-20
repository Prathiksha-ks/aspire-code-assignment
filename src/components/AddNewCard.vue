<template>
  <el-dialog v-model="dialogVisible" @close="resetForm">
    <h1 class="dialog-title">Add new card</h1>
    <div class="dialog-content">
      <el-form :model="{ cardName }" :rules="rules" label-width="120px">
        <el-form-item label="Card name" prop="cardName">
          <el-input v-model="cardName" placeholder="Enter card name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button @click="closeDialog()">Cancel</el-button>
      <el-button class="submit" @click="addCard()" :disabled="isDisabled">Create</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { useCardsStore } from '@/stores/cards'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close'])
const store = useCardsStore()
const dialogVisible = ref<boolean>(props.isVisible)
const cardName = ref<string>('')
const errorMessage = ref<string>('')

// Validation rules
const rules = {
  cardName: [
    {
      validator: (rule: any, value: string, callback: (error?: Error) => void) => {
        if (!/^[A-Z]/.test(value)) {
          errorMessage.value = 'Card name must start with a capital letter'
          callback(new Error(errorMessage.value))
        } else {
          errorMessage.value = ''
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

const resetForm = () => {
  cardName.value = ''
  errorMessage.value = ''
}

const closeDialog = () => {
  resetForm()
  dialogVisible.value = false
  emit('close')
}

const addCard = async () => {
  try {
    await store.dispatchAddDebitCard(cardName.value)
    closeDialog()
  } catch (error) {
    // We can handle the error here by showing a message to the user
    console.error('Error adding card:', error)
  }
}

const isDisabled = computed(() => {
  return cardName.value.trim() === '' || errorMessage.value.length > 0
})
</script>

<style lang="scss" scoped>
h1 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: $prussian-blue;
}

:deep(.el-form-item__label) {
  color: $prussian-blue;
}

.el-button {
  color: $prussian-blue;

  &.submit {
    background-color: $prussian-blue;
    color: $white;
  }

  &.submit:disabled {
    background-color: $grey;
    color: $white;
  }
}

.dialog-footer {
  padding-top: 32px;
  text-align: center;
}
</style>
