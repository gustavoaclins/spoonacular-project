<template>
  <div v-if="recipe" class="recipe-container">
    <h1 class="recipe-title">{{ recipe.title }}</h1>
    <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />

    <div class="health-info">
      <h3 class="section-title">Health Information</h3>
      <ul class="info-list">
        <li v-for="diet in recipe.diets" :key="diet">{{ diet }}</li>
      </ul>
    </div>

    <div class="ingredients">
      <h3 class="section-title">Ingredients</h3>
      <ul class="info-list">
        <li v-for="ingredient in recipe.extendedIngredients" :key="ingredient.id">
          {{ ingredient.name }}: {{ ingredient.amount }} {{ ingredient.unit }}
        </li>
      </ul>
    </div>

    <div class="instructions">
      <h3 class="section-title">Detailed Instructions</h3>
      <ul class="info-list">
        <li v-for="step in recipe.analyzedInstructions[0].steps" :key="step.id" class="instructions-text">
          {{ step.step }}
        </li>
      </ul>
    </div>

    <router-link to="/" class="home-link">Go back to All Recipes</router-link>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const recipe = ref(null);
    const route = useRoute();
    const apiKey = process.env.VUE_APP_SPOONACULAR_API_KEY;

    onMounted(async () => {
      const recipeId = route.params.id;
      const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        recipe.value = data;
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    });

    return {
      recipe,
    };
  },
};
</script>

<style scoped>
.recipe-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.recipe-title {
  color: darkblue;
  text-align: center;
  margin-bottom: 20px;
}

.recipe-image {
  width: 100%;
  max-height: 400px; /* Set maximum height */
  object-fit: cover; /* Maintain aspect ratio and cover */
  border-radius: 10px;
  margin-bottom: 20px;
}

.section-title {
  color: darkblue;
  border-bottom: 2px solid lightblue;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.info-list {
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  color: darkblue;
}

.info-list li {
  background-color: lightblue;
  padding: 8px;
  margin: 5px 0;
  border-radius: 5px;
}

.instructions {
  margin-bottom: 20px;
}

.instructions-text {
  color: darkblue;
  line-height: 1.5;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background-color: darkblue;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: lightblue;
}
</style>
