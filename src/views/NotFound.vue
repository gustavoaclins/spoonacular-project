<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/" class="home-link">Go back to home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin: 50px auto;
  padding: 20px;
  max-width: 600px;
}

h1 {
  color: darkblue;
}

p {
  color: gray;
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