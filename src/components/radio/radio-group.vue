<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "co-radio-group",
  props: {
    value: null,
    type: {
      type: String,
      validator(val) {
        return val === "button";
      }
    },
    custom: null // {background: "transparent", border: "#16397a", color: "#dfe5f1", selected: "#0e90d2"}
  },
  computed: {
    classes() {
      const prefixClass = "co-radio-group";

      return {
        [prefixClass]: true,
        [`${prefixClass}--button`]: this.type === "button"
      };
    }
  },
  watch: {
    value(newVal) {
      this.$emit("change", newVal);
    }
  }
};
</script>
