<template>
  <div :class="classes" :style="styles">
    <div class="co-table__hidden-columns">
      <slot></slot>
    </div>
    <!-- table header -->
    <div
      v-if="showHeader"
      ref="headerWrap"
      class="co-table__header-wrap"
      @mousewheel="onMousewheelProxy"
    >
      <table-header
        ref="header"
        :style="headerStyles"
        :flatten-columns="flattenColumns"
        :origin-columns="originColumns"
        :left-fixed-columns="leftFixedColumns"
        :right-fixed-columns="rightFixedColumns"
        :sorting-column="sortingColumn"
        :scroll-y="layout.scrollY"
        :scroll-bar-width="layout.scrollBarWidth"
        :border="border"
        @sorting-column-change="onSortingColumnChange"
        @no-sort="onNoSort"
        @sort-change="onSortChange"
      ></table-header>
    </div>
    <!-- table body -->
    <div
      ref="bodyWrap"
      class="co-table__body-wrap"
      :style="bodyWrapStyles"
      @scroll="onBodyScrollProxy"
    >
      <div v-if="noData" class="co-table__empty-body" :style="bodyStyles">
        <span class="co-table__empty-text">
          <slot name="empty">{{ emptyText }}</slot>
        </span>
      </div>
      <table-body
        v-else
        ref="body"
        id="tablebody"
        :style="bodyStyles"
        :class="{ marquee_top: animate }"
        :flatten-columns="flattenColumns"
        :left-fixed-columns="leftFixedColumns"
        :right-fixed-columns="rightFixedColumns"
        :hover="hover || carouselHover"
        :hover-index="hoverIndex"
        :data="filterData"
        :row-key="rowKey"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :children-column-name="childrenColumnName"
        :indent-size="indentSize"
        @hover-in="onHoverIn"
        @hover-out="onHoverOut"
      ></table-body>
    </div>
    <!-- left fixed -->
    <div
      v-if="leftFixedColumns.length > 0"
      class="co-table__left-fixed"
      :style="fixedStyles('left')"
    >
      <div class="co-table__fixed-header-wrap">
        <table-header
          :style="{ width: `${this.layout.leftFixedWidth}px` }"
          fixed="left"
          :flatten-columns="flattenColumns"
          :origin-columns="originColumns"
          :left-fixed-columns="leftFixedColumns"
          :right-fixed-columns="rightFixedColumns"
          :sorting-column="sortingColumn"
          :scroll-y="layout.scrollY"
          :scroll-bar-width="layout.scrollBarWidth"
          :border="border"
          @sorting-column-change="onSortingColumnChange"
          @no-sort="onNoSort"
          @sort-change="onSortChange"
        ></table-header>
      </div>
      <div
        class="co-table__fixed-body-wrap"
        ref="leftFixedBodyWrap"
        :style="{
          height: `${this.layout.fixedBodyHeight}px`,
          top: `${this.layout.headerHeight}px`
        }"
      >
        <table-body
          :style="{ width: `${this.layout.leftFixedWidth}px` }"
          fixed="left"
          :flatten-columns="flattenColumns"
          :left-fixed-columns="leftFixedColumns"
          :right-fixed-columns="rightFixedColumns"
          :hover="hover || carouselHover"
          :hover-index="hoverIndex"
          :data="filterData"
          @hover-in="onHoverIn"
          @hover-out="onHoverOut"
        ></table-body>
      </div>
    </div>
    <!-- right fixed -->
    <div
      v-if="rightFixedColumns.length > 0"
      class="co-table__right-fixed"
      :style="fixedStyles('right')"
    >
      <div class="co-table__fixed-header-wrap">
        <table-header
          :style="{ width: `${this.layout.rightFixedWidth}px` }"
          fixed="right"
          :flatten-columns="flattenColumns"
          :origin-columns="originColumns"
          :left-fixed-columns="leftFixedColumns"
          :right-fixed-columns="rightFixedColumns"
          :sorting-column="sortingColumn"
          :scroll-y="layout.scrollY"
          :scroll-bar-width="layout.scrollBarWidth"
          :border="border"
          @sorting-column-change="onSortingColumnChange"
          @no-sort="onNoSort"
          @sort-change="onSortChange"
        ></table-header>
      </div>
      <div
        class="co-table__fixed-body-wrap"
        ref="rightFixedBodyWrap"
        :style="{
          height: `${this.layout.fixedBodyHeight}px`,
          top: `${this.layout.headerHeight}px`
        }"
      >
        <table-body
          ref="scrollBody"
          :style="{ width: `${this.layout.rightFixedWidth}px` }"
          fixed="right"
          :flatten-columns="flattenColumns"
          :left-fixed-columns="leftFixedColumns"
          :right-fixed-columns="rightFixedColumns"
          :hover="hover || carouselHover"
          :hover-index="hoverIndex"
          :data="filterData"
          @hover-in="onHoverIn"
          @hover-out="onHoverOut"
        ></table-body>
      </div>
    </div>
    <div v-if="showFixedPlaceholder" class="co-table__fixed-placeholder"></div>
    <div
      v-show="resizeProxyVisible"
      class="co-table__resize-proxy"
      ref="resizeProxy"
    ></div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { addResizeListener, removeResizeListener } from "../../utils/resize";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import layout from "./layout";
