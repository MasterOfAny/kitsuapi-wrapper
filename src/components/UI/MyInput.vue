<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      console.log(event.target.value);
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
<style scoped>
.input {
  border: none;
  background: #444;
  color: #fff;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.428;
}
</style>