import { storiesOf } from "@storybook/vue";
import { CoDatePicker } from "../src/components/date-picker";
import notes from "../src/components/date-picker/README.md";

storiesOf("DatePicker", module).add(
  "date picker",
  () => ({
    components: { CoDatePicker },
    data() {
      return {
        select1: null,
        select2: null
      };
    },
    template: `
      <div>
      <co-date-picker v-model="select1"/>
      <p>{{ select1 }}</p>
      <co-date-picker
        v-model="select2"
        :custom="{
          input:{border: '#fff', hover: '#575FF3', blur: 'rgba(66, 144, 255, .2)',icon: '#ccc', font: '#fff', background: '#000'},
          picker:{shadow: 'rgba(255, 255, 255, .2)', border: '#999', background: '#000', leftBg: '#444', leftSelect: '#999', font: '#fff', week: '#ccc', selectLight: '#999', select: '#ddd', btnFont: '#333'}
        }"
      />
      <p>{{ select2 }}</p>
      </div>
    `
  }),
  { notes }
);
