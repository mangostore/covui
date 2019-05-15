### row

* `type` \- layout mode, you can use flex, works in modern browsers	
* `gutter` \- grid spacing
* `justify` \- horizontal alignment of flex layout	
* `align` \- vertical alignment of flex layout

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| type       | string   | -            | flex          |
| gutter     | number   | 0            | -             |
| justify    | string   | -            | start/end/center/space-round/space-between |
| align      | string   | -            | top/middle/bottom |

### col

* `span` \- number of column the grid spans
* `offset` \- number of spacing on the left side of the grid
* `push` \- number of columns that grid moves to the right
* `pull` \- number of columns that grid moves to the left
* `order` \- grid order of flex layout
* `xs` \- < 768px, responsive columns or column props object
* `sm` \- >= 768px, responsive columns or column props object
* `md` \- >= 992px, responsive columns or column props object
* `lg` \- >= 1200px, responsive columns or column props object

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| span       | number/string | -       | -             |
| offset     | number/string | -       | -             |
| push       | number/string | -       | -             |
| pull       | number/string | -       | -             |
| order      | number/string | -       | -             |
| xs         | number/object | -       | -             |
| sm         | number/object | -       | -             |
| md         | number/object | -       | -             |
| lg         | number/object | -       | -             |
