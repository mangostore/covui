import TableCell from './table-cell';

export default {
  name: 'table-row',
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
    };
  },
  methods: {
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
    return <tr v-show={this.visible}>{this.renderCells()}</tr>;
  },
  components: {
    TableCell,
  },
};
