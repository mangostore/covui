import { storiesOf } from "@storybook/vue";
import { CoCarousel, CoCarouselItem } from "../src/components/carousel";
import { CoRow, CoCol } from "../src/components/grid";
import notes from "../src/components/carousel/README.md";

storiesOf("Carousel", module)
  .add(
    "basic carousel",
    () => ({
      components: { CoCarousel, CoCarouselItem, CoRow, CoCol },
      template: `
      <co-row :gutter="20" style="margin: 0">
        <co-col :span="12">
          Switch when indicator is clicked (default)
          <co-carousel>
            <co-carousel-item style="height: 200px; background: #93ea3c;"></co-carousel-item>
            <co-carousel-item style="height: 200px; background: #ea9131;"></co-carousel-item>
          </co-carousel>
        </co-col>
        <co-col :span="12">
          Switch when indicator is hovered
          <co-carousel trigger="hover">
            <co-carousel-item style="height: 200px; background: #93ea3c;"></co-carousel-item>
            <co-carousel-item style="height: 200px; background: #ea9131;"></co-carousel-item>
          </co-carousel>
        </co-col>
      </co-row>
    `
    }),
    { notes }
  )
  .add(
    "autoplay carousel",
    () => ({
      components: { CoCarousel, CoCarouselItem, CoRow, CoCol },
      template: `
<co-row :gutter="20" style="margin: 0">
        <co-col :span="12">
      <co-carousel autoplay>
        <co-carousel-item style="height: 300px; background: #93ea3c;"></co-carousel-item>
        <co-carousel-item style="height: 300px; background: #ea9131;"></co-carousel-item>
      </co-carousel>
      </co-col>
       <co-col :span="12">
       <co-carousel autoplay>
        <co-carousel-item style="height: 300px; background: #93ea3c;"></co-carousel-item>
      </co-carousel>
      </co-col>
      </co-row>
    `
    }),
    { notes }
  )
  .add(
    "arrows and indicators",
    () => ({
      components: { CoCarousel, CoCarouselItem, CoRow, CoCol },
      template: `
        <co-row :gutter="20" style="margin: 0">
          <co-col :span="12">
            <co-carousel arrow="always">
              <co-carousel-item style="height: 200px; background: #93ea3c;"></co-carousel-item>
              <co-carousel-item style="height: 200px; background: #ea9131;"></co-carousel-item>
            </co-carousel>
          </co-col>
          <co-col :span="12">
            <co-carousel dots="outside">
              <co-carousel-item style="height: 200px; background: #93ea3c;"></co-carousel-item>
              <co-carousel-item style="height: 200px; background: #ea9131;"></co-carousel-item>
            </co-carousel>
          </co-col>
        </co-row>
      `
    }),
    { notes }
  );