import { getColumns, getFlattenColumns, orderBy } from "./utils";

export default {
  name: "co-table",
  mixins: [layout],
  provide() {
    return {
      custom: this.custom,
      stripe: this.stripe
    };
  },
  props: {
    //轮播设置
    carousel: null,
    pageSize: Number,
    // 显示的数据
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    // 表格高度（单位：px），如果表格实际高度大于此值，则会固定表头
    height: Number,
    // 是否显示表格斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 是否显示表格纵向边框
    border: {
      type: Boolean,
      default: false
    },
    // 是否开启表格行 hover 效果
    hover: {
      type: Boolean,
      default: false
    },
    // 数据为空时显示的文本内容，也可通过 slot="empty" 设置
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 列的宽度是否自动撑开
    fit: {
      type: Boolean,
      default: true
    },
    // 默认排序列的 `prop` 和 `order`，`prop` 指定默认排序的列，`order` 决定排序的顺序
    defaultSort: {
      type: Object,
      validator(value) {
        return (
          Object.prototype.toString.call(value) === "[object Object]" &&
          Object.keys(value).indexOf("prop") > -1
        );
      }
    },
    // 树形结构表格行数据子列的属性名
    childrenColumnName: {
      type: String,
      default: "children"
    },
    // 行数据的 key，优化表格渲染，用于树形表格与带展开功能的表格
    // String 类型返回 row[rowKey] 作为 key
    // Function 类型则是 rowKey(row) 的返回值作为 key
    rowKey: [String, Function],
    // 是否默认展开所有表格行，只在具有展开行功能的表格中有效
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 设置表格展开行，需要设置 rowKey 属性才有效，其值为展开行的 keys 数组
    expandRowKeys: Array,
    // 展示树形数据时每层数据的缩进宽度，单位 px
    indentSize: {
      type: Number,
      default: 18
    },
    // 自定义颜色主题
    custom: null // { border: #dcdcdc, background: #fff, headerBackground: #e3e8ef, evenBackground: #fafafa, font: #333 }
  },
  data() {
    return {
      tableId: "co-table",
      columns: [],
      resizeHandler: null,
      sortingColumn: null,
      sortProp: "",
      resizeProxyVisible: false,
      hoverIndex: null,
      onMousewheelProxy: throttle(this.onMousewheel, 17),
      onBodyScrollProxy: throttle(this.onBodyScroll, 17),
      containerHeight: 0, //轮播容器的高度
      distance: 0, //滚动的距离
      currentPage: 1,
      bodyHeight: 0,
      timer: null,
      animate: false,
      pageDistance: 0
    };
  },
  computed: {
    carouselHover() {
      return this.carousel !== null && this.carousel !== undefined;
    },
    speed() {
      return this.carousel ? this.carousel.speed : 1000;
    },
    noData() {
      return this.data.length === 0;
    },
    originColumns() {
      return [
        ...this.leftFixedColumns,
        ...this.columns.filter(column => !column.fixed),
        ...this.rightFixedColumns
      ];
    },
    flattenColumns() {
      return getFlattenColumns(this.originColumns);
    },
    leftFixedColumns() {
      return this.columns.filter(column => column.fixed === "left");
    },
    rightFixedColumns() {
      return this.columns.filter(column => column.fixed === "right");
    },
    filterData() {
      const { sortingColumn, sortProp, data } = this;

      if (!sortingColumn || !sortProp || sortingColumn.sortable === "custom") {
        return data;
      }

      return orderBy(
        data,
        sortProp,
        sortingColumn.order,
        sortingColumn.sortMethod
      );
    },
    classes() {
      const prefixClass = "co-table";

      return [
        prefixClass,
        {
          [`${prefixClass}--border`]: this.border,
          [`${prefixClass}--stripe`]: this.stripe,
          [`${prefixClass}--hover`]: this.hover
        }
      ];
    },
    styles() {
      const styles = {};

      if (typeof this.height === "number") {
        styles.height = `${this.height}px`;
      }
      if (this.custom) {
        styles.color = this.custom.font || "";
        styles.borderColor = this.custom.border || "";
      }

      return styles;
    },
    headerStyles() {
      const { width, scrollY, scrollBarWidth } = this.layout;

      return {
        width: `${width + (scrollY ? scrollBarWidth : 0)}px`
      };
    },
    bodyWrapStyles() {
      const styles = {};
      if (this.carousel && this.data.length > this.pageSize) {
        styles.height = `${this.containerHeight}px`;
        styles.overflow = "hidden";
      } else if (typeof this.height === "number") {
        styles.height = `${this.layout.height}px`;
      }
      return styles;
    },
    bodyStyles() {
      if (this.carousel && this.data.length > this.pageSize) {
        if (this.carousel.type === "rowCarousel") {
          return {
            width: `${this.layout.width}px`,
            position: "relative",
            top: `${-this.distance}px`
          };
        } else {
          if (this.animate) {
            return {
              width: `${this.layout.width}px`,
              marginTop: `${this.pageDistance}px`
            };
          } else {
            return {
              width: `${this.layout.width}px`
            };
          }
        }
      } else {
        return {
          width: `${this.layout.width}px`
        };
      }
    },
    showFixedPlaceholder() {
      const {
        rightFixedColumns,
        layout: { scrollY, scrollBarWidth }
      } = this;

      return rightFixedColumns.length > 0 && scrollY && scrollBarWidth > 0;
    }
  },
  watch: {
    height() {
      this.$nextTick(this.updateHeight);
    },
    showHeader() {
      this.$nextTick(this.updateHeight);
    }
  },
  mounted() {
    this.bindEvent();
    this.doUpdateLayout();
  },
  beforeDestroy() {
    if (this.resizeHandler) {
      removeResizeListener(this.$el, this.resizeHandler);
    }
  },
  methods: {
    bindEvent() {
      if (this.fit) {
        this.resizeHandler = debounce(() => {
          this.doUpdateLayout();
        }, 150);
        addResizeListener(this.$el, this.resizeHandler);
      }
    },
    // 当增加或删除 co-table-column 的时候调用更新 originColumns
    columnChange() {
      this.$nextTick(() => {
        this.columns = getColumns(this.$children);
        this.doUpdateLayout();
      });
    },
    onSortingColumnChange(column) {
      this.sortingColumn = column;
      this.sortProp = column.prop;
    },
    onNoSort() {
      this.sortingColumn = null;
      this.sortProp = "";
    },
    onSortChange() {
      const { sortingColumn, sortProp } = this;

      this.$emit("on-sort-change", {
        column: sortingColumn,
        prop: sortProp,
        order: sortingColumn ? sortingColumn.order : ""
      });
    },
    onBodyScroll() {
      const {
        headerWrap,
        bodyWrap,
        leftFixedBodyWrap,
        rightFixedBodyWrap
      } = this.$refs;
      if (headerWrap) headerWrap.scrollLeft = bodyWrap.scrollLeft;
      if (leftFixedBodyWrap) leftFixedBodyWrap.scrollTop = bodyWrap.scrollTop;
      if (rightFixedBodyWrap) rightFixedBodyWrap.scrollTop = bodyWrap.scrollTop;
    },
    onMousewheel(event) {
      const { deltaX, deltaY } = event;
      const { bodyWrap } = this.$refs;

      if (Math.abs(deltaX) < Math.abs(deltaY) || !this.layout.scrollX) return;

      if (deltaX > 0) {
        bodyWrap.scrollLeft += 10;
      } else if (deltaX < 0) {
        bodyWrap.scrollLeft -= 10;
      }
    },
    onHoverIn(index) {
      if (this.carousel && this.data.length > this.pageSize) {
        clearInterval(this.timer);
      }
      this.hoverIndex = index;
    },
    onHoverOut(index) {
      if (this.carousel && this.data.length > this.pageSize) {
        if (this.carousel.type === "rowCarousel") {
          this.rowCarsouel(this.bodyHeight);
        } else {
          this.pageCarsouel();
        }
      }
      this.hoverIndex = index;
    },
    fixedStyles(type) {
      const { scrollY, scrollBarWidth } = this.layout;
      const style = {
        width: `${
          type === "left"
            ? this.layout.leftFixedWidth
            : this.layout.rightFixedWidth
        }px`,
        height: `${this.layout.fixedHeight}px`
      };

      if (type === "right") {
        style.right = `${scrollY && scrollBarWidth > 0 ? scrollBarWidth : 0}px`;
      }

      return style;
    },
    carouselReset() {
      if (this.carousel && this.data.length > this.pageSize) {
        if (this.carousel.type === "rowCarousel") {
          for (let i = 0; i < this.pageSize; i++) {
            this.data.push(this.data[i]);
          }
        }
        setTimeout(() => {
          //初始化容器高度
          let trHeight = this.$refs.bodyWrap.getElementsByTagName("tr");
          for (let i = 0; i < this.pageSize; i++) {
            this.containerHeight =
              this.containerHeight + trHeight[i].clientHeight;
          }
          if (this.carousel.type === "rowCarousel") {
            this.bodyHeight = 0;
            for (let i = 0; i < trHeight.length - this.pageSize; i++) {
              this.bodyHeight = this.bodyHeight + trHeight[i].clientHeight;
            }
            this.rowCarsouel(this.bodyHeight);
            // this.addKeyframesRule(bodyHeight);
          } else {
            this.pageCarsouel();
          }
        }, 500);
      }
    },
    rowCarsouel(h) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.distance++;
        if (this.distance >= h) {
          this.distance = 0;
        }
      }, this.speed / (h / this.data.length + this.pageSize));
    },
    pageCarsouel() {
      this.timer = setInterval(() => {
        let trHeight = this.$refs.bodyWrap.getElementsByTagName("tr");
        let Y = 0;
        for (let i = 0; i < this.pageSize; i++) {
          Y = Y + trHeight[i].clientHeight;
          this.data.push(this.data[i]);
        }
        this.pageDistance = 0;
        this.pageDistance = this.pageDistance - Y;
        this.animate = true;
        setTimeout(() => {
          this.data.splice(0, this.pageSize);
          this.animate = false;
          this.containerHeight = 0;
          for (let i = 1; i < this.pageSize + 1; i++) {
            this.containerHeight =
              this.containerHeight + trHeight[i].clientHeight;
          }
        }, 500);
      }, this.speed);
    }
  },
  created() {
    this.$nextTick(() => {
      this.carouselReset();
    });
  },
  components: {
    TableHeader,
    TableBody
  },
  destroyed() {
    if (this.carousel && this.carousel.type === "rowCarousel") {
      this.data.splice(0, this.pageSize);
    }
    clearInterval(this.timer);
  }
};
</script>
<style>
.marquee_top {
  transition: all 0.5s ease-out;
}
</style>
