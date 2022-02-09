<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  height: 100vh;
}
body,
html {
  height: 100%;
  background-color: #1a1a1a;
}

.wrapper {
  margin: 0 auto;
  max-width: 1600px;
  min-height: 100vh;
  margin-bottom: -20px;
}

.container {
  margin: 0 auto;
  max-width: 1600px;
}

.push {
  height: 50px;
}
@media (max-width: 1800px) and (min-width: 1301px) {
  .container,
  .wrapper {
    padding: 0 80px;
  }
}
@media (max-width: 1300px) and (min-width: 601px) {
  .container,
  .wrapper {
    padding: 0 40px;
  }
}
@media (max-width: 600px) {
  .container {
    padding: 0 15px;
  }
  .wrapper {
    padding: 0 15px;
  }
}
</style>
