<template>
  <div
    class="co-popover"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    v-clickoutside="hide"
  >
    <div class="co-popover__reference" ref="reference" @click="onClick">
      <slot></slot>
    </div>
    <transition :name="transition">
      <div
        v-show="visible"
        :class="['co-popover__popper', popperClass]"
        :style="styles"
        ref="popper"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
      >
        <div class="co-popover__arrow"></div>
        <div class="co-popover__inner">
          <div v-if="$slots.title || title" class="co-popover__title">
            <slot name="title" class="co-popover__title">
              {{ title }}
            </slot>
          </div>
          <div v-if="$slots.content || content" class="co-popover__content">
            <slot name="content">
              {{ content }}
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import popper from "../../mixins/popper";
import clickoutside from "../../directives/clickoutside";

export default {
  name: "co-popover",
  mixins: [popper],
  directives: {
    clickoutside
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: "click",
      validator(value) {
        return ["click", "hover", "focus"].includes(value);
      }
    },
    // popover 标题，也可以定义 slot="title"
    title: {
      type: String,
      default: ""
    },
    // popover 提示内容，也可以定义 slot="content"
    content: {
      type: String,
      default: ""
    },
    // 设置 popover 的宽度
    width: [String, Number],
    // popover 是否可用
    disabled: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: "co-scale"
    },
    popperClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      timeoutID: null,
      focusOff: null,
      blurOff: null
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (newVal === this.visible) return;

        this.visible = newVal;
      }
    },
    visible(newVal) {
      if (newVal) {
        this.$emit("show");
      } else {
        this.$emit("hide");
      }

      this.$emit("input", newVal);
    }
  },
  computed: {
    styles() {
      const styles = {};

      if (typeof this.width !== "undefined") {
        styles.width = `${this.width}px`;
      }

      return styles;
    }
  },
  mounted() {
    if (this.trigger === "focus") {
      let elm = this.findInput();

      if (!elm) {
        elm = this.$slots.default[0].elm;
      }

      this.focusOff = elm.addEventListener("focus", this.show, false);
      this.blurOff = elm.addEventListener("blur", this.hide, false);
    }
  },
  beforeDestroy() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
    if (this.focusOff) {
      this.focusOff();
    }
    if (this.blurOff) {
      this.blurOff();
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    onMouseenter() {
      if (this.disabled || this.trigger !== "hover") return;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(this.show, 0);
    },
    onMouseleave() {
      if (this.disabled || this.trigger !== "hover") return;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(this.hide, 100);
    },
    onClick() {
      if (this.disabled || this.trigger !== "click") return;

      this.visible = !this.visible;
    }
  }
};
</script>
