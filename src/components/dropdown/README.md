### Dropdown

* `trigger` \- trigger type
* `show` \- define show status when trigger type is custom
* `placement` \- popper's placement
* `options` \- popper's options, same as <a href="https://popper.js.org" target="_blank">popper.js v1.14.7</a>  
* `appendBody` \- if true, popper node append to body

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| trigger    | string   | hover        | hover/click/custom |       
| show       | boolean  | false        | -             |       
| placement  | string   | bottom       | top/top-start/top-end/right/right-start/right-end/bottom/bottom-start/bottom-end/left/left-start/left-end |       
| options    | object   | {modifiers: {computeStyle: {gpuAcceleration: false}}} | - |       
| appendBody | boolean  | true         | -             |

### DropdownMenu

* dropdown item wrapper

### DropdownItem

* `label` \- label value, click callback value
* `disabled` \- disabled item
* `active` \- active item
* `divided` \- if true, item add top border to divide

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| label      | string/number | -       | -             |  
| disabled   | boolean  | false        | -             |  
| active     | boolean  | false        | -             |  
| divided    | boolean  | false        | -             |  
