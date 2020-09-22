### Select

* `value` \- selected value, v-model to two-way binding
* `size` \- select size
* `placeholder` \- select placeholder
* `clearable` \- support clear selected
* `disabled` \- disabled select
* `checkedAll` \- select all
* `filterable` \- search select
* `filterFn` \- filterable function
* `on-filter` \- filterable change event

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| value      | string/number/boolean | - | -           |
| size       | string   | -            | small/large   |
| placeholder | string   | 请选择       | -             |
| clearable  | boolean  | false        | -             |
| disabled   | boolean  | false        | -             |
| checkedAll   | boolean  | false        | -             |
| filterable   | boolean  | false        | -             |
| filterFn   | function  | -        | -             |
| on-filter   | event  | -        | -             |

### Option

* `value` \- value for select
* `label` \- option label, same as value if omitted
* `disabled` \- disabled option

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| value      | string/number/boolean | - | -           |
| label      | string   | -            | -             |
| disabled   | boolean  | false        | -             |
