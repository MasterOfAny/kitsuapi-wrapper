<template>
  <headerUI></headerUI>
  <div class="wrapper">
    <div class="anime__target" v-if="!isAnimeLoading">
      <div class="anime__header">
        <img
          v-if="animeTarget.attributes.coverImage"
          class="anime__poster large"
          :src="animeTarget.attributes.coverImage.small"
        />
        <span class="anime__title">
          <h1>{{ animeTarget.attributes.canonicalTitle }}</h1>
        </span>
      </div>
      <div class="anime__info">
        <div class="anime__description">
          <p class="anime__sinopsys">
            {{ animeTarget.attributes.description }}
          </p>
          <div class="anime__extra">
            <img
              v-if="animeTarget.attributes.posterImage"
              class="anime__poster small"
              :src="animeTarget.attributes.posterImage.small"
            />
            <div class="links">
              <div class="genre-list">
                <span class="link__header">Genre:</span>
                <span
                  class="genre"
                  v-for="(genre, index) in genres"
                  :key="index"
                >
                  {{ genre.attributes.name }},
                </span>
              </div>
              <div class="status">
                <span class="link__header">Status:</span>
                {{ animeTarget.attributes.status }}
              </div>
              <div class="duration">
                <span class="link__header">Duration: </span>
                {{ animeTarget.attributes.episodeLength }} min
              </div>
              <div class="release">
                <span class="link__header">Release: </span>
                {{ animeTarget.attributes.startDate.substring(0, 4) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="push"></div>
  </div>
  <footerUI></footerUI>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      animeTarget: null,
      id: this.$route.params.id,
      isAnimeLoading: false,
      genres: [],
      size: Number,
    };
  },
  methods: {
    async fetchTargetAnime() {
      try {
        this.isAnimeLoading = true;
        const responce = await axios.get(
          "https://kitsu.io/api/edge/anime/" + this.id
        );
        const responceGenres = await axios.get(
          "https://kitsu.io/api/edge/anime/" + this.id + "/genres"
        );
        this.animeTarget = responce.data.data;
        this.genres = responceGenres.data.data;
        this.size = this.genres.length - 3;
        this.genres.splice(3, this.size);
      } catch (e) {
        console.log(e);
      } finally {
        this.isAnimeLoading = false;
      }
    },
  },
  created() {
    this.fetchTargetAnime();
  },
};
</script>

<style>
.anime__target {
  margin-top: 20px;
}
.anime__header {
  position: relative;
}
.anime__header::before {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.425);
  z-index: 2;
  width: 100%;
  height: 100%;
}
.anime__title {
  position: absolute;
  top: 40%;
  width: 100%;
  height: auto;
  z-index: 4;
}
h1 {
  color: white;
  text-align: center;
  font-size: 50px;
  text-shadow: 4px 4px 20px rgb(255 255 255);
}
.large {
  display: block;
  width: 100%;
}
.small {
  max-width: 160px;
}
.anime__info {
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.05);
}
.anime__sinopsys {
  color: #aaaaaa;
  font-size: 20px;
  text-align: left;
}
.anime__extra {
  display: flex;

  margin-top: 20px;
}
.genre {
  color: #79c142;
  margin-right: 5px;
}
.link__header {
  color: white;
}

.genre:last-child {
  margin-right: 0;
}
.links {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  color: #79c142;
}

@media (max-width: 600px) {
  .small {
    display: none;
  }
  .anime__target {
    margin-top: 5px;
  }
  .anime__title {
    top: 30%;
  }
  .anime__description {
    display: flex;
    flex-direction: column-reverse;
  }
  .anime__info {
    padding: 0 5px;
  }
  h1 {
    font-size: 35px;
  }
  .anime__extra {
    justify-content: space-around;
  }
  .anime__sinopsys {
    text-align: justify;
    margin-top: 10px;
    font-size: 16px;
  }
  .links {
    flex-direction: row;
    margin-left: 0;
    column-gap: 8px;
    font-size: 14px;
  }
}
</style>