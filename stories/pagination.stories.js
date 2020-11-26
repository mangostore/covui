import { storiesOf } from "@storybook/vue";
import CoPagination from "../src/components/pagination";
import notes from "../src/components/pagination/README.md";
import actions from "./actions";

storiesOf("Pagination", module)
  .add(
    "basic pagination",
    () => ({
      components: { CoPagination },
      methods: actions,
      template: `
      <co-pagination :total="55" :page-size="5" :max-pages="5" :current="2" @page-change="pageChange" 
      :custom="{
      background: 'transparent',
      border: '#16397a',
      carousel: false,
      colsHeaderColor: 'transparent',
      evenBackground: 'transparent',
      font: '#dfe5f1',
      headerBackground: 'transparent',
      hiddenValues: false,
      indexOrder: false,
      pageSize: 20,
      textAlign: 'left',
      }"></co-pagination> 
    `
    }),
    { notes }
  )
  .add(
    "ellipsis pagination",
    () => ({
      components: { CoPagination },
      methods: actions,
      template: `
      <co-pagination :total="100" :max-pages="5" ellipsis @page-change="pageChange" ></co-pagination> 
    `
    }),
    { notes }
  )
  .add(
    "no prev next",
    () => ({
      components: { CoPagination },
      methods: actions,
      template: `
      <co-pagination :total="100" :prev="false" :next="false" @page-change="pageChange"></co-pagination> 
    `
    }),
    { notes }
  );
