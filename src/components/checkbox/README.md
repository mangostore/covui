### Checkbox

* `value` \- use `v-model` to two-way binding. only works alone
* `label` \- set as checkbox label if no slot, and works for group value
* `trueLabel` \- value of the checkbox if it checked. only works alone
* `falseLabel` \- value of the checkbox if it's not checked. only works alone
* `indeterminate` \- set state of indeterminate. only works alone
* `checked` \- set checkbox checked in group
* `disabled` \- disable checkbox or not
* `validate` \- support validate or not

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| value      | boolean/string/number| null | -         |
| label      | boolean/string/number| null | -         |
| trueLabel  | boolean/string/number| null  | -        |
| falseLabel | boolean/string/number| null | -        |
| indeterminate | boolean | false      | -             |
| checked    | boolean  | false        | -             |
| disabled   | boolean  | false        | -             |
| validate   | boolean  | true         | -             |

### CheckboxGroup

* `value` \- checkbox group value, use `v-model` to two-way binding

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| value      | array    | null         | -             |
