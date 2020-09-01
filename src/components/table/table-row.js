import TableCell from './table-cell';

export default {
  name: 'table-row',
  inject: {
    custom: {
      type: Object,
      default: null
    },
    stripe: {
      type: Boolean,
      default: false
    }
  },
  props: {
    row: Object,
    columns: Array,
    index: Number,
    visible: Boolean,
    indent: Number,
    indentSize: Number,
    expandable: Boolean,
    isNeedIndent: Boolean,
    expanded: Boolean,
    cellClasses: Function,
  },
  data() {
    return {
      expandColumnIndex: 0, // 展开图标的位置
      currentRow: false
    };
  },
  methods: {
    cellStyles(index) {
      const even = index % 2 > 0
      return { backgroundColor: this.currentRow ? (this.custom && this.custom.evenBackground || '') : this.stripe && even ? (this.custom && this.custom.evenBackground || '') : (this.custom && this.custom.background || '') };
    },
    renderCells() {
      const {
        row,
        columns,
        index,
        indent,
        indentSize,
        expandable,
        isNeedIndent,
        expandColumnIndex,
        expanded,
        cellClasses,
      } = this;

      return columns.map((column, columnIndex) => (
        <table-cell
          row={row}
          column={column}
          indent={indent}
          indentSize={indentSize}
          hasExpandIcon={columnIndex === expandColumnIndex}
          expandable={expandable}
          isNeedIndent={isNeedIndent}
          expanded={expanded}
          cellClasses={cellClasses}
          rowIndex={index}
          columnIndex={columnIndex}></table-cell>
      ));
    },
  },
  render() {
    const { index } = this
    return <tr v-show={this.visible} style={this.cellStyles(index)} v-on:mouseenter={()=>this.currentRow = true} v-on:mouseleave={()=>this.currentRow = false}>{this.renderCells()}</tr>;
  },
  components: {
    TableCell,
  },
};
