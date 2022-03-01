<template >
  <div class="anime-list" v-show="anime">
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
.anime-list {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 186px);
  grid-row-gap: 25px;
  justify-content: center;
}
</style>