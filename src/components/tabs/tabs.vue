<template>
  <div class="co-tabs">
    <co-icon
      v-if="editable"
      class="co-tabs__add"
      type="plus"
      @click.native="onAddClick">
    </co-icon>
    <ul class="co-tabs__navs" :class="`navs__${type}`">
      <li
        class="co-tabs__nav-item"
        :style="{
          backgroundColor: type === 'line' ? ('transparent') : (tab.key === active ? (custom && custom.activeBackground || '') : (custom && custom.background || '')),
          borderColor: type === 'line' ? 'transparent' : (custom && custom.border || ''),
          borderBottomColor: type === 'line' ? (tab.key === active ? (custom && custom.activeColor || '') : '') : (tab.key === active ? 'transparent' : ''),
          color: tab.key === active ? ( type === 'line' ? (custom && custom.activeColor || '') : (custom && custom.font || '')) : (custom && custom.font || '')
        }"
        :class="{
          'co-tabs__nav-item--disabled': tab.disabled,
          active: tab.key === active
        }"
        v-for="tab in tabs"
        :key="tab.key"
        @click="onClick(tab)"
      >
        {{ tab.label }}
        <co-icon
          v-if="editable"
          class="co-tabs__remove"
          type="x"
          @click.native.stop="onRemoveClick(tab.key)">
        </co-icon>
      </li>
    </ul>
    <div class="co-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import CoIcon from "../icon";

export default {
  name: "co-tabs",
  components: { CoIcon },
  props: {
    // 当前激活的 tab-pane 的别名
    activeName: {
      type: [String, Number],
      default: 0
    },
    editable: {
      type: Boolean,
      default: false
    },
    // tab的样式，默认card，可选line
    type: {
      type: String,
      default: "card"
    },
    // 自定义样式
    custom: {
      type: Object,
      default: () => {
        return {
          border: "#dcdcdc",
          background: "#f0f0f0",
          font: "#333",
          activeColor: "#1EA7FD",
          activeBackground: "#fff"
        };
      }
    }
  },
  data() {
    return {
      active: this.activeName,
      // tab-pane 组件实例数组
      tabs: []
    };
  },
  methods: {
    onClick(tab) {
      if (!tab.disabled) {
        this.active = tab.key;
        this.$emit("update:activeName", tab.name);
      }
    },
    onRemoveClick(targetName) {
      this.$emit("edit", targetName, "remove");
    },
    onAddClick() {
      this.$emit("edit", null, "add");
    }
  }
};
</script>
