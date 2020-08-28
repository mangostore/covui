### Select

* `value` \- selected value, v-model to two-way binding
* `size` \- select size
* `placeholder` \- select placeholder
* `clearable` \- support clear selected
* `disabled` \- disabled select
* `checkedAll` \- select all
* `filterable` \- search select
* `on-filter` \- filterable change function

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| value      | string/number/boolean | - | -           |
| size       | string   | -            | small/large   |
| placeholder | string   | 请选择       | -             |
| clearable  | boolean  | false        | -             |
| disabled   | boolean  | false        | -             |
| checkedAll   | boolean  | false        | -             |
| filterable   | boolean  | false        | -             |
| on-filter   | function  | -        | val             |

### Option

* `value` \- value for select
* `label` \- option label, same as value if omitted
* `disabled` \- disabled option

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| value      | string/number/boolean | - | -           |
| label      | string   | -            | -             |
| disabled   | boolean  | false        | -             |
