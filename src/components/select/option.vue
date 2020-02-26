<template>
  <li
    :class="classes"
    :style="styles"
    @click.self="onClick"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    v-show="show">
    <co-icon type="check" class="co-option__check" v-show="active"></co-icon> 
    <slot>{{ label || value }}</slot>
  </li>
</template>

<script>
import CoIcon from "../icon";
import emitter from "../../mixins/emitter";

export default {
  name: "co-option",
  mixins: [emitter],
  components: { CoIcon },
  props: {
    // 选项值，选中的话会赋值给父级 select 组件绑定的 model
    value: {
      type: null,
      required: true
    },
    // 选项文本，默认会优先读取 slot，无 slot 的时候优先读取 label，多选不支持slot
    // 如果 label 也没有则把 value 格式化显示出来
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hover: false
    };
  },
  computed: {
    classes() {
      const prefixClass = "co-option";

      return [
        prefixClass,
        {
          [`${prefixClass}--multiple`]: this.parent.multiple,
          [`${prefixClass}--disabled`]: this.disabled,
          [`${prefixClass}--active`]: this.active
        }
      ];
    },
    styles() {
      const custom = this.parent.custom;
      return custom ? { color: this.active ? custom.dropdown.selected : "",
          stroke: custom.dropdown.selected,
          "background": this.hover && !this.active && !this.disabled ? custom.dropdown.hover : ""
        } : null;
    },
    parent() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== "co-select") {
        parent = parent.$parent;
      }

      return parent;
    },
    active() {
      if (this.parent) {
        if (Array.isArray(this.parent.value)) {
          return this.parent.value.indexOf(this.value) > -1;
        }

        return this.parent.value === this.value;
      }

      return false;
    },
    show() {
      const reg = new RegExp(this.parent.filter.trim(), "i");
      return reg.test(this.label || this.value);
    }
  },
  mounted() {
    this.parent.slotChange();
  },
  beforeDestroy() {
    this.parent.slotChange();
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.dispatch("co-select", "select-option", this.value);
      }
    }
  }
};
</script>
