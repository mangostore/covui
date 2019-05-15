import { configure } from '@storybook/vue';
import '../src/styles/index.less';
import '../stories/_storybook.less'; // 定制storybook样式

const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
