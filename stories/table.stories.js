import { storiesOf } from "@storybook/vue";
import { CoTable, CoTableColumn } from "../src/components/table";
import notes from "../src/components/table/README.md";

const tableData = [
  { index: 1, name: "Lucy", score: "98", description: "long description that make up the number of amount" },
  { index: 2, name: "Lily", score: "92", description: "long description that make up the number of amount" },
  { index: 3, name: "Merry", score: "81", description: "long description that make up the number of amount" },
  { index: 4, name: "John", score: "99", description: "long description that make up the number of amount" },
  { index: 5, name: "Davi", score: "62", description: "long description that make up the number of amount" },
];

const treeData = [
  {
    index: 1, name: "Lucy", score: "98", children: [
      {index: 11, name: "Language", score: "96"},
      {index: 12, name: "Mathematics", score: "100" }
   ],
  },
  { index: 2, name: "Lily", score: "92", children: [
      {index: 21, name: "Language", score: "92"},
      {index: 22, name: "Mathematics", score: "92" }
    ],
  },
  { index: 3, name: "Merry", score: "81" },
  { index: 4, name: "John", score: "99" },
  { index: 5, name: "Davi", score: "62" },
];

storiesOf("Table", module)
  .add(
    "basic table",
    () => ({
      components: { CoTable, CoTableColumn },
      data() {
        return {
          list: tableData,
        };
      },
      template: `
      <co-table :data="list">
        <co-table-column label="index" prop="index"></co-table-column>
        <co-table-column label="name" prop="name"></co-table-column>
        <co-table-column label="score" prop="score"></co-table-column>
      </co-table>
      `
    }),
    { notes }
  )
  .add(
    "table with style",
    () => ({
      components: { CoTable, CoTableColumn },
      data() {
        return {
          list: tableData,
        };
      },
      template: `
        <div>
          <co-table :data="list" border stripe hover>
            <co-table-column label="index" prop="index"></co-table-column>
            <co-table-column label="name" prop="name"></co-table-column>
            <co-table-column label="score" prop="score"></co-table-column>
          </co-table>
          <co-table
            :custom="{border: '#fff', background: 'blue', headerBackground: 'red', evenBackground: 'orange', font: '#fff'}"
            :data="list" border stripe hover>
            <co-table-column label="index" prop="index"></co-table-column>
            <co-table-column label="name" prop="name"></co-table-column>
            <co-table-column label="score" prop="score"></co-table-column>
          </co-table>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "table without header",
    () => ({
      components: { CoTable, CoTableColumn },
      data() {
        return {
          list: tableData,
        };
      },
      template: `
      <co-table :data="list" border :show-header="false">
        <co-table-column label="index" prop="index"></co-table-column>
        <co-table-column label="name" prop="name"></co-table-column>
        <co-table-column label="score" prop="score"></co-table-column>
      </co-table>
      `
    }),
    { notes }
  )
  .add(
    "table with tree data",
    () => ({
      components: { CoTable, CoTableColumn },
      data() {
        return {
          list: treeData,
        };
      },
      template: `
      <co-table :data="list" border rowKey="index" :expandRowKeys="[1]">
        <co-table-column label="index" prop="index"></co-table-column>
        <co-table-column label="name" prop="name"></co-table-column>
        <co-table-column label="score" prop="score"></co-table-column>
      </co-table>
      `
    }),
    { notes }
  )
  .add(
    "table align",
    () => ({
      components: { CoTable, CoTableColumn },
      data() {
        return {
          list: tableData,
        };
      },
      template: `
      <co-table :data="list" border>
        <co-table-column label="index" prop="index" header-align="center" align="left"></co-table-column>
        <co-table-column label="name" prop="name" header-align="center" align="center"></co-table-column>
        <co-table-column label="score" prop="score" header-align="center" align="center"></co-table-column>
      </co-table>
      `
    }),
    { notes }
  )
  .add(
    "fixed table",
    () => ({
      components: { CoTable, CoTableColumn },
      data() {
        return {
          list: tableData,
        };
      },
      template: `
      <co-table :data="list" border style="width: 500px;">
        <co-table-column label="index" prop="index" fixed="left"></co-table-column>
        <co-table-column label="name" prop="name"></co-table-column>
        <co-table-column label="score" prop="score"></co-table-column>
        <co-table-column label="description" prop="description" :width="300"></co-table-column>
      </co-table>
      `
    }),
    { notes }
  )
  .add(
    "sortable table",
    () => ({
      components: { CoTable, CoTableColumn },
      data() {
        return {
          list: tableData,
        };
      },
      template: `
      <co-table :data="list" border>
        <co-table-column label="index" prop="index"></co-table-column>
        <co-table-column label="name" prop="name"></co-table-column>
        <co-table-column label="score" prop="score" sortable></co-table-column>
      </co-table>
      `
    }),
    { notes }
  );
