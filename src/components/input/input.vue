<template>
  <div :class="classes">
    <textarea
      v-if="type === 'textarea'"
      ref="input"
      class="co-input__textarea"
      :style="styles"
      :value="model"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :rows="rows"
      :autofocus="autofocus"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
    ></textarea>
    <template v-else>
      <span class="co-input__icon" v-if="icon" @click.stop="onIconClick">
        <co-icon :type="icon" :style="iconStyle"></co-icon>
      </span>
      <input
        ref="input"
        class="co-input__input"
        v-bind="$props"
        :style="styles"
        :value="model"
        :type="type"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
      />
    </template>
  </div>
</template>

<script>
import CoIcon from "../icon";
import emitter from "../../mixins/emitter";

const prefixClass = "co-input";

export default {
  name: "co-input",
  mixins: [emitter],
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String
      // default: "请输入"
    },
    size: {
      type: String,
      validator(value) {
        return ["small", "large"].includes(value);
      }
    },
    icon: String,
    rows: {
      type: Number,
      default: 2
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    // 是否触发表单项的验证事件
    validate: {
      type: Boolean,
      default: true
    },
    // 自定义样式
    custom: null, // {background: "#ffffff", color: "#333333", border: "#dcdcdc", icon: "#8c8c8c", shadow: "rgba(0, 100, 122, .3)"}
  },
  data() {
    return {
      model: this.value,
      focus: false
    };
  },
  computed: {
    classes() {
      const { size } = this;

      return {
        [prefixClass]: true,
        [`${prefixClass}--${size}`]: !!size
      };
    },
    styles() {
      if (this.custom) {
        const { background, color, border, shadow } = this.custom;
        return {
          "background-color": background,
          "border-color": border,
          "box-shadow": this.focus && shadow ? `0 0 0 3px ${shadow}` : "",
          color,
        };
      } else {
        return null;
      }
    },
    iconStyle() {
      if (this.custom) {
        return { stroke: this.custom.icon };
      } else {
        return null;
      }
    }
  },
  watch: {
    value(newVal) {
      this.setModel(newVal);
    }
  },
  methods: {
    onIconClick() {
      this.$refs.input.focus();
      this.$emit("on-icon-click");
    },
    onInput(event) {
      const value = event.target.value;

      this.$emit("input", value);
      this.$emit("on-change", event);
    },
    onFocus() {
      this.focus = true;
      this.$emit("on-focus");
    },
    onBlur(event) {
      this.focus = false;
      this.$emit("on-blur", event);

      if (this.validate) {
        this.dispatch("co-form-item", "form-item-blur", this.model);
      }
    },
    onChange(event) {
      this.$emit("on-input-change", event);
    },
    setModel(value) {
      if (value === this.model) return;

      this.model = value;

      if (this.validate) {
        this.dispatch("co-form-item", "form-item-change", this.model);
      }
    }
  },
  components: {
    CoIcon
  }
};
</script>
