### Input

* `value` \- binding value, use v-model to two-way binding	
* `type` \- type of input
* `placeholder` \- placeholder of input	
* `size` \- size of input, works when type is not textarea
* `icon` \- co-icon type, works when type is not textarea
* `rows` \- number of rows, works when type is textarea 
* `readonly` \- same as readonly in native input	
* `autofocus` \- same as autofocus in native input
* `disabled` \- same as autofocus in native input
* `autocomplete` \- same as autocomplete in native input, only works when type is not textarea
* `validate` \- whether will trigger form validation

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| value      | string/number | -       | -             |
| type       | string   | text         | textarea/native input types |
| placeholder | string  | -            | -             |
| size       | string   | -            | small/large   |
| icon       | string   | -            | -             |
| rows       | number   | 2            | -             |
| readonly   | boolean  | false        | -             |
| disabled   | boolean  | false        | -             |
| autofocus  | boolean  | false        | -             |
| autocomplete | string | off          | native autocomplete attribute |
| validate   | boolean  | true         | -             |
