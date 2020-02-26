import { storiesOf } from "@storybook/vue";
import CoColorPicker from "../src/components/color-picker";
import notes from "../src/components/color-picker/README.md";

storiesOf("ColorPicker", module)
  .add(
    "color picker size",
    () => ({
      components: { CoColorPicker },
      data() {
        return {
          select1: null,
          select2: null,
          select3: null,
        };
      },
      template: `
      <div>
        <co-color-picker v-model="select1" size="small"></co-color-picker>
        <co-color-picker v-model="select2"></co-color-picker>
        <co-color-picker v-model="select3" size="large"></co-color-picker>
      </div>
      `
    }),
    { notes }
  )
  .add(
    "disabled color picker",
    () => ({
      components: { CoColorPicker },
      data() {
        return {
          select1: null,
        };
      },
      template: `
      <div>
        <co-color-picker v-model="select1" disabled></co-color-picker>
      </div>
      `
    }),
    { notes }
  )
  .add(
    "custom colors",
    () => ({
      components: { CoColorPicker },
      data() {
        return {
          select1: null,
          colors: [
            "#f0a419",
            "#0acaad",
            "#ed5c30",
            "#ebd30d",
            "#d11a27",
            "#eb897e",
            "#be5580",
            "#b2dd3d",
            "#e7485f",
            "#21c380",
          ],
        };
      },
      template: `
      <div>
        <co-color-picker v-model="select1" :colors="colors"></co-color-picker>
      </div>
      `
    }),
    { notes }
  );
