import { storiesOf } from "@storybook/vue";
import CoTooltip from "../src/components/tooltip";
import { CoButton } from "../src/components/button";
import notes from "../src/components/tooltip/README.md";

storiesOf("Tooltip", module)
  .add(
    "basic usage",
    () => ({
      components: { CoTooltip, CoButton },
      template: `
  <div>
    <co-tooltip content="info of basic tooltip">
      <co-button>Basic Tooltip</co-button>
    </co-tooltip>
    <co-tooltip>
      <co-button>Custom Content Tooltip</co-button>
      <div slot="content">
        info of <i>custom content tooltip</i>
      </div>
    </co-tooltip>
    <co-tooltip content="info of disabled tooltip" disabled>
      <co-button>Disabled Tooltip</co-button>
    </co-tooltip>
    <co-tooltip content="info of always tooltip" always>
      <co-button>Always Tooltip</co-button>
    </co-tooltip>
  </div>
  `
    }),
    { notes }
  )
  .add(
    "trigger of tooltip",
    () => ({
      components: { CoTooltip, CoButton },
      template: `
  <div>
    <co-tooltip content="info of hover tooltip">
      <co-button>Hover Tooltip</co-button>
    </co-tooltip>
    <co-tooltip content="info of click tooltip" trigger="click">
      <co-button>Click Tooltip</co-button>
    </co-tooltip>
    <co-tooltip content="info of focus tooltip" trigger="focus">
      <co-button>Focus Tooltip</co-button>
    </co-tooltip>
  </div>
  `
    }),
    { notes }
  )
  .add(
    "placement of tooltip",
    () => ({
      components: { CoTooltip, CoButton },
      data() {
        return {
          placements: [
            "top",
            "top-start",
            "top-end",
            "right",
            "right-start",
            "right-end",
            "bottom",
            "bottom-start",
            "bottom-end",
            "left",
            "left-start",
            "left-end"
          ]
        };
      },
      methods: {
        getContent(placement) {
          return `info of ${placement} tooltip`;
        }
      },
      template: `
        <div style="padding: 90px 120px;">
          <co-tooltip
            v-for="placement in placements"
            key="placement"
            :content="getContent(placement)"
            :placement="placement">
            <co-button style="margin: 5px;">
              {{ placement.replace('-', ' ') }} Tooltip
            </co-button>
          </co-tooltip>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "animation of tooltip",
    () => ({
      components: { CoTooltip, CoButton },
      template: `
        <div>
          <co-tooltip content="info of delay tooltip" :delay="1000">
            <co-button>Delay Tooltip</co-button>
          </co-tooltip>
          <co-tooltip content="info of no animation tooltip" :animation="false">
            <co-button>No Animation Tooltip</co-button>
          </co-tooltip>
          <co-tooltip content="info of transition tooltip" transition="co-slide">
            <co-button>Slide Transition Tooltip</co-button>
          </co-tooltip>
        </div>
      `
    }),
    { notes }
  );
