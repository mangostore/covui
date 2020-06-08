<template>
  <div class="co-tree">
    <co-tree-node
      v-for="child in data"
      :node="child"
      :props="props"
      :node-key="nodeKey"
      :key="child[nodeKey]"
      :selected="selected"
      :expand-on-click-node="expandOnClickNode"
      @node-click="handleNodeClick"
    >
    </co-tree-node>
    <div class="co-tree__empty" v-if="isEmpty">
      {{ emptyText }}
    </div>
  </div>
</template>

<script>
import CoTreeNode from "./tree-node";

export default {
  name: "co-tree",
  components: { CoTreeNode },
  props: {
    data: Array,
    props: {
      type: Object,
      default() {
        return {
          children: "children",
          label: "label"
        };
      }
    },
    nodeKey: {
      type: String,
      default: ""
    },
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    highlightCurrent: {
      type: Boolean,
      default: false
    },
    currentNodeKey: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      selected: this.currentNodeKey
    };
  },
  computed: {
    isEmpty() {
      return !this.data || this.data.length === 0;
    }
  },
  methods: {
    handleNodeClick(val) {
      this.$emit("node-click", val);
      if (this.highlightCurrent && this.nodeKey) {
        this.selected = val[this.nodeKey];
      }
    }
  }
};
</script>
