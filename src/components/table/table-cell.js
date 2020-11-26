import ExpandIcon from './expand-icon';

export default {
  name: 'table-cell',
  inject: {
    custom: {
      type: Object,
      default: null
    }
  },
  props: {
    row: Object,
    column: Object,
    indent: Number,
    indentSize: Number,
    hasExpandIcon: Boolean,
    expandable: Boolean,
    isNeedIndent: Boolean,
    expanded: Boolean,
    rowIndex: Number,
    columnIndex: Number,
    cellClasses: Function,
  },
  methods: {
    cellStyles(column) {
      let styles={};
      styles.textAlign=column.align;
      styles.borderColor=this.custom && this.custom.border || '';
      styles.backgroundColor=(this.column.prop&&!this.column.sortable)?(this.custom ?this.custom.colsHeaderColor:"") : '';
      return styles;
    },
    renderExpandIcon() {
      const { row, expandable, isNeedIndent, expanded } = this;

      return this.hasExpandIcon ?
        <expand-icon
          row={row}
          expandable={expandable}
          isNeedIndent={isNeedIndent}
          expanded={expanded}></expand-icon> :
        null;
    },
  },
  render() {
    const { row, column, hasExpandIcon, indent, indentSize, rowIndex, columnIndex } = this;
    const indentHolder = hasExpandIcon ?
      <span style={{ paddingLeft: `${indent * indentSize}px` }}></span> :
      null;

    return (
      <td class={this.cellClasses(column, columnIndex)} style={this.cellStyles(column)}>
        <div class="co-table__cell" style={column.styles}>
          {indentHolder}
          {this.renderExpandIcon()}
          {column.renderCell({ row, column, $index: rowIndex })}
        </div>
      </td>
    );
  },
  components: {
    ExpandIcon,
  },
};
