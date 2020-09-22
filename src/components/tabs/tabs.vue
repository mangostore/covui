<template>
  <div class="co-tabs">
    <co-icon
      v-if="editable"
      class="co-tabs__add"
      type="plus"
      @click.native="onAddClick"
    >
    </co-icon>
    <ul
      class="co-tabs__navs"
      :class="`navs__${type}`"
      :style="{
        borderBottom:
          type === 'line'
            ? '1px solid' + ((custom && custom.lineBorder) || '')
            : '',
        justifyContent: align
          ? align === 'left'
            ? 'flex-start'
            : align === 'center'
            ? 'center'
            : align === 'right'
            ? 'flex-end'
            : ''
          : ''
      }"
    >
      <li
        class="co-tabs__nav-item"
        :style="{
          backgroundColor:
            type === 'line'
              ? 'transparent'
              : tab.key === active
              ? (custom && custom.activeBackground) || ''
              : (custom && custom.background) || '',
          borderColor:
            type === 'line' ? 'transparent' : (custom && custom.border) || '',
          borderBottomColor:
            type === 'line'
              ? tab.key === active
                ? (custom && custom.activeColor) || ''
                : 'transparent'
              : tab.key === active
              ? 'transparent'
              : '',
          color:
            tab.key === active
              ? type === 'line'
                ? (custom && custom.activeColor) || ''
                : (custom && custom.font) || ''
              : (custom && custom.font) || ''
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
          @click.native.stop="onRemoveClick(tab.key)"
        >
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
          lineBorder: "#dcdcdc",
          background: "#f0f0f0",
          font: "#333",
          activeColor: "#1EA7FD",
          activeBackground: "#fff"
        };
      }
    },
    // tab对齐方式
    align: {
      type: String,
      default: "left"
    },
    interval: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      active: this.activeName,
      // tab-pane 组件实例数组
      tabs: [],
      timer: null // 自动切换计时器
    };
  },
  watch: {
    // 当时间改变时，重新启动计时器
    interval: {
      immediate: true,
      handler(val, old) {
        if (val !== old && val > 0) {
          clearInterval(this.timer);
          this.createTimer();
        }
      }
    }
  },
  computed: {
    // 计算自动切换的下一个tab
    nextTab() {
      let obj = null;
      const tabsFilter = this.tabs.filter(item => !item.disabled);
      tabsFilter.forEach((item, index) => {
        if (item.key === this.active) {
          if (index < tabsFilter.length - 1) {
            obj = tabsFilter[index + 1];
          } else {
            obj = tabsFilter[0];
          }
        }
      });
      return obj;
    }
  },
  methods: {
    createTimer() {
      if (this.interval > 0) {
        this.timer = setInterval(() => {
          this.onClick(this.nextTab);
        }, this.interval);
      }
    },
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
