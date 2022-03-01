<template>
  <headerUI></headerUI>
  <div class="wrapper">
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
      <anime-list :anime="uploadAnime" />
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

.loader {
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #ffffff;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.loader:after {
  background: #2c3e50;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>