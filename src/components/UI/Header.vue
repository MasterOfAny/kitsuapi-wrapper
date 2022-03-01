<template>
  <header class="header">
    <div class="container">
      <nav class="navbar">
        <router-link :to="{ name: 'main' }" class="navbar__header-logo"
          >Anime-api wrapper</router-link
        >
        <div class="navbar__links">
          <a class="navbar__link-btn">movies</a>
          <router-link :to="{ name: 'allAnime' }" class="navbar__link-btn"
            >series</router-link
          >
          <a class="navbar__link-btn">genres</a>
        </div>
        <search-form></search-form>
      </nav>
    </div>
  </header>
</template>

<script>
import SearchForm from "@/components/SearchForm";
export default {
  components: {
    SearchForm,
  },
  name: "headerUI",
};
</script>

<style>
a {
  text-decoration: none;
  cursor: pointer;
}
.header {
  background: #2c2f30;
  padding: 20px 0;
  color: white;
}
.navbar {
  position: relative;
  padding-top: 10px;
  display: flex;
  align-items: center;
}
.navbar__header-logo {
  color: #79c142;
  cursor: pointer;
  font-size: 28px;
}
.navbar__links {
  display: flex;
  column-gap: 20px;
  margin-left: 200px;
}
.navbar__link-btn {
  font-size: 20px;
  color: white;
}
.navbar__link-btn:hover {
  color: #79c142;
}
#search {
  margin-left: auto;
}
.navbar__search-input {
  width: 400px;
}
.navbar__search-btn {
  padding: 10px 15px;
  background: none;
  color: white;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  transition: color 0.2s ease-in;
}
.fa {
  color: #79c142;
  font: normal normal normal 18px/1 FontAwesome;
}
@media (max-width: 1300px) and (min-width: 1001px) {
  .navbar__links {
    margin-left: 50px;
  }
  .navbar__search-input {
    width: 350px;
  }
}
@media (max-width: 1000px) {
  .header {
    padding: 0;
    padding-bottom: 10px;
  }
  .navbar {
    display: block;
  }
  .navbar__links {
    margin-top: 10px;
    display: flex;
    column-gap: 20px;
    margin-left: 0;
  }
  #search {
    margin-top: 10px;
    text-align: center;
  }
  .navbar__search-input {
    width: 80%;
  }
}
</style>