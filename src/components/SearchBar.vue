<template>
  <div class="d-flex justify-content-end">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <p class="mb-0 me-4" style="color: #6c757d">{{ filteredRecipes.length }} item(s)</p>
      <div>
        <input
          type="text"
          class="search form-control"
          placeholder="Search Recipe..."
          v-model="searchTerm"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  recipes: Object,
})

const emit = defineEmits(['search'])

const searchTerm = ref('')

const filteredRecipes = computed(() => {
  const term = String(searchTerm.value || '').toLowerCase()
  return props.recipes.filter((item) => {
    const name = String(item.name || '').toLowerCase()
    const category = String(item.recipeCategory || '').toLowerCase()
    const cuisine = String(item.recipeCuisine || '').toLowerCase()
    return name.includes(term) || category.includes(term) || cuisine.includes(term)
  })
})

watch(filteredRecipes, (newValue) => {
  emit('search', newValue)
})
</script>
