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
            v-model="query"
            class="input-search"
            placeholder="Search..."
          />
          <button type="submit" class="btn-search" @click="submitSearch">
            <i class="fa fa-search"></i>
          </button>
        </form>
      </nav>
    </div>
  </header>
  <div class="wrapper">
    <div class="search">
      <span class="search-value"
        >Search results for "{{ $route.query.q1 }}"</span
      >
    </div>

    <anime-list :anime="loadAnime" v-if="!isLoad && animeSearch"></anime-list>
    <div class="no-result" v-else>No result found.</div>

    <div class="push"></div>
  </div>
  <footerUI></footerUI>
</template>

<script>
import AnimeList from "@/components/AnimeList";
import axios from "axios";
export default {
  components: {
    AnimeList,
  },
  data() {
    return {
      animeSearch: [],
      isLoad: false,
      query: "",
    };
  },
  methods: {
    submitSearch() {
      this.$router.push({
        name: "searchPage",
        query: { q1: this.query },
      });
      this.fetchAnime();
    },
    async fetchAnime() {
      try {
        this.isLoad = true;
        if (this.crit == "favoritesCount") {
          this.crit = "-" + this.crit;
        }

        const responce = await axios.get(
          "https://kitsu.io/api/edge/anime?filter[text]=" +
            this.query +
            "&fields[anime]=id,titles,posterImage,episodeCount&page[limit]=20&page[offset]=0"
        );
        this.animeSearch = responce.data.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoad = false;
      }
    },
  },
  mounted() {
    this.query = this.$route.query.q1;
    this.fetchAnime();
  },
  computed: {
    loadAnime() {
      return this.animeSearch;
    },
  },
};
</script>

<style scoped>
.search {
  padding-top: 50px;
}
.search-value {
  display: inline-block;
  font-size: 25px;
  font-weight: 400;
  padding: 0 20px;
  line-height: 40px;
  background: #79c142;
  color: white;
  border-radius: 3px 3px 0 0;
  cursor: default;
}
.header {
  background: #2c2f30;
  padding: 20px 0;
  color: white;
}
.navbar {
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
.no-result {
  margin-top: 20px;
  color: white;
  font-size: 28px;
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