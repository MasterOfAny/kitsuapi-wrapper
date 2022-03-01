<template>
  <router-link
    :to="{ name: 'animePage', params: { id: series.id } }"
    class="anime-card"
  >
    <img
      :src="series.attributes.posterImage.small"
      src-placeholder="../assets/logo.png"
    />
    <span class="anime-card__episodes"
      >eps<i>{{
        series.attributes.episodeCount ? series.attributes.episodeCount : "-"
      }}</i></span
    >
    <span class="anime-card__name">
      <h2>
        {{
          series.attributes.titles["en"]
            ? series.attributes.titles["en"]
            : series.attributes.titles["en_jp"]
            ? series.attributes.titles["en_jp"]
            : series.attributes.titles["en_cn"]
            ? series.attributes.titles["en_cn"]
            : series.attributes.titles["en_us"]
        }}
      </h2>
    </span>
  </router-link>
</template>

<script>
export default {
  props: {
    series: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.anime-card {
  display: inline-block;
  max-width: 166px;
  position: relative;
  height: 100%;
  z-index: 1;
  cursor: pointer;
  opacity: 1;
  justify-self: center;
}
.anime-card:hover::before {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.534);
  z-index: 7;
  width: 100%;
  height: 100%;
}
.anime-card__episodes {
  position: absolute;
  right: 10px;
  top: 10px;
  padding-top: 8px;
  width: 40px;
  text-align: center;
  height: 40px;
  border-radius: 50%;
  background: rgba(136, 198, 76, 0.9);
  color: #fff;
  font-size: 10px;
  text-transform: uppercase;
  line-height: 1em;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  z-index: 8;
}
.anime-card__name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding: 10px;
  background: url("../assets/mask-title.png") top repeat-x;
  z-index: 8;
}
h2 {
  font-size: 14px;
  margin: 0;
  text-align: center;
  color: white;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
}
img {
  display: block;
  max-width: 100%;
}
i {
  display: block;
  font-weight: 700;
  font-size: 16px;
  font-style: normal;
  margin-top: 3px;
}
</style>
