<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "co-checkbox-group",
  props: {
    value: Array,
    type: {
      type: String,
      validator(val) {
        return val === "button";
      }
    },
    // 自定义button类型样式
    custom: null // { "background": "#fff", "border": "#dcdcdc", "color": "#333", "selected": "#0e90d2" }
  },
  computed: {
    classes() {
      const prefixClass = "co-checkbox-group";

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
