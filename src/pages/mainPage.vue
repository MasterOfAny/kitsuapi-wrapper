<template>
  <headerUI></headerUI>
  <div class="wrapper">
    <!-- Сортировка по алфавиту? -->
    <div class="sug-field">
      <span class="sug">Suggestion</span>
      <ul class="sug-nav">
        <li :class="{ active: isF }">
          <a class="sug-item" @click="changeSug('popularityRank')">Featured</a>
        </li>
        <li :class="{ active: isMF }">
          <a class="sug-item" @click="changeSug('favoritesCount')"
            >Most Favorite</a
          >
        </li>
        <li :class="{ active: isT }">
          <a class="sug-item" @click="changeSug('ratingRank')">Top rating</a>
        </li>
      </ul>
    </div>
    <transition name="list">
      <anime-list :anime="uploadAnime" v-show="!isLoad" />
    </transition>

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
      animeList: [],
      crit: "popularityRank",
      totalPages: 6,
      offset: 0,
      page: 1,
      isLoad: false,
      isF: true,
      isMF: false,
      isT: false,
    };
  },
  methods: {
    changeSug(crit) {
      this.crit = crit;
      if (crit == "popularityRank") {
        this.isF = !this.isF;
        this.isMF = false;
        this.isT = false;
      } else if (crit == "favoritesCount") {
        this.isMF = !this.isMF;
        this.isF = false;
        this.isT = false;
      } else if (crit == "ratingRank") {
        this.isT = !this.isT;
        this.isF = false;
        this.isMF = false;
      }
      this.fetchAnime();
    },
    async fetchAnime() {
      try {
        this.isLoad = true;
        if (this.crit == "favoritesCount") {
          this.crit = "-" + this.crit;
        }

        const responce = await axios.get(
          "https://kitsu.io/api/edge/anime?sort=" +
            this.crit +
            "&fields[anime]=id,titles,posterImage,episodeCount&page[limit]=16&page[offset]=0"
        );
        this.animeList = responce.data.data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoad = false;
      }
    },
  },
  mounted() {
    this.fetchAnime();
  },
  computed: {
    uploadAnime() {
      return this.animeList;
    },
  },
};
</script>

<style>
.sug-field {
  padding-top: 50px;
  display: flex;
  align-items: center;
}
.sug {
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
.sug-nav {
  list-style: none;
  margin-left: 15px;
  display: flex;
  column-gap: 5px;
}

.sug-nav > .active {
  background-color: #303030;
  cursor: default;
}

.sug-nav > li:hover {
  background-color: #303030;
}

.sug-item {
  display: block;
  color: white;
  font-size: 20px;
  padding: 0 15px;
  line-height: 40px;
  cursor: pointer;
}
.list-enter-active,
.list-leave-active {
  transition: all 2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
@media (max-width: 600px) {
  .sug-field {
    padding-top: 10px;
    display: block;
  }
  .sug-nav {
    flex-direction: column;
    margin-left: 0;
    text-align: center;
  }
}
</style>