<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h2>
        <button v-if="isSavedRecipe" class="btn btn-outline-secondary" @click="goBack">
          <i class="bi bi-arrow-left"></i>
        </button>
        {{ title }}
      </h2>
      <button v-if="!isSavedRecipe" class="btn btn-info" @click="goToSavedRecipe">
        My saved recipe
      </button>
    </div>

    <SearchBar :recipes="isSavedRecipe ? savedRecipes : recipes" @search="showFilteredRecipes" />

    <div class="table-responsive">
      <table class="table table-striped table-hover table-fixed">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col" @click="sortColumn('name')">Recipe Name</th>
            <th scope="col" @click="sortColumn('recipeCategory')">Category</th>
            <th scope="col" @click="sortColumn('recipeCuisine')">Cuisine</th>
            <th scope="col">Image</th>
            <th scope="col" style="width: 10%"></th>
            <th scope="col" style="width: 10%"></th>
          </tr>
        </thead>
        <tbody v-if="filteredRecipes.length > 0">
          <tr v-for="(recipe, index) in filteredRecipes" :key="recipe.id">
            <td>{{ index + 1 }}</td>
            <td>{{ recipe.name ?? '-' }}</td>
            <td>{{ convertToString(recipe.recipeCategory) ?? '-' }}</td>
            <td>{{ convertToString(recipe.recipeCuisine) ?? '-' }}</td>
            <td>
              <img
                :src="Array.isArray(recipe.image) ? recipe.image[0] : recipe.image"
                alt="Image unavailable"
                class="img-thumbnail"
                width="100"
                height="100"
              />
            </td>
            <td>
              <button class="btn btn-primary btn-sm" @click="viewRecipe(recipe)">
                View Details
              </button>
            </td>
            <td v-if="!isSavedRecipe">
              <button class="btn btn-warning" @click="saveRecipe(recipe)">Save</button>
            </td>
            <td v-else>
              <button class="btn btn-danger" @click="removeRecipe(index)">
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="7" class="text-center">--- No Saved Recipe Available ---</td>
          </tr>
        </tbody>
      </table>
    </div>

    <RecipeModal :selectedRecipe="selectedRecipe" :showModal="showModal" @close="closeModal" />

    <ToastMessage ref="showToast" :header="toastHeader" :body="toastBody" />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRecipeStore } from '@/stores/recipeStore'
import RecipeModal from './RecipeModal.vue'
import SearchBar from './SearchBar.vue'
import { useRouter } from 'vue-router'
import ToastMessage from './ToastMessage.vue'

const props = defineProps({
  recipes: {
    type: Array,
    default: () => [],
  },
  title: String,
  isSavedRecipe: Boolean,
})

const router = useRouter()
const recipeStore = useRecipeStore()
const selectedRecipe = reactive({
  name: '',
  author: '',
  category: '',
  cuisine: '',
  image: '',
  ingredients: [],
  instructions: [],
})
const savedRecipes = ref([])
const filteredRecipes = ref([])
const sortOrder = ref({})
const showModal = ref(null)
const showToast = ref(null)
const toastHeader = ref('')
const toastBody = ref('')

if (props.isSavedRecipe) {
  toastHeader.value = 'Removed Successfully'
  toastBody.value = 'Your recipe is removed from "My Saved Recipe"'
} else {
  toastHeader.value = 'Saved Successfully'
  toastBody.value = 'Your recipe is added into "My Saved Recipe"'
}

// Sorting via Table Header
const sortColumn = (column) => {
  const currentOrder = sortOrder.value[column] || 'asc'
  const newOrder = currentOrder === 'asc' ? 'desc' : 'asc'

  sortOrder.value[column] = newOrder

  filteredRecipes.value = [...filteredRecipes.value].sort((a, b) => {
    const aValue = a[column] ?? ''
    const bValue = b[column] ?? ''

    if (newOrder === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
    }
  })
}

// Filter via Search Box
const showFilteredRecipes = (newFilteredRecipes) => {
  filteredRecipes.value = newFilteredRecipes
}

const viewRecipe = (recipe) => {
  selectedRecipe.name = recipe.name
  selectedRecipe.author = recipe.author?.name
  selectedRecipe.recipeCategory = recipe.recipeCategory
  selectedRecipe.recipeCuisine = recipe.recipeCuisine
  selectedRecipe.image = recipe.image
  selectedRecipe.ingredients = recipe.recipeIngredient
  selectedRecipe.instructions = recipe.recipeInstructions
  showModal.value = true
}

const saveRecipe = (recipe) => {
  recipeStore.saveRecipe(recipe)
  if (showToast.value) {
    showToast.value.showToast()
  }
}

const removeRecipe = (index) => {
  recipeStore.removeRecipe(index)
  if (showToast.value) {
    showToast.value.showToast()
  }
}

const closeModal = () => {
  showModal.value = false
}

const convertToString = (col) => {
  if (Array.isArray(col)) {
    return col.join(', ')
  }
  return col
}

const goToSavedRecipe = () => {
  router.push('/recipe/saved')
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  if (props.isSavedRecipe) {
    savedRecipes.value = recipeStore.getSavedRecipes
    filteredRecipes.value = recipeStore.getSavedRecipes
  } else {
    filteredRecipes.value = props.recipes
  }
})
</script>

<style scoped>
.container {
  height: 100%;
  /* width: 100%; */
  min-height: 500px;
}

.table-responsive {
  overflow-x: auto;
  overflow-y: auto;
  max-height: 400px;
  width: 100%;
}

.table-fixed {
  table-layout: fixed;
  width: 100%;
}

@media (max-width: 1024px) {
  .table-fixed {
    table-layout: auto;
    width: 100%;
  }
}

th,
td {
  padding: 8px;
  text-align: left;
  white-space: normal;
}

th {
  cursor: pointer;
  background-color: #3386da;
}

td img {
  max-width: 100%;
  max-height: 100px;
}
</style>
