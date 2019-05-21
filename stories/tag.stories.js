import { storiesOf } from "@storybook/vue";
import CoTag from "../src/components/tag";
import notes from "../src/components/tag/README.md";
import actions from "./actions";

storiesOf("Tag", module)
  .add(
    "tag type",
    () => ({
      components: { CoTag },
      methods: actions,
      template: `
      <div>
        <co-tag closable @close="close" @close="close">Default Closable Tag</co-tag>
        <co-tag closable type="primary" @close="close">Primary Closable Tag</co-tag>
        <co-tag closable type="success" @close="close">Success Closable Tag</co-tag>
        <co-tag closable type="warning" @close="close">Warning Closable Tag</co-tag>
        <co-tag closable type="info" @close="close">Info Closable Tag</co-tag>
        <co-tag closable size="large" @close="close">Large Closable Tag</co-tag>
      </div> 
      `
    }),
    { notes }
  )
  .add(
    "close transition",
    () => ({
      components: { CoTag },
      data() {
        return {
          showTransition: true,
          showNoTransition: true
        };
      },
      template: `
      <div>
        <co-tag v-if="showTransition" closable @close="showTransition = false">
          Transition Closable Tag
        </co-tag>
        <co-tag v-if="showNoTransition" closable closeTransition @close="showNoTransition = false">
          No Transition Closable Tag
        </co-tag>
      </div> 
      `
    }),
    { notes }
  );
