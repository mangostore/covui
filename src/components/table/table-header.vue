<template>
  <table class="co-table__header">
    <colgroup>
      <col
        v-for="(column, index) in flattenColumns"
        :key="index"
        :style="{width: `${column.realWidth}px`}"zz></col>
      <col
        v-if="hasScrollBar"
        :style="{width: `${scrollBarWidth}px`}"></col>
    </colgroup>
    
    <thead>
      <tr
        v-for="(row, index_tr) in rows"
        :key="index_tr">
        <th
          v-for="(column, index_th) in row"
          :key="index_th"
          :class="cellClasses(column, index_th)"
          :style="cellStyles(column)"
          :colspan="column.colSpan"
          :rowspan="column.rowSpan"
          @mousedown="onMousedown($event, column)"
          @mousemove="onMousemoveProxy($event, column)"
          @mouseout="onMouseout">
          <div class="co-table__cell">

            <table-header-title :column="column"></table-header-title>
            
            <!-- sortable为true对应度量 -->
            <template v-if="column.sortable">
              <span 
                class="co-table__icon co-table__sort" 
                v-if="column.order === ''"
                @click="onSort(column)">
                <co-icon type="ios-arrow-thin-up"></co-icon>
                <co-icon type="ios-arrow-thin-down"></co-icon>
              </span>
              <co-icon
                class="co-table__icon co-table__sort"
                v-else
                :type="column.order === 'asc' ? 'android-arrow-up' : 'android-arrow-down'"
                @click.native="onSort(column)"></co-icon>
              <co-icon
                v-if="!isMobile"
                title="表格条件配置"
                class="co-table__icon co-table__color"
                type='ios-color-filter-outline'
                @click.native="showTableConditionModal(column)"></co-icon>
            </template>
          </div>
        </th>
      </tr>
    </thead>
    
    <!-- <table-condition
      :isMobile="isMobile"
      :visiable="visiable"
      :colors="colors"
      :conditionSetting="conditionSettingColumn"
      :showHide="showHide"
      @modal-ok="onModalOk"
      @modal-cancel="onModalCancel"></table-condition> -->
  </table>
</template>

