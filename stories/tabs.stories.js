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
        <div>
          <co-tabs activeName="1">
            <co-tab-pane name="1" label="Tab A">
              <div style="height: 150px; background: #0e90d2"></div>
            </co-tab-pane>
            <co-tab-pane name="2" label="Tab B" disabled>
              <div style="height: 150px; background: #ea9131"></div>
            </co-tab-pane>
            <co-tab-pane name="3" label="Tab C">
              <div style="height: 150px; background: #404756"></div>
            </co-tab-pane>
          </co-tabs>

          <co-tabs activeName="1" type="line" style="margin-top: 10px;">
            <co-tab-pane name="1" label="Tab A">
              <div style="height: 150px; background: #0e90d2"></div>
            </co-tab-pane>
            <co-tab-pane name="2" label="Tab B">
              <div style="height: 150px; background: #ea9131"></div>
            </co-tab-pane>
            <co-tab-pane name="3" label="Tab C">
              <div style="height: 150px; background: #404756"></div>
            </co-tab-pane>
          </co-tabs>
        </div>
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
      <div>
        <co-tabs activeName="1" editable @edit="tabEdit">
          <co-tab-pane name="1" label="Tab A">
            <div style="height: 150px; background: #0e90d2"></div>
          </co-tab-pane>
          <co-tab-pane name="2" label="Tab B" disabled>
            <div style="height: 150px; background: #ea9131"></div>
          </co-tab-pane>
          <co-tab-pane name="3" label="Tab C">
            <div style="height: 150px; background: #404756"></div>
          </co-tab-pane>
        </co-tabs>

        <co-tabs activeName="1" type="line" editable @edit="tabEdit" style="margin-top: 10px;">
          <co-tab-pane name="1" label="Tab A">
            <div style="height: 150px; background: #0e90d2"></div>
          </co-tab-pane>
          <co-tab-pane name="2" label="Tab B">
            <div style="height: 150px; background: #ea9131"></div>
          </co-tab-pane>
          <co-tab-pane name="3" label="Tab C">
            <div style="height: 150px; background: #404756"></div>
          </co-tab-pane>
        </co-tabs>
      </div>
      `
    }),
    { notes }
  )
  .add(
    "autoplay tabs",
    () => ({
      components: { CoTabs, CoTabPane },
      methods: actions,
      template: `
        <div>
          <co-tabs activeName="1" :interval="1500" style="margin-bottom: 10px;">
            <co-tab-pane name="1" label="Tab A">
              <div style="height: 150px; background: #0e90d2"></div>
            </co-tab-pane>
            <co-tab-pane name="2" label="Tab B">
              <div style="height: 150px; background: #ea9131"></div>
            </co-tab-pane>
            <co-tab-pane name="3" label="Tab C">
              <div style="height: 150px; background: #404756"></div>
            </co-tab-pane>
          </co-tabs>

          <co-tabs activeName="1" type="line" :interval="1500">
            <co-tab-pane name="1" label="Tab A">
              <div style="height: 150px; background: #0e90d2"></div>
            </co-tab-pane>
            <co-tab-pane name="2" label="Tab B">
              <div style="height: 150px; background: #ea9131"></div>
            </co-tab-pane>
            <co-tab-pane name="3" label="Tab C">
              <div style="height: 150px; background: #404756"></div>
            </co-tab-pane>
          </co-tabs>
        </div>
        
      `
    }),
    { notes }
  )
  .add(
    "custom tabs",
    () => ({
      components: { CoTabs, CoTabPane },
      methods: actions,
      template: `
        <div>
          <co-tabs
            style="margin-bottom: 10px;"
            activeName="1"
            align="right"
            :custom="{
              background: '#16d247',
              border: '#eee',
              font: '#fff',
              activeBackground: '#05a02e'
            }"
          >
            <co-tab-pane name="1" label="Tab A">
              <div style="height: 150px; background: #0e90d2"></div>
            </co-tab-pane>
            <co-tab-pane name="2" label="Tab B">
              <div style="height: 150px; background: #ea9131"></div>
            </co-tab-pane>
            <co-tab-pane name="3" label="Tab C">
              <div style="height: 150px; background: #404756"></div>
            </co-tab-pane>
          </co-tabs>

          <co-tabs
            activeName="1"
            type="line"
            align="center"
            :custom="{
              lineBorder: '#dcdcdc',
              font: '#333',
              activeColor: '#05a02e',
              border: 'transparent',
            }"
          >
            <co-tab-pane name="1" label="Tab A">
              <div style="height: 150px; background: #0e90d2"></div>
            </co-tab-pane>
            <co-tab-pane name="2" label="Tab B">
              <div style="height: 150px; background: #ea9131"></div>
            </co-tab-pane>
            <co-tab-pane name="3" label="Tab C">
              <div style="height: 150px; background: #404756"></div>
            </co-tab-pane>
          </co-tabs>
        </div>

        
      `
    }),
    { notes }
  );
