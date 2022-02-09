<template >
  <div class="anime__list-wrapper" v-show="anime">
    <anime-item
      v-for="(series, index) in anime"
      :series="series"
      :key="index + 1"
    />
  </div>
</template>

<script>
import AnimeItem from "@/components/AnimeItem";
export default {
  components: { AnimeItem },
  props: {
    anime: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.anime__list-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 50px;
  row-gap: 50px;
  column-gap: 25px;
}

@media (max-width: 1800px) and (min-width: 601px) {
  .anime__list-wrapper {
    row-gap: 20px;
    column-gap: 35px;
    justify-content: center;
  }
}
@media (max-width: 600px) {
  .anime__list-wrapper {
    row-gap: 20px;
    column-gap: 15px;
    justify-content: center;
    margin-top: 15px;
  }
}
</style>