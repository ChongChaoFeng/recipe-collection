import { defineStore } from 'pinia'

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    savedRecipes: [],
  }),
  actions: {
    saveRecipe(recipe) {
      this.savedRecipes.push(recipe)
    },
    removeRecipe(index) {
      if (index !== -1) {
        this.savedRecipes.splice(index, 1)
      }
    },
    clearSavedRecipes() {
      this.savedRecipes = []
    },
  },
  getters: {
    getSavedRecipes: (state) => state.savedRecipes,
  },
  persist: true,
})
