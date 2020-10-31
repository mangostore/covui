import { storiesOf } from "@storybook/vue";
import CoSwitch from "../src/components/switch";
import notes from "../src/components/switch/README.md";

storiesOf("Switch", module)
  .add(
    "basic switch",
    () => ({
      components: { CoSwitch },
      data() {
        return {
          value1: false,
          value2: true,
        };
      },
      template: `
      <div>
        <co-switch v-model="value1" style="margin-right: 10px;"></co-switch>

        <co-switch v-model="value2" disabled></co-switch>
      </div>
      `
    }),
    { notes }
  );
