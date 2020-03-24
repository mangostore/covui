<template>
  <div class="co-tree__node">
    <div class="co-tree__content" @click.stop="onNodeClick">
      <co-icon
        class="co-tree__icon"
        type="chevron-right"
        :style="{ visibility: hasChildren ? '' : 'hidden', transform: expanded ? 'rotate(90deg)' : '' }"
        @click.native.stop="onIconClick"
      ></co-icon>
      <span class="co-tree__label">{{ node[props.label] }}</span>
    </div>
    <transition name="co-collapse" v-if="hasChildren">
      <div class="co-tree__children" v-show="expanded">
        <co-tree-node
          v-for="child in node[props.children]"
          :node="child"
          :props="props"
          :expand-on-click-node="expandOnClickNode"
          @node-click="handleNodeClick">
        </co-tree-node>
      </div>
    </transition>
  </div>
</template>

<script>
  import CoIcon from "../icon";
  import CoTreeNode from "./tree-node";

  export default {
    name: "co-tree-node",
    components: { CoIcon, CoTreeNode },
    props: {
      node: {
        type: Object,
        default() {
          return {};
        },
      },
      props: {
        type: Object,
        default() {
          return {};
        },
      },
      expandOnClickNode: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        expanded: false,
      };
    },
    computed: {
      hasChildren() {
        const children = this.node[this.props.children];
        return children && children.length > 0;
      },
    },
    methods: {
      onNodeClick() {
        if (this.expandOnClickNode) {
          this.expanded = !this.expanded;
        }
        this.$emit("node-click", this.node);
      },
      onIconClick() {
        this.expanded = !this.expanded;
      },
      handleNodeClick(val) {
        this.$emit("node-click", val);
      },
    },
  }
</script>