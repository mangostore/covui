import { storiesOf } from "@storybook/vue";
import { CoCheckbox, CoCheckboxGroup } from "../src/components/checkbox";
import notes from "../src/components/checkbox/README.md";
import actions from "./actions";

storiesOf("Checkbox", module)
  .add(
    "basic",
    () => ({
      components: { CoCheckbox },
      template: `
      <co-checkbox label="option"/>
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
    "disabled checkbox",
    () => ({
      components: { CoCheckbox },
      template: `
      <co-checkbox label="option" disabled />
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
