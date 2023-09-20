<template>
  <label
    :class="classes"
    :style="styles"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <span class="co-radio__wrapper">
      <input
        type="radio"
        class="co-radio__input"
        v-model="model"
        :value="label"
        :disabled="disabled"
      />
      <span class="co-radio__indicator" :style="labelStyles"></span>
    </span>
    <span class="co-radio__description">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import emitter from "../../mixins/emitter";

const prefixClass = "co-radio";

export default {
  name: "co-radio",
  mixins: [emitter],
  props: {
    value: null,
    label: null,
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否触发表单验证规则
    validate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selfModel: null,
      radioGroup: null,
      hovered: false
    };
  },
  computed: {
    model: {
      get() {
        if (this.isGroup) {
          return this.radioGroup.value;
        } else if (typeof this.value !== "undefined") {
          return this.value;
        }

        return this.selfModel;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("co-radio-group", "input", val);
        } else if (this.value !== undefined) {
          this.$emit("input", val);
        } else {
          this.selfModel = val;
        }
      }
    },
    isGroup() {
      let parent = this.$parent;

      while (parent) {
        if (parent.$options.name !== "co-radio-group") {
          parent = parent.$parent;
        } else {
          this.radioGroup = parent;
          return true;
        }
      }

      return false;
    },
    isChecked() {
      const { model } = this;

      if (typeof model === "boolean") {
        return model;
      } else if (model !== null && model !== undefined) {
        return model === this.label;
      }

      return false;
    },
    isFirst() {
      const first = this.radioGroup.$children[0];
      return first && first.label === this.label;
    },
    custom() {
      return this.radioGroup && this.radioGroup.custom || null;
    },
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--checked`]: this.model === this.label,
        [`${prefixClass}--disabled`]: this.disabled
      };
    },
    styles() {
      if (this.custom && this.radioGroup && this.radioGroup.type === "button") {
        const { background, border, color, selected } = this.custom;
        return {
          "background-color": background,
          "border-color": this.isChecked ? selected : border,
          "box-shadow": this.isChecked && !this.isFirst ? `-1px 0 0 0 ${selected}` : "none",
          color: this.hovered || this.isChecked ? selected : color
        };
      } else {
        return null;
      }
    },
    labelStyles() {
      let obj = null;
      if (this.custom) {
        const { border, selected } = this.custom;
        obj = {
          borderColor: this.isChecked ? selected : border,
          backgroundColor: this.isChecked ? selected : ""
        };
      }
      return obj;
    }
  },
  watch: {
    model(newVal, oldVal) {
      if (newVal === oldVal) return;
      if (this.validate) {
        this.dispatch("co-form-item", "form-item-change", newVal);
      }
    }
  }
};
</script>
