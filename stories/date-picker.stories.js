import { storiesOf } from "@storybook/vue";
import { CoDatePicker } from "../src/components/date-picker";
import notes from "../src/components/date-picker/README.md";

storiesOf("DatePicker", module)
  .add(
  "date picker",
  () => ({
    components: { CoDatePicker },
    data() {
      return {
        select1: null
      };
    },
    template: `
    <div>
      <co-date-picker v-model="select1"/>
      <p>{{select1}}</p>
    </div>
    `
  }),
  { notes }
);
