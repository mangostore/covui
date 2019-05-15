### Tooltip

* `content` \- content of tooltip, also support slot
* `trigger` \- trigger of tooltip
* `placement` \- position of tooltip
* `delay` \- delay of appearance, like { show: 100, hide: 100 } or number
* `animation` \- whether toggle with animation
* `transition` \- animation name	
* `options` \- popper's options, same as <a href="https://popper.js.org" target="_blank">popper.js v1.14.7</a>  
* `appendBody` \- if true, popper node append to body
* `always` \- always show tooltip
* `disabled` \- disable tooltip

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| content    | string   | -            | -             |
| trigger    | string   | hover        | hover/click/focus |
| placement  | string   | bottom       | top/top-start/top-end/right/right-start/right-end/bottom/bottom-start/bottom-end/left/left-start/left-end |
| delay      | number/object | 0       | -             |
| animation  | boolean  | true         | -             |
| transition | string   | co-scale     | -             |
| options    | object   | {modifiers: {computeStyle: {gpuAcceleration: false}}} | - |
| appendBody | boolean  | true         | -             |
| always     | boolean  | false        | -             |
| disabled   | boolean  | false        | -             |
