<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "co-row",
  props: {
    // 布局类型 浮动布局和 flex 布局
    type: {
      type: String,
      validator(value) {
        return ["flex"].includes(value);
      }
    },
    // 栅格间距
    gutter: {
      type: Number,
      default: 0
    },
    // flex 水平布局
    justify: {
      type: String,
      validator(value) {
        return [
          "start",
          "end",
          "center",
          "space-round",
          "space-between"
        ].includes(value);
      }
    },
    // flex 垂直布局
    align: {
      type: String,
      validator(value) {
        return ["top", "middle", "bottom"].includes(value);
      }
    }
  },
  computed: {
    classes() {
      const { type, justify, align } = this;
      const prefixClass = type === "flex" ? "co-row-flex" : "co-row";

      return [
        prefixClass,
        {
          [`${prefixClass}--${justify}`]:
            type === "flex" && !(typeof justify === "undefined"),
          [`${prefixClass}--${align}`]:
            type === "flex" && !(typeof align === "undefined")
        }
      ];
    },
    styles() {
      const { gutter } = this;
      const style = {};

      if (gutter !== 0) {
        style.marginRight = `${-(gutter / 2)}px`;
        style.marginLeft = style.marginRight;
      }

      return style;
    }
  }
};
</script>
