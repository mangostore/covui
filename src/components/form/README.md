### Form

* `model` \- data of form
* `rules` \- validation rules of form, see more at <a href="https://github.com/yiminghe/async-validator" target="_blank">async-validator</a>    
* `labelPosition` \- position of label
* `labelWidth` \- width of label, if labelPosition is not top, required
* `inline` \- whether the form is inline
* `showMessage` \- whether to show error message

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| model      | object   | -            | -             |
| rules      | object   | -            | -             |
| labelPosition | string | right       | left/right/top |
| labelWidth | number   | -            | -             |
| inline     | boolean  | false        | -             |
| showMessage | boolean | true         | -             |

### FormItem

* `prop` \- a key of model
* `label` \- label of form item
* `labelWidth` \- width of label
* `rules` \- validation rules of form
* `required` \- whether the field is required
* `showMessage` \- whether to show the error message

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| prop       | string   | -            | keys of form's model |
| label      | string   | -            | -             |
| labelWidth | number   | -            | -             |
| rules      | object/array | -        | -             |
| required   | boolean  | false        | -             |
| showMessage | boolean | true         | -             |
