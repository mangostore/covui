<template>
  <button
    :class="classes"
    :type="nativeType"
    :disabled="disabled"
    @click="onClick"
  >
    <transition name="co-fade">
      <co-icon
        v-if="loading"
        class="co-button__loading"
        type="loader"
      ></co-icon>
    </transition>
    <co-icon v-if="showIcon" :type="icon"></co-icon>
    <slot></slot>
  </button>
</template>

<script>
import CoIcon from "../icon";

export default {
  name: "co-button",
  props: {
    // 按钮的类型
    type: {
      type: String,
      default: "default",
      validator(value) {
        return [
          "default",
          "primary",
          "ghost",
          "success",
          "error",
          "link"
        ].includes(value);
      }
    },
    // 按钮尺寸
    size: {
      type: String,
      validator(value) {
        return ["small", "default", "large"].includes(value);
      }
    },
    // 原生 type 属性
    nativeType: {
      type: String,
      default: "button",
      validator(value) {
        return ["button", "submit", "reset"].includes(value);
      }
    },
    // 是否为块级按钮即宽度为100%
    block: {
      type: Boolean,
      default: false
    },
    // 是否禁用按钮
    disabled: {
      type: Boolean,
      default: false
    },
    // 开启按钮载入状态
    loading: {
      type: Boolean,
      default: false
    },
    // 按钮的图标
    icon: String
  },
  data() {
    return {
      buttonGroup: null,
      clicked: false,
      timeoutID: null
    };
  },
  computed: {
    classes() {
      const prefixClass = "co-button";

      return [
        prefixClass,
        {
          [`${prefixClass}--${this.type}`]: true,
          [`${prefixClass}--block`]: this.block,
          [`${prefixClass}--${this.buttonSize}`]: !!this.buttonSize,
          [`${prefixClass}--loading`]: this.loading,
          [`${prefixClass}--clicked`]: this.clicked
        }
      ];
    },
    isGroup() {
      let parent = this.$parent;

      while (parent) {
        if (parent.$options.name === "co-button-group") {
          this.buttonGroup = parent;
          return true;
        }

        parent = parent.$parent;
      }

      return false;
    },
    buttonSize() {
      return this.isGroup ? this.buttonGroup.size : this.size;
    },
    showIcon() {
      return !!(this.icon && !this.loading);
    }
  },
  beforeDestroy() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  },
  methods: {
    onClick() {
      if (this.type === "link") return;

      this.clicked = true;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(() => {
        this.clicked = false;
      }, 400);
    }
  },
  components: {
    CoIcon
  }
};
</script>
