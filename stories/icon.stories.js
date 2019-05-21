import { storiesOf } from "@storybook/vue";
import CoIcon from "../src/components/icon";
import CoMessage from "../src/components/message";
import notes from "../src/components/icon/README.md";

storiesOf("Icon", module).add(
  "icon list",
  () => ({
    components: {
      CoIcon
    },
    data() {
      return {
        icons: [],
        title: ""
      };
    },
    mounted() {
      const symbols = document
        .getElementById("featherSprite")
        .getElementsByTagName("symbol");
      this.icons = [...symbols].map(symbol => symbol.id);
    },
    methods: {
      copyTitle(event) {
        this.title =
          event.target.getAttribute("title") ||
          event.target.parentElement.getAttribute("title");
        this.$nextTick(() => {
          this.$refs.copyInput.select();
          document.execCommand("copy");
          CoMessage.info(this.title);
          this.title = "";
        });
      }
    },
    template: `
      <div>
        <div style="display: block; height: 0; visibility: hidden;">
          <co-icon type="feather"></co-icon>
          <input type="text" v-model="title" ref="copyInput" >
        </div>
        <co-icon v-for="icon in icons" :key="icon" :type="icon" :title="icon" style="margin: 5px;" @click.native="copyTitle"></co-icon>
      </div>
    `
  }),
  { notes }
);