<script>
  import cloneDeep from 'lodash/cloneDeep';
  import throttle from 'lodash/throttle';
  import mixins from './mixins';
  import { getHeaderRows } from './utils';
  // import TableCondition from './table-condition';

  export default {
    name: 'table-header',
    mixins: [mixins],
    components: {
      // TableCondition,
      TableHeaderTitle: {
        props: ['column'],
        render() {
          return this.column.renderHeader(this.column);
        },
      },
    },
    props: {
      originColumns: {
        type: Array,
        default() { return []; },
      },
      sortingColumn: {
        type: Object,
        default() { return null; },
      },
      scrollY: {
        type: Boolean,
        default: false,
      },
      scrollBarWidth: {
        type: Number,
        default: 0,
      },
      border: {
        type: Boolean,
        default: false,
      },
      colors: Array,
      conditionSettings: Array,
    },
    data() {
      return {
        dragging: false,
        draggingColumn: null,
        dragState: {},
        onMousemoveProxy: null,
        setColumn: null,
        visiable: false,
        isMobile: false,
      };
    },
    computed: {
      rows() {
        return getHeaderRows(this.originColumns);
      },
      hasScrollBar() {
        return !this.fixed && this.scrollY && this.scrollBarWidth > 0;
      },
      conditionSettingColumn() {
        const { conditionSettings, setColumn } = this;
        let result = null;
        const prop = setColumn && setColumn.prop;

        if (conditionSettings && setColumn) {
          this.conditionSettings.forEach((item) => {
            if (item.mainId === prop) {
              result = item;
            }
          });
        }

        return result;
      },
      showHide() {
        if (this.conditionSettings) {
          return this.conditionSettings.some(item => item.hide);
        }

        return false;
      },
    },
    methods: {
      switchOrder(order) {
        if (!order) {
          return 'asc';
        } else if (order === 'asc') {
          return 'desc';
        }

        return '';
      },
      cellStyles(column) {
        return { textAlign: column.headerAlign || column.align };
      },
      onSort(column) {
        const { sortingColumn } = this;
        const order = this.switchOrder(column.order);

        if (sortingColumn !== column) {
          if (sortingColumn) {
            sortingColumn.order = '';
          }

          this.$emit('sorting-column-change', column);
        }

        if (!order) {
          this.$emit('no-sort');
        }

        column.order = order;
        this.$emit('sort-change');
      },
      onMousedown(event, column) {
        if (column.children && column.children.length > 0) return;
        if (this.draggingColumn && this.border) {
          const table = this.$parent;
          const resizeProxy = table.$refs.resizeProxy;
          const tableLeft = table.$el.getBoundingClientRect().left;
          const columnRect = this.$el.querySelector(`.${column.columnId}`).getBoundingClientRect();
          const minLeft = columnRect.left - tableLeft + 60;

          table.resizeProxyVisible = true;
          this.dragging = true;
          this.dragState = {
            startMouseLeft: event.clientX,
            startLeft: columnRect.right - tableLeft,
            startColumnLeft: columnRect.left - tableLeft,
          };
          resizeProxy.style.left = `${this.dragState.startLeft}px`;

          // 拖动的同时禁用页面选中文本与拖拽功能
          /* eslint-disable */
          document.onselectstart = () => false;
          document.ondragstart = () => false;

          const onMousemove = throttle((event) => {
            const { startMouseLeft, startLeft } = this.dragState;
            const moveLeft = event.clientX - startMouseLeft;
            const proxyLeft = startLeft + moveLeft;

            resizeProxy.style.left = `${Math.max(proxyLeft, minLeft)}px`;
          }, 17);

          const onMouseup = () => {
            if (this.dragging) {
              const { startColumnLeft } = this.dragState;
              const finalLeft = parseFloat(resizeProxy.style.left);
              const width = finalLeft - startColumnLeft;

              column.resizeWidth = width;
              column.realWidth = width;

              table.doUpdateLayout();

              this.dragging = false;
              this.draggingColumn = null;
              this.dragState = {};
              document.body.style.cursor = '';
              table.resizeProxyVisible = false;
            }

            document.removeEventListener('mousemove', onMousemove);
            document.removeEventListener('mouseup', onMouseup);
            document.onselectstart = null;
            document.ondragstart = null;
          };

          document.addEventListener('mousemove', onMousemove);
          document.addEventListener('mouseup', onMouseup);
        }
      },
      onMousemove(event, column) {
        if (!column || !column.resizable) return;
        if (column.children && column.children.length > 0) return;

        let target = event.target;

        while (target && target.tagName !== 'TH') {
          target = target.parentNode;
        }

        if (!this.dragging && this.border) {
          const rect = target.getBoundingClientRect();
          const bodyStyle = document.body.style;

          if (rect.width > 12 && rect.right - event.pageX < 8) {
            bodyStyle.cursor = 'col-resize';
            this.draggingColumn = column;
          } else {
            bodyStyle.cursor = '';
            this.draggingColumn = null;
          }
        }
      },
      onMouseout() {
        if (!this.dragging) {
          document.body.style.cursor = '';
        }
      },
      showTableConditionModal(column) {
        this.setColumn = column;
        this.visiable = true;
      },
      onModalOk(payload) {
        const { setting, showAll } = payload;
        let settings = [];
        let noNeedPushSetting = false;
        const mainId = this.setColumn && this.setColumn.prop;
        const columnSetting = Object.assign({mainId: mainId}, setting);

        if (this.conditionSettings) {
          settings = cloneDeep(this.conditionSettings);
        }

        if (showAll) {
          columnSetting.hide = false;
          this.$emit('show-all');
        }

        settings.forEach(function forEachSettings(item, index) {
          if (showAll) {
            item.hide = false;
          }

          if (item.mainId === mainId) {
            settings.splice(index, 1, columnSetting);
            noNeedPushSetting = true;
          }
        })

        if (!noNeedPushSetting) {
          settings.push(columnSetting);
        }

        this.$emit('condition-ensure', settings);
        this.visiable = false;
      },
      onModalCancel() {
        this.visiable = false;
      },
    },
    created() {
      this.onMousemoveProxy = throttle(this.onMousemove, 17);
      const u = navigator.userAgent;
      this.isMobile = !!u.match(/AppleWebKit.*Mobile.*/);
    },
  }
</script>
