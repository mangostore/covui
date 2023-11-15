<template>
  <div :class="classes" v-clickoutside="closeDropdown">
    <div
      class="co-select__trigger"
      ref="reference"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
    >
      <transition name="co-fade">
        <span
          v-if="clearable"
          v-show="clearShow"
          class="co-select__clear"
          @click="clearModel"
        >
          <co-icon type="x-circle"></co-icon>
        </span>
      </transition>
      <span
        v-if="multiple && checkedAll"
        class="co-select__all"
        @click="onSelectAll"
      >
        <co-icon type="check-square"></co-icon>
      </span>
      <co-input
        ref="input"
        class="co-select__input"
        :class="{ 'co-select-all__input': multiple && checkedAll }"
        v-model="label"
        :size="size"
        :icon="icon"
        :custom="inputStyle"
        :placeholder="inputFocus && labelPlace ? labelPlace : placeholder"
        :disabled="disabled"
        :readonly="!filterable"
        @on-focus="inputFocus = true"
        @on-blur="inputFocus = false"
        @on-icon-click="switchDropdown"
        @click.native="switchDropdown"
      ></co-input>
    </div>
    <transition name="co-slide">
      <div
        v-show="visible"
        class="co-select__dropdown"
        :style="dropdownStyles"
        ref="popper"
      >
        <ul class="co-select__list">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import CoInput from "../input";
import CoIcon from "../icon";
import clickoutside from "../../directives/clickoutside";
import popper from "../../mixins/popper";

export default {
  name: "co-select",
  componentName: "co-select",
  components: {
    CoInput,
    CoIcon
  },
  mixins: [popper],
  directives: {
    clickoutside
  },
  props: {
    // v-model
    value: null,
    // 尺寸大小
    size: {
      type: String,
      validator(val) {
        return ["small", "large"].includes(val);
      }
    },
    // 占位提示文本
    placeholder: {
      type: String,
      default: "请选择"
    },
    // 是否可以清空选项
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否禁用 select
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否可全选
    checkedAll: {
      type: Boolean,
      default: false
    },
    // 是否可搜索
    filterable: {
      type: Boolean,
      default: false
    },
    // 搜索过滤的回调
    filterFn: {
      type: Function,
      default: null
    },
    // 自定义样式
    custom: null // {input: {background: "#ffffff", color: "#333333", border: "#dcdcdc", icon: "#8c8c8c", shadow: "rgba(0, 100, 122, .3)"}, dropdown: {background: "#ffffff", color: "#333333", border: "#dcdcdc", selected: "#0e90d2", hover: "#f4f5f6"}}
  },
  data() {
    return {
      // keydown 事件解绑
      keydownOff: null,
      // 所有 option 集合
      children: [],
      width: 0,
      clearShow: false,
      filter: "",
      inputFocus: false // 输入框获取焦点
    };
  },
  computed: {
    classes() {
      const prefixClass = "co-select";

      return {
        [prefixClass]: true,
        [`${prefixClass}--${this.size}`]: this.size !== undefined,
        [`${prefixClass}--open`]: this.visible
      };
    },
    dropdownStyles() {
      const styles = {};

      if (this.width > 0) {
        styles.width = `${this.width}px`;
      }

      if (this.custom) {
        const { background, color, border } = this.custom.dropdown;
        styles["background-color"] = background;
        styles["border-color"] = border;
        styles.color = color;
      }

      return styles;
    },
    inputStyle() {
      return this.custom ? this.custom.input : null;
    },
    searchCustom() {
      return this.custom
        ? {
            color: this.custom.dropdown.color,
            icon: this.custom.dropdown.color
          }
        : null;
    },
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("on-change", val);
      }
    },
    labelPlace() {
      if (this.isSelected) {
        if (this.multiple) {
          return this.selected.map(item => item.label).join(";");
        } else {
          return this.selected[0].label;
        }
      }
      return this.value || "";
    },
    label: {
      get() {
        if (!this.inputFocus) {
          if (this.isSelected) {
            if (this.multiple) {
              return this.selected.map(item => item.label).join(";");
            } else {
              return this.selected[0].label;
            }
          }
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.filter = "";
          return null;
        }
        return this.value || "";
      },
      set(val) {
        this.$emit("on-filter", val);
        // 如果有回调
        if (this.filterFn) {
          this.filterFn(val);
        } else {
          this.filter = val;
        }
      }
    },
    selected() {
      if (this.multiple) {
        return this.children.filter(child =>
          (this.model || []).includes(child.value)
        );
      } else {
        return this.children.filter(child => child.value === this.model);
      }
    },
    // 是否有值被选中
    isSelected() {
      return this.selected.length > 0;
    },
    icon() {
      return this.clearShow ? " " : "chevron-down";
    }
  },
  methods: {
    switchDropdown() {
      if (this.disabled) return;
      if (this.visible && this.filterable && this.multiple) return;
      this.visible = !this.visible;
    },
    closeDropdown() {
      this.visible = false;
    },
    onSelectOption(value) {
      if (this.multiple) {
        const selected = (this.model || []).slice();
        const index = selected.indexOf(value);
        if (index > -1) {
          selected.splice(index, 1);
        } else {
          selected.push(value);
        }
        this.model = selected;
      } else {
        this.model = value;
        this.visible = false;
      }
    },
    onKeydown(event) {
      if (this.visible) {
        // 按下 esc 关闭 select 目录
        if (event.keyCode === 27) {
          event.preventDefault();
          this.closeDropdown();
        }
      }
    },
    onMouseenter() {
      if (!this.disabled && this.clearable && this.isSelected) {
        this.clearShow = true;
      }
    },
    onMouseleave() {
      if (!this.disabled && this.clearable && this.isSelected) {
        this.clearShow = false;
      }
    },
    onSelectAll() {
      this.model = this.children
        .filter(child => !child.disabled)
        .map(item => item.value);
    },
    onSelectClear() {
      this.model = [];
    },
    clearModel() {
      this.model = "";
      this.clearShow = false;
      this.closeDropdown();
    },
    updateChildren() {
      this.children = this.$children.filter(
        child => child.$options.name === "co-option"
      );
    },
    slotChange() {
      this.$nextTick(() => {
        this.updateChildren();
      });
    }
  },
  created() {
    this.$on("select-option", this.onSelectOption);
    this.keydownOff = document.addEventListener(
      "keydown",
      this.onKeydown,
      false
    );
  },
  mounted() {
    this.updateChildren();
  },
  beforeDestroy() {
    if (this.keydownOff) {
      this.keydownOff();
    }
  },
  watch: {
    visible(newVal) {
      if (!newVal) {
        this.$refs.input.$refs.input.blur();
      }
    }
  }
};
</script>
