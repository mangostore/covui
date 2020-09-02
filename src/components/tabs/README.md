### Tabs

* `activeName` \- name of the selected tab
* `type` \- type of the selected tab
* `custom` \- custom color
    * `border` \- custom border color
    * `background` \- custom background color
    * `font` \- custom font color
    * `activeColor` \- custom type:line active border color
    * `activeBackground` \- custom active background color and pane background color

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| activeName | string/number | -       | -             |
| type | string | card       | card,line            |
| custom | object | { border: "#dcdcdc", background: "#f0f0f0", font: "#333", activeColor: "#1EA7FD", activeBackground: "#fff" }       | -            |

### TabPane

* `name` \- tab name,for activeName of tabs
* `label` \- title of the tab 
* `disabled` \- disabled current tab

|  propName  | propType | defaultValue | acceptedValue |
| ---------- | -------- | ------------ | ------------- |
| name       | string/number | -       | -             |
| label      | string   | -            | -             |
| disabled   | boolean  | false        | -             |
