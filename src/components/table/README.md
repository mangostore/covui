### Table

* `data` \- table data
* `border` \- table with border
* `stripe` \- table with stripe style
* `hover` \- whether hover row has hover style
* `height` \- table height
* `fit` \- column fit to content
* `showHeader` \- whether show table header
* `emptyText` \- no data text
* `defaultSort` \- default sort
* `rowKey` \- row key
* `expandRowKeys` \- expand rows of key
* `defaultExpandAll` \- expand all rows
* `indentSize` \- indent size with tree data
* `childrenColumnName` \- tree data children prop

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| data       | array    | []           | -             |
| border     | boolean  | false        | -             |
| stripe     | boolean  | false        | -             |
| hover      | boolean  | false        | -             |
| height     | number   | -            | -             |  
| fit        | boolean  | false        | -             |
| showHeader | boolean  | true         | -             |
| emptyText  | string   | 暂无数据      | -             |
| defaultSort| object   | -            | -             |
| rowKey     | string/function | -     | -             |
| expandRowKeys | array | -            | -             |
| defaultExpandAll | boolean | false   | -             |
| indentSize | number   | 18           | -             |
| childrenColumnName | string | children | -           |

### Column

* `label` \- table header title
* `prop` \- match to prop of data 
* `align` \- body text algin
* `headerAlign` \- header text algin
* `width` \- column width
* `minWidth` \- column min-width
* `sortable` \- whether column can sort
* `sortMethod` \- sort method
* `resizable` \- whether column can resize
* `fixed` \- fixed current column

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| label      | string   | -            | -             |
| prop       | string   | -            | -             |
| align      | string   | left         | left/center/right |
| headerAlign | string  | -            | left/center/right |
| width      | number   | -            | -             |
| minWidth   | number   | -            | -             |
| sortable   | boolean/string | false  | -             |
| sortMethod | function | -            | -             |
| resizable  | boolean  | true         | -             |
| fixed      | string   | -            | left/right    |

### Column Scoped Slot

|  slotName  |  arguments  |
| ---------- | ----------- |
| default    | { row, column, $index } |