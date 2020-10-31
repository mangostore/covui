<template>
  <span
    :class="{
      'co-switch': true,
      'co-switch--active': value,
      'co-switch--disabled': disabled,
    }"
    @click="onChange"
  ></span>
</template>

<script>
export default {
  name: "co-switch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange() {
      if (this.disabled) return;
      this.$emit("input", !this.value);
    },
  },
};
</script>