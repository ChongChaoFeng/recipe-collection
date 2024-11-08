<template>
  <div
    class="modal fade"
    id="recipeModal"
    tabindex="-1"
    aria-labelledby="recipeModalLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="recipeModalLabel">{{ selectedRecipe.name ?? 'N/A' }}</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p><strong>Author:</strong> {{ selectedRecipe.author ?? 'N/A' }}</p>

          <img
            :src="
              Array.isArray(selectedRecipe.image) ? selectedRecipe.image[0] : selectedRecipe.image
            "
            width="200"
            alt="recipe image"
            class="img-fluid mb-3"
          />
          <h6>Ingredients</h6>
          <ul>
            <li v-for="ingredient in selectedRecipe.ingredients" :key="ingredient">
              {{ ingredient }}
            </li>
          </ul>
          <h6>Instructions:</h6>
          <ol>
            <li v-for="step in selectedRecipe.instructions" :key="step">
              {{ step.text }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps({
  selectedRecipe: Object,
  showModal: Boolean,
})

const emit = defineEmits(['close'])
const modalRef = ref(null)
let modalInstance = null

onMounted(() => {
  nextTick(() => {
    if (modalRef.value) {
      modalInstance = new Modal(modalRef.value, {
        backdrop: 'static', // Prevents closing the modal on outside click
        keyboard: false,
      })
    }
  })
})

watch(
  () => props.showModal,
  (newVal) => {
    if (newVal && modalInstance) {
      modalInstance.show()
    } else if (modalInstance) {
      modalInstance.hide()
    }
  },
)

const closeModal = () => {
  if (modalInstance) {
    modalInstance.hide()
    emit('close')
  }
}
</script>

<style scoped></style>
