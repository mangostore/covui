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
      <co-input
        ref="input"
        class="co-select__input"
        v-model="label"
        :size="size"
        :icon="icon"
        :custom="inputStyle"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
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
        <div class="co-select__control" :style="controlStyle" v-if="control">
          <span @click="onSelectAll" v-if="multiple">全选</span>
          <span @click="onSelectClear" v-if="multiple">清空</span>
          <co-input
            v-model="filter"
            size="small"
            icon="search"
            :placeholder="multiple ? '' : '搜索'"
            :custom="searchCustom"
          ></co-input>
        </div>
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
    // 操作条 搜索、全选、清空 
    control: {
      type: Boolean,
      default: false
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
      filter: ""
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
    controlStyle() {
      return this.custom ? { "border-color": this.custom.dropdown.border } : null;
    },
    searchCustom() {
      return this.custom ? { color: this.custom.dropdown.color, icon: this.custom.dropdown.color } : null;
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
    label() {
      if (this.isSelected) {
        if (this.multiple) {
          return this.selected.map(item => item.label).join(";");
        } else {
          return this.selected[0].label;
        }
      }

      return "";
    },
    selected() {
      if (this.multiple) {
        return this.children.filter(child => (this.model || []).includes(child.value));
      } else {
        return this.children.filter(child => child.value === this.model);
      }
    },
    // 是否有值被选中
    isSelected() {
      return this.selected.length > 0;
    },
    icon() {
      return this.clearShow ? null : "chevron-down";
    }
  },
  methods: {
    switchDropdown() {
      if (this.disabled) return;

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
      this.model = this.children.filter(child => !child.disabled).map(item => item.value);
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
