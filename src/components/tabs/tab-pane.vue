<template>
  <div
    v-show="active" class="co-tabs__pane"
    :style="tabPaneStyles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "co-tab-pane",
  props: {
    // 与 tabs 的 activeName 对应的标识
    name: [String, Number],
    // 标签页显示的标题
    label: String,
    // 是否禁用该选项卡
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 容器的样式
    tabPaneStyles() {
      const parent = this.parent;
      let obj = {};
      if (parent && parent.custom) {
        obj.borderColor = parent.custom.border || "";
        obj.backgroundColor = parent.custom.activeBackground || "";
        if (parent.type === "line") {
          obj.borderTopWidth = "0";
        }
      }
      return obj;
    },
    parent() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== "co-tabs") {
        parent = parent.$parent;
      }

      return parent;
    },
    key() {
      return this.name !== undefined
        ? this.name
        : this.parent.tabs.indexOf(this);
    },
    active() {
      return this.parent.active === this.key;
    }
  },
  created() {
    this.parent.tabs.push(this);
  }
};
</script>
