import { storiesOf } from "@storybook/vue";
import { CoButton, CoButtonGroup } from "../src/components/button";
import CoIcon from "../src/components/icon";
import notes from "../src/components/button/README.md";

storiesOf("Button", module)
  .add(
    "basic",
    () => ({
      components: { CoButton },
      data() {
        return {
          types: ["default", "ghost", "primary", "success", "error", "link"]
        };
      },
      template: `
        <div>
          <span v-for="type in types" :key="type" style="padding: 0 5px;">
            <co-button :type="type">{{ type }}</co-button>
          </span>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "icon",
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
    "size",
    () => ({
      components: { CoButton },
      data() {
        return {
          sizes: ["small", "default", "large"]
        };
      },
      template: `
        <div>
          <span v-for="size in sizes" :key="size" style="padding: 0 5px;">
            <co-button :size="size">{{ size }}</co-button>
          </span>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "block",
    () => ({
      components: { CoButton },
      template: `
        <co-button block>block</co-button>
      `
    }),
    { notes }
  )
  .add(
    "disabled",
    () => ({
      components: { CoButton },
      template: `
        <co-button disabled>disabled</co-button>
      `
    }),
    { notes }
  )
  .add(
    "loading",
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
