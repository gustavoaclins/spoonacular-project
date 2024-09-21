<template>
  <div id="app">

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>

#app {
  font-family: 'Helvetica', sans-serif;
  margin: 0;
  padding: 0;
  color: darkblue;
}

.navbar {
  background-color: white;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: darkblue;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s;
}

.nav-link:hover {
  color: lightblue;
}
</style>