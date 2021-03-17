<!--
  颜色面板，支持自定义颜色值和透明度
  props：
    value/v-model: 颜色值 例如rgba(255, 255, 255, .8)或#ffffff
    disabled: 是否禁用 默认false
-->
<template>
  <co-popover
    placement="top-start"
    :class="classes"
    :disabled="disabled"
    :width="152"
    :append-body="false"
  >
    <div
      class="co-color-picker__trigger"
      :style="{ 'background-color': value }"
    ></div>

    <div class="co-color-picker__content" slot="content">
      <div>选择颜色</div>
      <div class="co-color-picker__colors">
        <span
          v-for="(color, index) in colors"
          :key="index"
          :class="[
            'co-color-picker__color',
            {
              'co-color-picker__color--active': color === form.hex.toUpperCase()
            }
          ]"
          :style="{ 'background-color': color }"
          @click="setColor(color)"
        ></span>
      </div>

      <co-form
        :model="form"
        :rules="rules"
        :label-width="46"
        label-position="left"
        ref="form"
      >
        <co-form-item label="颜色" prop="color">
          <co-input v-model="form.hex" placeholder="例：#333"></co-input>
        </co-form-item>
        <co-form-item label="透明度" prop="color">
          <co-input-number
            v-model="form.opacity"
            :min="0"
            :max="100"
          ></co-input-number>
        </co-form-item>
      </co-form>

      <slot></slot>
    </div>
  </co-popover>
</template>

<script>
import CoPopover from "../popover";
import CoInput from "../input";
import CoInputNumber from "../input-number";
import { CoForm, CoFormItem } from "../form";
import { rgbaToHex, hexToRgba, isHex } from "../../utils/color";

export default {
  name: "co-color-picker",
  components: { CoPopover, CoInput, CoInputNumber, CoForm, CoFormItem },
  props: {
    value: String,
    colors: {
      type: Array,
      default: () => [
        "#db4553",
        "#e67826",
        "#f5c815",
        "#40abfd",
        "#5bc645",
        "#e63074",
        "#ef3dab",
        "#f8f510",
        "#0060ff",
        "#3fea4b"
      ]
    },
    size: {
      type: String,
      validator(value) {
        return ["small", "large"].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        hex: "",
        opacity: 0
      },
      rules: {
        hex: [{ validator: this.validateHex, trigger: "change, blur" }]
      }
    };
  },
  computed: {
    classes() {
      const prefixClass = "co-color-picker";

      return {
        [prefixClass]: true,
        [`${prefixClass}--${this.size}`]: this.size,
        [`${prefixClass}--disabled`]: this.disabled
      };
    },
    rgba() {
      return hexToRgba(this.form.hex, this.form.opacity);
    }
  },
  methods: {
    validateHex(rule, value, cb) {
      if (!isHex(value)) {
        cb(new Error("颜色值格式不正确"));
      }
      cb();
    },
    setColor(color) {
      const { hex, opacity } = rgbaToHex(color) || {
        hex: isHex(color) ? color : "",
        opacity: 0
      };
      debugger;
      this.form.hex = hex;
      this.form.opacity = opacity;
    }
  },
  watch: {
    value(newVal) {
      const color = rgbaToHex(newVal) || {
        hex: isHex(newVal) ? newVal : "",
        opacity: 0
      };
      const { hex, opacity } = color;
      this.opacity = opacity;
      this.form.hex = hex.toLowerCase();
    },
    rgba(newVal) {
      this.$emit("input", newVal);
    }
  }
};
</script>
