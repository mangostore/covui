import { storiesOf } from "@storybook/vue";
import { CoTable, CoTableColumn } from "../src/components/table";
import notes from "../src/components/table/README.md";

const tableData = [
  {
    index: 1,
    name: "Lucy",
    score: "98",
    description: "long description that make up the number of amount"
  },
  {
    index: 2,
    name: "Lily",
    score: "92",
    description: "long"
  },
  {
    index: 3,
    name: "Merry",
    score: "81",
    description: "long description that make up the number of amount"
  },
  {
    index: 4,
    name: "John",
    score: "99",
    description: "long"
  },
  {
    index: 5,
    name: "Davi",
    score: "62",
    description: "long description that make up the number of amount"
  },
    {
        index: 6,
        name: "Lucy",
        score: "98",
        description: "long"
    },
    {
        index: 7,
        name: "Lily",
        score: "92",
        description: "long description that make up the number of amount"
    },
    {
        index: 8,
        name: "Merry",
        score: "81",
        description: "long dt"
    },
    {
        index: 9,
        name: "John",
        score: "99",
        description: "long description that make up the number of amount"
    },
    {
        index: 10,
        name: "Davi",
        score: "62",
        description: "long description"
    }
];



const treeData = [
  {
    index: 1,
    name: "Lucy",
    score: "98",
    children: [
      { index: 11, name: "Language", score: "96" },
      { index: 12, name: "Mathematics", score: "100" }
    ]
  },
  {
    index: 2,
    name: "Lily",
    score: "92",
    children: [
      { index: 21, name: "Language", score: "92" },
      { index: 22, name: "Mathematics", score: "92" }
    ]
  },
  { index: 3, name: "Merry", score: "81" },
  { index: 4, name: "John", score: "99" },
  { index: 5, name: "Davi", score: "62" }
];

const tableData2 = [
  {
    schoolName: "一中",
    name: "Lucy",
    sex: "女",
    score: "98",
    description: "long description that make up the number of amount"
  },
  {
    schoolName: "二中",
    name: "Daisy",
    sex: "男",
    score: "100",
    description: "long description that make up the number of amount"
  }
];

storiesOf("Table", module)
  .add(
    "basic table",
    () => ({
      components: { CoTable, CoTableColumn },
      data() {
        return {
          list: tableData
        };
      },
      template: `
      <div>
        <co-table :data="list" style="margin-bottom: 10px;">
          <co-table-column label="index" prop="index"></co-table-column>
          <co-table-column label="name"  prop="name"></co-table-column>
          <co-table-column label="score" prop="score"></co-table-column>
        </co-table>

        <co-table :data="list" border stripe hover style="margin-bottom: 10px;">
          <co-table-column label="index" :width="60" header-align="center" align="center" prop="index"></co-table-column>
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
          list: tableData
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
        methods:{
            iconClick(e){
                //点击树节点展开收缩图标
            }
        },
      data() {
        return {
          list: treeData
        };
      },
      template: `
      <co-table :data="list" border rowKey="name" :expandRowKeys="['Lily']" @iconClick="iconClick">
        <co-table-column label="index" prop="index"></co-table-column>
        <co-table-column label="name" prop="name"></co-table-column>
        <co-table-column label="score" prop="score"></co-table-column>
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
          list: tableData
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
          list: tableData
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
  )
  .add(
    "custom style table",
    () => ({
      components: { CoTable, CoTableColumn },
      data() {
        return {
          list1: tableData.concat(tableData),
          list2: tableData,
          list3: tableData2
        };
      },
      template: `
        <div>
          <co-table
            :height="180"
            :custom="{ 
              border: '#306fcf',
              background: '#162963',
              headerBackground: 'rgb(230, 120, 38)',
              evenBackground: '#3550a2',
              font: '#fff',
              textAlign:'center',
               colsHeaderColor:'rgba(239,61,171,1)'
            }"
            :data="list1"
            border
            stripe
            hover>
            <co-table-column label="index" prop="index"></co-table-column>
            <co-table-column label="name" prop="name" sortable="true"></co-table-column>
            <co-table-column label="score" prop="score"  sortable="true"></co-table-column>
          </co-table>
           <div style="margin-top: 10px; padding: 10px; background: #030d2f;">
            <co-table
              :custom="{ 
                border: '#306fcf',
                background: 'transparent',
                headerBackground: 'transparent',
                evenBackground: '#3550a2',
                font: '#fff'
              }"
              :data="list2"
              border
              stripe
              hover>
              <co-table-column label="index" prop="index"></co-table-column>
              <co-table-column label="name" prop="name"></co-table-column>
              <co-table-column label="score" prop="score"></co-table-column>
            </co-table>
          </div>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "rowCarousel style table",
    () => ({
      components: { CoTable, CoTableColumn },
      data() {
        return {
          list1: tableData.concat(tableData),
          list2: tableData,
        };
      },
      template: `
        <div>
          <co-table
            :data="list2"
            border
            stripe
            :pageSize=3
           :carousel="{
           type:'rowCarousel',
           rowNums:5,
           speed:3000,
           }"
            hover>
            <co-table-column label="index" prop="index"></co-table-column>
            <co-table-column label="name" prop="name"></co-table-column>
            <co-table-column label="score" prop="score"></co-table-column>
            <co-table-column label="description" prop="description"></co-table-column>
          </co-table>
          </div>
      `
    }),
    { notes }
  )
    .add(
        "pageCarousel style table",
        () => ({
            components: { CoTable, CoTableColumn },
            data() {
                return {
                    list1: tableData.concat(tableData),
                    list2: tableData,
                };
            },
            template: `
        <div>
          <co-table
            :data="list2"
            border
            :showHeader="false"
            :pageSize=8
            :carousel="{
           type:'pageCarousel',
           speed:3000,
           }">
            <co-table-column label="index" prop="index"></co-table-column>
            <co-table-column label="name" prop="name"></co-table-column>
            <co-table-column label="score" prop="score"></co-table-column>
            <co-table-column label="description" prop="description"></co-table-column>
          </co-table>
          </div>
      `
        }),
        { notes }
    )
