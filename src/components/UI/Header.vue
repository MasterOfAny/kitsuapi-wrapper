<template>
  <header class="header">
    <div class="container">
      <nav class="navbar">
        <router-link :to="{ name: 'main' }" class="header__logo"
          >Anime-api wrapper</router-link
        >
        <div class="header__links">
          <a class="header__btn">movies</a>
          <router-link :to="{ name: 'allAnime' }" class="header__btn"
            >series</router-link
          >
          <a class="header__btn">genres</a>
        </div>
        <form id="search" @submit.prevent>
          <my-input
            v-model="searchQuery"
            class="input-search"
            placeholder="Search..."
          />
          <button
            type="submit"
            class="btn-search"
            @click="
              $router.push({
                name: 'searchPage',
                query: { q1: searchQuery },
              })
            "
          >
            <i class="fa fa-search"></i>
          </button>
        </form>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "headerUI",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {},
};
</script>

<style>
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
.header__links {
  display: flex;
  column-gap: 20px;
  margin-left: 200px;
}
a {
  text-decoration: none;
  cursor: pointer;
}
.header__logo {
  color: #79c142;
  cursor: pointer;
  font-size: 28px;
}

#search {
  margin-left: auto;
}
.input-search {
  width: 400px;
}

.header__btn {
  font-size: 20px;
  color: white;
}
.header__btn:hover {
  color: #79c142;
}
.btn-search {
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
  .header__links {
    margin-left: 50px;
  }
  .input-search {
    width: 350px;
  }
}
@media (max-width: 1000px) {
  .header {
    padding: 0;
    padding-bottom: 10px;
  }
  #search {
    margin-top: 10px;
    text-align: center;
  }
  .input-search {
    width: 80%;
  }
  .header__links {
    margin-top: 10px;
    display: flex;
    column-gap: 20px;
    margin-left: 0;
  }
  .navbar {
    display: block;
  }
}
</style>