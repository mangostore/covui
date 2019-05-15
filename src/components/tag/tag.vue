<template>
  <span :class="classes" v-if="closeTransition">
    <slot></slot>
    <co-icon
      v-if="closable"
      class="co-tag__close"
      type="x"
      @click.native="onClose"
    />
  </span>
  <transition
    name="co-fade"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    v-else
  >
    <span :class="classes">
      <slot></slot>
      <co-icon
        v-if="closable"
        class="co-tag__close"
        type="x"
        @click.native="onClose"
      />
    </span>
  </transition>
</template>

<script>
import CoIcon from "../icon";

export default {
  name: "co-tag",
  props: {
    type: {
      type: String,
      validator(value) {
        return ["primary", "success", "warning", "info"].includes(value);
      }
    },
    size: {
      type: String,
      validator(value) {
        return ["large"].includes(value);
      }
    },
    closable: {
      type: Boolean,
      default: false
    },
    closeTransition: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      const prefixClass = "co-tag";
      const { type, size } = this;

      return [
        prefixClass,
        {
          [`${prefixClass}--${type}`]: !!type,
          [`${prefixClass}--${size}`]: !!size
        }
      ];
    }
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
    beforeLeave(el) {
      if (!el.dataset) {
        el.dataset = {};
      }

      el.dataset.oldPaddingRight = el.style.paddingRight;
      el.dataset.oldPaddingLeft = el.style.paddingLeft;
      el.dataset.oldMarginRight = el.style.marginRight;
      el.dataset.oldMarginLeft = el.style.marginLeft;
      el.dataset.oldOverflow = el.style.overflow;
      el.dataset.oldOpacity = el.style.opacity;
      el.dataset.oldTransform = el.style.transform;

      el.style.width = `${el.scrollWidth}px`;
      el.style.overflow = "hidden";
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    },
    leave(el) {
      if (el.scrollWidth > 0) {
        el.className = `${el.className} co-tag--leave`;
        el.style.width = "0";
        el.style.paddingRight = "0";
        el.style.paddingLeft = "0";
        el.style.marginRight = "0";
        el.style.marginLeft = "0";
        el.style.opacity = "0";
        el.style.transform = "scale(0)";
      }
    },
    afterLeave(el) {
      el.className = el.className.replace(" co-tag--leave", "");
      el.style.width = "";
      el.style.paddingRight = el.dataset.oldPaddingRight;
      el.style.paddingLeft = el.dataset.oldPaddingLeft;
      el.style.marginRight = el.dataset.oldMarginRight;
      el.style.marginLeft = el.dataset.oldMarginLeft;
      el.style.overflow = el.dataset.oldOverflow;
      el.style.opacity = el.dataset.oldOpacity;
      el.style.transform = el.dataset.oldTransform;
    }
  },
  components: {
    CoIcon
  }
};
</script>
