# Covui
A vue.js 2.0 UI components for Web
https://mangostore.github.io/covui

### Install
```
npm install covui --save
```
OR
```
<script type="text/javascript" src="covui.umd.min.js"></script>
<link rel="stylesheet" href="covui.css">
```

### Quick Start
js
```
import Vue from 'vue';
import Covui from 'covui';

Vue.use(Covui);
```

css
```
import 'covui/dist/covui.css';
```
OR
```
import 'covui/src/styles/index.less';
```

### Browser Support
Modern browers and Internet Explorer 10+.

### Development
Node.js 11+ and npm 6+ are required.

develop
```
git clone https://github.com/mangostore/covui.git
npm install
npm run storybook
```

publish
```
npm run build
npm run build-storybook
npm publish
```

### License
[MIT](https://opensource.org/licenses/MIT)
