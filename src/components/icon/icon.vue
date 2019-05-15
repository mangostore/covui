<template>
  <svg class="co-icon">
    <use :xlink:href="href"></use>
  </svg>
</template>

<script>
const sprite = require("../../assets/feather-sprite.svg");

export default {
  name: "co-icon",
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    href() {
      return `${sprite}#${this.type}`;
    }
  }
};
</script>
