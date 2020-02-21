import { storiesOf } from "@storybook/vue";
import { CoTabs, CoTabPane } from "../src/components/tabs";
import notes from "../src/components/tabs/README.md";
import actions from "./actions";

storiesOf("Tabs", module)
  .add(
    "basic usage",
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
  )
  .add(
    "editable tabs",
    () => ({
      components: { CoTabs, CoTabPane },
      methods: actions,
      template: `
      <co-tabs activeName="3" editable @edit="tabEdit">
        <co-tab-pane name="1" label="Tab A">
          <div slot="label"><span style="color: red">A</span> Level Tab</div>
          <div style="height: 150px; background: #0e90d2" ></div>
        </co-tab-pane>
        <co-tab-pane name="2" label="Tab B">
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
