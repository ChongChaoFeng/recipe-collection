<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toastElement">
      <div class="toast-header">
        <strong class="me-auto">{{ header }}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">{{ body }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { Toast } from 'bootstrap'

const props = defineProps({
  header: {
    type: String,
    default: 'Action Success',
  },
  body: {
    type: String,
    default: 'Your action is completed!',
  },
})

const toastElement = ref(null)
let toastInstance = null

onMounted(async () => {
  await nextTick()
  if (toastElement.value) {
    toastInstance = Toast.getOrCreateInstance(toastElement.value)
  }
})

const showToast = () => {
  if (toastInstance) {
    toastInstance.show()
  } else {
    console.error('Toast instance is not defined.')
  }
}

defineExpose({
  showToast,
})
</script>

<style scoped>
.toast-container {
  z-index: 1055;
}
</style>
