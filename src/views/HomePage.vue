<template>
  <RecipeList title="Recipes List" :isSavedRecipe="false" :recipes="recipes" />
</template>

<script setup>
import RecipeList from '@/components/RecipeList.vue'
import { reactive, onMounted } from 'vue'
import axios from 'axios'

const recipes = reactive([])

const fetchRecipes = async () => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json',
    )
    recipes.length = 0
    recipes.push(...response.data)
  } catch (error) {
    console.error('Error fetching recipes:', error)
  }
}

onMounted(fetchRecipes)
</script>

<style scoped></style>
