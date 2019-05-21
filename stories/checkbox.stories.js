import { storiesOf } from "@storybook/vue";
import { CoCheckbox, CoCheckboxGroup } from "../src/components/checkbox";
import notes from "../src/components/checkbox/README.md";
import actions from "./actions";

storiesOf("Checkbox", module)
  .add(
    "basic checkbox",
    () => ({
      components: { CoCheckbox },
      template: `
      <div>
        <co-checkbox label="option"/>
        <co-checkbox label="disabled checkbox" disabled />
      </div>  
    `
    }),
    { notes }
  )
  .add(
    "trueLabel falseLabel",
    () => ({
      components: { CoCheckbox },
      data() {
        return {
          checked: "true label"
        };
      },
      template: `
        <div>
          <co-checkbox
            v-model="checked"
            label="option"
            trueLabel="true label"
            falseLabel="false label"
          />
          <p style="font-size: 13px; color: #555555;">
            current value: {{ checked }}
          </p>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "checkbox group",
    () => ({
      components: { CoCheckbox, CoCheckboxGroup },
      data() {
        return {
          checkeds: []
        };
      },
      methods: actions,
      template: `
        <div>
          <co-checkbox-group v-model="checkeds" @change="change">
            <co-checkbox label="option 1" />
            <co-checkbox label="option 2" />
            <co-checkbox label="option 3" checked/>
          </co-checkbox-group>
          
          <p style="font-size: 13px; color: #555555;">
            current value: {{ checkeds }}
          </p>
        </div>
      `
    }),
    { notes }
  );
