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
        <co-checkbox label="disabled checkbox" disabled/>
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
          checkeds: [],
          checkeds2: []
        };
      },
      methods: actions,
      template: `
        <div>
          <co-checkbox-group v-model="checkeds" @change="change">
            <co-checkbox label="option 1"/>
            <co-checkbox label="option 2"/>
            <co-checkbox label="option 3" checked/>
          </co-checkbox-group>
  
          <p style="font-size: 13px; color: #555555;">
            current value: {{ checkeds }}
          </p>

          <co-checkbox-group
            v-model="checkeds2" @change="change"
            :custom="{ 'background': '#fff', 'border': '#dcdcdc', 'color': '#333', 'selected': '#0e90d2' }">
            <co-checkbox label="option 1"/>
            <co-checkbox label="option 2"/>
            <co-checkbox label="option 3" checked/>
          </co-checkbox-group>

          <p style="font-size: 13px; color: #555555;">
            current value: {{ checkeds2 }}
          </p>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "custom button type",
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
        <co-checkbox-group
          v-model="checkeds"
          type="button"
          :custom="{ 'background': '#fff', 'border': '#dcdcdc', 'color': '#333', 'selected': '#0e90d2' }"
          @change="change">
          <co-checkbox label="option 1"/>
          <co-checkbox label="option 2"/>
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
