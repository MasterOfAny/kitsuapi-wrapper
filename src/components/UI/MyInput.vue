<template>
  <input
    :value="modelValue ? modelValue : $route.query.q1"
    @input="updateInput"
    class="search__input"
    type="text"
  />
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
<style scoped>
.search__input {
  border: none;
  background: #444;
  color: #fff;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.428;
}
</style>