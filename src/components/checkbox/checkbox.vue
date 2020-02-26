<template>
  <label
    :class="classes"
    :style="styles"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false">
    <span class="co-checkbox__wrapper">
      <input
        v-if="trueLabel && falseLabel"
        type="checkbox"
        class="co-checkbox__input"
        v-model="model"
        :true-value="trueLabel"
        :false-value="falseLabel"
        :disabled="disabled"
      />
      <input
        v-else
        type="checkbox"
        class="co-checkbox__input"
        v-model="model"
        :value="label"
        :disabled="disabled"
      />
      <span class="co-checkbox__indicator"></span>
    </span>
    <span v-if="$slots.default || label" class="co-checkbox__description">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import emitter from "../../mixins/emitter";

export default {
  name: "co-checkbox",
  mixins: [emitter],
  props: {
    value: null,
    label: null,
    trueLabel: null,
    falseLabel: null,
    checked: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
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
      // 内部使用的 value 值
      selfModel: false,
      checkboxGroup: null,
      hovered: false
    };
  },
  computed: {
    model: {
      get() {
        if (this.isGroup) {
          return this.checkboxGroup.value;
        } else if (typeof this.value !== "undefined") {
          return this.value;
        }

        return this.selfModel;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("co-checkbox-group", "input", val);
        } else if (typeof this.value !== "undefined") {
          this.$emit("input", val);
        } else {
          this.selfModel = val;
        }
      }
    },
    isGroup() {
      let parent = this.$parent;

      while (parent) {
        if (parent.$options.name !== "co-checkbox-group") {
          parent = parent.$parent;
        } else {
          this.checkboxGroup = parent;
          return true;
        }
      }

      return false;
    },
    isChecked() {
      const { model } = this;

      if (typeof model === "boolean") {
        return model;
      } else if (Array.isArray(model)) {
        return model.indexOf(this.label) > -1;
      } else if (model !== null && model !== undefined) {
        return model === this.trueLabel;
      }

      return false;
    },
    isFirst() {
      const first = this.checkboxGroup.$children[0];
      return first && first.label === this.label;
    },
    custom() {
      return  this.checkboxGroup && this.checkboxGroup.type === "button" ? this.checkboxGroup.custom : null;
    },
    classes() {
      const prefixClass = "co-checkbox";

      return {
        [prefixClass]: true,
        [`${prefixClass}--checked`]: this.isChecked,
        [`${prefixClass}--indeterminate`]: this.indeterminate,
        [`${prefixClass}--disabled`]: this.disabled
      };
    },
    styles() {
      if (this.custom) {
        const { background, border, color, selected } = this.custom;
        return {
          "background-color": background,
          "border-color": this.isChecked ? selected : border,
          "box-shadow": this.isChecked && !this.isFirst ? `-1px 0 0 0 ${selected}` : "none",
          color: this.hovered || this.isChecked ? selected : color, 
        };
      } else {
        return null;
      }
    }
  },
  watch: {
    model(newVal, oldVal) {
      if (newVal === oldVal) return;
      if (this.validate) {
        this.dispatch("co-form-item", "form-item-change", newVal);
      }
    }
  },
  created() {
    if (this.checked) {
      this.setChecked();
    }
  },
  methods: {
    setChecked() {
      if (this.isGroup && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else if (typeof this.trueLabel !== "undefined") {
        this.model = this.trueLabel;
      } else {
        this.model = true;
      }
    }
  }
};
</script>
