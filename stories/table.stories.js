import { storiesOf } from "@storybook/vue";
import { CoTable, CoTableColumn } from "../src/components/table";
import notes from "../src/components/table/README.md";

storiesOf("Tables", module).add(
  "tables usage",
  () => ({
    components: { CoTable, CoTableColumn },
    data() {
      return {
        list: [
          { index: 1, name: "Lucy", score: "98" },
          { index: 2, name: "Lily", score: "92" },
          { index: 3, name: "Merry", score: "81" },
          { index: 4, name: "John", score: "99" },
          { index: 5, name: "Davi", score: "62" },
        ]
      };
    },
    template: `
    <co-table :data="list" border>
      <co-table-column label="index" prop="index"></co-table-column>
      <co-table-column label="name" prop="name"></co-table-column>
      <co-table-column label="score" prop="score"></co-table-column>
    </co-table>
    `
  }),
  { notes }
);
