import { storiesOf } from "@storybook/vue";
import { CoButton, CoButtonGroup } from "../src/components/button";
import CoIcon from "../src/components/icon";
import notes from "../src/components/button/README.md";

storiesOf("Button", module)
  .add(
    "basic button",
    () => ({
      components: { CoButton },
      data() {
        return {
          types: ["default", "ghost", "primary", "success", "error", "link", "disabled", "block"]
        };
      },
      template: `
        <div>
          <span
            v-for="type in types"
            :key="type" 
            :style="{ display: 'inline-block', padding: '0 5px', width: type === 'block' ? '200px' : 'auto'}">
            <template v-if="type === 'disabled'">
              <co-button type="default" disabled>disabled</co-button>
              <co-button type="link" disabled>disabled</co-button>
            </template>
            <co-button type="primary" block v-else-if="type === 'block'">block</co-button>
            <co-button :type="type" v-else>{{ type }}</co-button>
          </span>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "size and icon",
    () => ({
      components: { CoButton, CoIcon },
      template: `
        <div>
          <co-button type="primary" icon="edit" size="small"></co-button>
          <co-button type="primary" icon="search">Search</co-button>
          <co-button type="primary" size="large">Upload <co-icon type="upload-cloud"></co-icon></co-button>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "loading button",
    () => ({
      components: { CoButton },
      template: `
        <div>
          <co-button loading size="small">loading</co-button>
          <co-button loading>loading</co-button>
          <co-button loading size="large">loading</co-button>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "button group",
    () => ({
      components: { CoButton, CoButtonGroup, CoIcon },
      template: `
        <div>
          <co-button-group>
            <co-button type="primary"><co-icon type="chevron-left"></co-icon> pre</co-button>
            <co-button type="primary">next <co-icon type="chevron-right"></co-icon></co-button>
          </co-button-group>
          <co-button-group>
            <co-button icon="trash-2"></co-button>
            <co-button icon="edit"></co-button>
            <co-button icon="navigation"></co-button>
          </co-button-group>
          <br><br>
          <co-button-group vertical>
            <co-button icon="share"></co-button>
            <co-button icon="thumbs-up"></co-button>
            <co-button icon="thumbs-down"></co-button>
          </co-button-group>
        </div>
      `
    }),
    { notes }
  );
