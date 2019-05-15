import { storiesOf } from "@storybook/vue";
import { CoRadio, CoRadioGroup } from "../src/components/radio";
import notes from "../src/components/radio/README.md";

storiesOf("Radio", module)
  .add(
    "basic usage",
    () => ({
      components: { CoRadio, CoRadioGroup },
      data() {
        return {
          radio: "1",
          radioGroup: "1"
        };
      },
      template: `
        <div>
          <h4>radio</h4>
          <co-radio v-model="radio" label="1">Option A</co-radio> 
          <co-radio v-model="radio" label="2" disabled>Option B</co-radio>
          <co-radio v-model="radio" label="3">Option C</co-radio>
      
          <h4 style="margin-top: 10px;">radio group</h4>
          <co-radio-group v-model="radioGroup">
            <co-radio label="1">Option A</co-radio> 
            <co-radio label="2" disabled>Option B</co-radio>
            <co-radio label="3">Option C</co-radio>
          </co-radio-group>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "button type",
    () => ({
      components: { CoRadio, CoRadioGroup },
      data() {
        return {
          radioGroup: "1"
        };
      },
      template: `
        <co-radio-group v-model="radioGroup" type="button">
          <co-radio label="1">Option A</co-radio> 
          <co-radio label="2" disabled>Option B</co-radio>
          <co-radio label="3">Option C</co-radio>
        </co-radio-group>
      `
    }),
    { notes }
  );
