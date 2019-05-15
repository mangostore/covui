import { storiesOf } from "@storybook/vue";
import CoInputNumber from "../src/components/input-number";
import notes from "../src/components/input-number/README.md";

storiesOf("InputNumber", module)
  .add(
    "basic input number",
    () => ({
      components: { CoInputNumber },
      data() {
        return {
          number: 0
        };
      },
      template: `
    <co-input-number v-model="number" :min="-10" :max="10" :step="5" placeholder="please input"></co-input-number> 
  `
    }),
    { notes }
  )
  .add(
    "different disabled",
    () => ({
      components: { CoInputNumber },
      template: `
    <div>
      <co-input-number size="small" disabled></co-input-number> 
      <co-input-number></co-input-number> 
      <co-input-number size="large"></co-input-number> 
    </div>
  `
    }),
    { notes }
  );
