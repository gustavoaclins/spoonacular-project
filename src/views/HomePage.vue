<template>
  <div class="container">
    <div class="search-container">
      <input
        v-model="searchInput"
        class="input"
        placeholder="Search for recipes"
      />
      <select v-model="selectedCuisine" class="select">
        <option value="">Select Cuisine</option>
        <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
          {{ cuisine }}
        </option>
      </select>
      <button @click="performSearch" class="btn">Search</button>
    </div>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="recipes.length !== 0 && !loading" class="recipe-grid">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        @click="goToDetail(recipe.id)"
        class="recipe-card"
      >
        <h3>{{ recipe.title }}</h3>
        <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
      </div>
    </div>

    <pagination
      v-if="recipes.length !== 0 && !loading"
      :total="totalResults"
      :current-page="currentPage"
      @page-changed="changePage"
    />

    <div v-if="recipes.length === 0 && !loading">
      <p>No recipes found.</p>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>


<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Pagination from "@/components/Pagination.vue";

export default {
  components: { Pagination },

  setup() {
    const searchInput = ref("");
    const recipes = ref([]);
    const totalResults = ref(0);
    const currentPage = ref(1);
    const selectedCuisine = ref("");
    const pageSize = 5;
    const apiKey = process.env.VUE_APP_SPOONACULAR_API_KEY;
    const errorMessage = ref("");
    const loading = ref(true);
    const router = useRouter();

    const cuisines = [
      "African",
      "Asian",
      "American",
      "British",
      "Cajun",
      "Caribbean",
      "Chinese",
      "Eastern European",
      "European",
      "French",
      "German",
      "Greek",
      "Indian",
      "Irish",
      "Italian",
      "Japanese",
      "Jewish",
      "Korean",
      "Latin American",
      "Mediterranean",
      "Mexican",
      "Middle Eastern",
      "Nordic",
      "Southern",
      "Spanish",
      "Thai",
      "Vietnamese",
    ];

    const fetchAllRecipes = async () => {
      errorMessage.value = "";
      loading.value = true;
      const url = `https://api.spoonacular.com/recipes/complexSearch?number=${pageSize}&offset=${
        (currentPage.value - 1) * pageSize
      }&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        recipes.value = [...data.results];
        totalResults.value = data.totalResults || 0;
      } catch (error) {
        errorMessage.value = "Error fetching recipes. Please try again.";
      } finally {
        loading.value = false;
      }
    };

    const searchRecipes = async () => {
      errorMessage.value = "";
      loading.value = true;
      const searchQuery = searchInput.value || "";
      const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&cuisine=${
        selectedCuisine.value
      }&number=${pageSize}&offset=${
        (currentPage.value - 1) * pageSize
      }&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        recipes.value = [...data.results];
        totalResults.value = data.totalResults || 0;
      } catch (error) {
        errorMessage.value = "Error fetching recipes. Please try again.";
      } finally {
        loading.value = false;
      }
    };

    const changePage = (page) => {
      currentPage.value = page;

      searchInput.value || selectedCuisine.value
        ? searchRecipes()
        : fetchAllRecipes();
    };

    const performSearch = () => {
      currentPage.value = 1;
      searchInput.value || selectedCuisine.value
        ? searchRecipes()
        : fetchAllRecipes();
    };

    const goToDetail = (id) => {
      router.push({ name: "RecipeDetail", params: { id } });
    };

    onMounted(() => {
      fetchAllRecipes();
    });

    return {
      searchInput,
      selectedCuisine,
      recipes,
      totalResults,
      currentPage,
      fetchAllRecipes,
      searchRecipes,
      performSearch,
      changePage,
      cuisines,
      goToDetail,
      errorMessage,
      loading
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  color: darkblue;
}

.search-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.input,
.select {
  flex: 1;
  min-width: 200px;
  padding: 10px;
  border: 1px solid lightblue;
  border-radius: 5px;
  color: darkblue;
}

.btn {
  background-color: darkblue;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: lightblue;
}

.loading {
  font-size: 18px;
  color: darkblue;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.recipe-card {
  background-color: lightblue;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.3s;
}

.recipe-card:hover {
  transform: scale(1.05);
}

.recipe-image {
  width: 100%;
  border-radius: 5px;
}

.error-message {
  color: darkblue;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }

  .recipe-grid {
    grid-template-columns: 1fr;
  }
}
</style>


