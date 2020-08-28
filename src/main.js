import "./styles/index.less";
import { CoButtonGroup, CoButton } from "./components/button";
import { CoCarousel, CoCarouselItem } from "./components/carousel";
import { CoCheckboxGroup, CoCheckbox } from "./components/checkbox";
import CoColorPicker from "./components/color-picker";
import { CoDatePicker } from "./components/date-picker";
import {
  CoDropdown,
  CoDropdownMenu,
  CoDropdownItem
} from "./components/dropdown";
import { CoForm, CoFormItem } from "./components/form";
import { CoRow, CoCol } from "./components/grid";
import CoIcon from "./components/icon";
import CoInput from "./components/input";
import CoInputNumber from "./components/input-number";
import CoMessage from "./components/message";
import CoModal from "./components/modal";
import CoPagination from "./components/pagination";
import CoPopover from "./components/popover";
import { CoRadioGroup, CoRadio } from "./components/radio";
import { CoSelect, CoOption } from "./components/select";
import { CoTabs, CoTabPane } from "./components/tabs";
import { CoTable, CoTableColumn } from "./components/table";
import CoTag from "./components/tag";
import CoTooltip from "./components/tooltip";
import CoTree from "./components/tree";
import clickoutside from "./directives/clickoutside";

const components = [
  CoButtonGroup,
  CoButton,
  CoCarousel,
  CoCarouselItem,
  CoCheckboxGroup,
  CoCheckbox,
  CoColorPicker,
  CoDatePicker,
  CoDropdown,
  CoDropdownMenu,
  CoDropdownItem,
  CoForm,
  CoFormItem,
  CoInput,
  CoInputNumber,
  CoIcon,
  CoRow,
  CoCol,
  CoModal,
  CoPagination,
  CoPopover,
  CoRadioGroup,
  CoRadio,
  CoSelect,
  CoOption,
  CoTabs,
  CoTabPane,
  CoTable,
  CoTableColumn,
  CoTag,
  CoTooltip,
  CoTree,
];

function install(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$message = CoMessage;

  Vue.directive(clickoutside.name, clickoutside);
}

// 在浏览器 script 标签引入的情况下自动安装
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: require("../package.json").version,
  install,
  ...components
};
