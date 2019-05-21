import { storiesOf } from "@storybook/vue";
import Vue from "vue";
import CoMessage from "../src/components/message";
import { CoButton } from "../src/components/button";
import notes from "../src/components/message/README.md";

Vue.prototype.$message = CoMessage;

storiesOf("Message", module)
  .add(
    "basic message",
    () => ({
      components: { CoButton },
      methods: {
        open() {
          this.$message.info({
            message: "This is a message",
            duration: 2,
            onClose() {
              console.log("close");
            }
          });
        }
      },
      template: `
      <div>
        <co-button @click.native="open">Show Message</co-button>
      </div>
    `
    }),
    { notes }
  )
  .add(
    "message types",
    () => ({
      components: { CoButton },
      methods: {
        open(type) {
          this.$message[type](`This is a ${type} message`);
        }
      },
      template: `
      <div>
        <co-button @click.native="open('info')">info</co-button>
        <co-button @click.native="open('success')">success</co-button>
        <co-button @click.native="open('error')">error</co-button>
        <co-button @click.native="open('warning')">warning</co-button>
      </div>
    `
    }),
    { notes }
  );
