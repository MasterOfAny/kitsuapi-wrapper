<template>
  <form id="search" @submit.prevent>
    <my-input
      v-model="query"
      class="navbar__search-input"
      placeholder="Search..."
    />

    <button type="submit" class="navbar__search-btn" @click="submitSearch">
      <i class="fa fa-search"></i>
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup(props, { emit }) {
    const router = useRouter();
    const query = ref("");
    const submitSearch = () => {
      emit("submitSearch", { query: query.value });
      router.push({
        name: "searchPage",
        query: { q1: query.value },
      });
    };
    return {
      query,
      submitSearch,
    };
  },
};
</script>

<style scoped>
</style>