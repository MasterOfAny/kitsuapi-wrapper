<template>
  <headerUI></headerUI>
  <div class="wrapper">
    <transition name="list" appear>
      <anime-list :anime="loadAnime" v-show="!isAnimeLoading" />
    </transition>
    <div class="page__wrapper">
      <a
        v-for="(pageNumber, index) in pages"
        :key="pageNumber"
        :class="[page === pageNumber ? 'current-page' : 'page']"
        @click="page !== pageNumber ? changePage(pageNumber, index) : {}"
      >
        <span v-if="page > 3 && index === 0"> First</span>
        <span v-else-if="index === 5">Last</span>
        <span v-else>{{ pageNumber }}</span>
      </a>
    </div>
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
      anime: [],
      pages: [1, 2, 3, 4, 5, undefined],
      isAnimeLoading: false,
      totalPages: 5,
      offset: 0,
      page: 1,
      last: Number,
    };
  },

  methods: {
    changePage(pageNumber, index) {
      this.page = pageNumber;
      this.offset = 0 + this.page * 32 - 32;
      if (pageNumber === this.last) {
        for (let i = 1; i < 5; i++) {
          this.pages[i] = this.last + (i - 5);
        }
      } else if (pageNumber >= 4 && pageNumber <= this.last - 4) {
        for (let i = 1; i < 5; i++) {
          this.pages[i] += index - 2;
        }
      } else if (pageNumber == 3 || pageNumber == 1) {
        for (let i = 1; i < 5; i++) this.pages[i] = i + 1;
      }
      this.fetchAnime();
    },
    async fetchAnime() {
      try {
        this.isAnimeLoading = true;
        const responce = await axios.get(
          "https://kitsu.io/api/edge/anime?filter[subtype]=TV&sort=popularityRank&fields[anime]=id,titles,posterImage,episodeCount&page[limit]=16" +
            "&page[offset]=" +
            this.offset
        );
        const arr1 = responce.data.data;
        const responce2 = await axios.get(
          "https://kitsu.io/api/edge/anime?filter[subtype]=TV&sort=popularityRank&fields[anime]=id,titles,posterImage,episodeCount&page[limit]=16" +
            "&page[offset]=" +
            (this.offset + 16)
        );
        const arr2 = responce2.data.data;
        this.anime = arr1.concat(arr2);
        this.pages[5] = Math.ceil(responce.data.meta.count / 32);
        this.last = this.pages[5];
      } catch (e) {
        console.log(e);
      } finally {
        this.isAnimeLoading = false;
      }
    },
  },
  mounted() {
    this.fetchAnime();
  },
  computed: {
    loadAnime() {
      return this.anime;
    },
  },
};
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  padding-top: 30px;
  padding-bottom: 50px;
  justify-content: center;
}
.page,
.current-page {
  margin-right: 10px;
  padding: 10px;
  cursor: pointer;
  background: #252525;
  color: white;
}
.current-page {
  background: #79c142;
  cursor: default;
}
.page:hover {
  background-color: #eee;
  color: #23527c;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
