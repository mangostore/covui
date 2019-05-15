import { storiesOf } from "@storybook/vue";
import { CoTabs, CoTabPane } from "../src/components/tabs";
import notes from "../src/components/tabs/README.md";

storiesOf("Tabs", module).add(
  "tabs usage",
  () => ({
    components: { CoTabs, CoTabPane },
    template: `
    <co-tabs activeName="3">
      <co-tab-pane name="1" label="Tab A">
        <div style="height: 150px; background: #0e90d2" ></div>
      </co-tab-pane>
      <co-tab-pane name="2" label="Tab B" disabled>
        <div style="height: 150px; background: #ea9131" ></div>
      </co-tab-pane>
      <co-tab-pane name="3" label="Tab C">
        <div style="height: 150px; background: #404756" ></div>
      </co-tab-pane>
    </co-tabs> 
    `
  }),
  { notes }
);
