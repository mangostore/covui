import { storiesOf } from "@storybook/vue";
import CoPopover from "../src/components/popover";
import { CoButton } from "../src/components/button";
import { CoCarousel, CoCarouselItem } from "../src/components/carousel";
import notes from "../src/components/popover/README.md";
import actions from "./actions";

storiesOf("Popover", module)
  .add(
    "basic popover",
    () => ({
      components: { CoPopover, CoButton },
      methods: actions,
      template: `
  <div>
      <co-popover
        title="Title"
        content="this is click popover content"
        trigger="click"
        width="100"
        @show="show"
        @hide="hide">
        <co-button>Click to activate</co-button>
      </co-popover>  
      <co-popover
        title="Title"
        content="this is hover popover content"
        trigger="hover"
        @show="show"
        @hide="hide">
        <co-button>Hover to activate</co-button>
      </co-popover> 
      <co-popover
        title="Title"
        content="this is focus popover content"
        trigger="focus"
        @show="show"
        @hide="hide">
        <co-button>Focus to activate</co-button>
      </co-popover> 
      <co-popover
        title="Title"
        content="this is hover popover content"
        trigger="hover"
        disabled>
        <co-button>Disabled to activate</co-button>
      </co-popover>
      <co-popover
        title="Title"
        content="this is a fade transition popover"
        trigger="click"
        transition="co-fade"
        @show="show"
        @hide="hide">
        <co-button>Fade transition</co-button>
      </co-popover> 
      <co-popover
        title="Title"
        content="this is a custom class popover"
        popper-class="custom-popper"
        trigger="click">
        <co-button>Custom Class</co-button>
      </co-popover>
  </div>
  `
    }),
    { notes }
  )
  .add(
    "custom popover",
    () => ({
      components: { CoPopover, CoButton, CoCarousel, CoCarouselItem },
      methods: actions,
      template: `
  <div>
      <co-popover
        trigger="click"
        @show="show"
        @hide="hide">
        <co-button>Click to activate custom popover</co-button>
        <h2 style="color: red;" slot="title">Carousel</h2>
        <div slot="content">
          <co-carousel  style="width: 200px;">
            <co-carousel-item>
              <div style="height: 100px; background: #0e90d2"></div>
            </co-carousel-item>
            <co-carousel-item>
              <div style="height: 100px; background: #10a110"></div>
            </co-carousel-item>
          </co-carousel>
        </div>
      </co-popover>
  </div>
  `
    }),
    { notes }
  );
