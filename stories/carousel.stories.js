import { storiesOf } from "@storybook/vue";
import { CoCarousel, CoCarouselItem } from "../src/components/carousel";
import notes from "../src/components/carousel/README.md";

storiesOf("Carousel", module)
  .add(
    "basic",
    () => ({
      components: { CoCarousel, CoCarouselItem },
      template: `
      <co-carousel>
        <co-carousel-item style="height: 300px; background: #93ea3c;"></co-carousel-item>
        <co-carousel-item style="height: 300px; background: #ea9131;"></co-carousel-item>
      </co-carousel>
    `
    }),
    { notes }
  )
  .add(
    "autoplay",
    () => ({
      components: { CoCarousel, CoCarouselItem },
      template: `
      <co-carousel autoplay>
        <co-carousel-item style="height: 300px; background: #93ea3c;"></co-carousel-item>
        <co-carousel-item style="height: 300px; background: #ea9131;"></co-carousel-item>
      </co-carousel>
    `
    }),
    { notes }
  )
  .add(
    "arrows display always",
    () => ({
      components: { CoCarousel, CoCarouselItem },
      template: `
      <co-carousel arrow="always">
        <co-carousel-item style="height: 300px; background: #93ea3c;"></co-carousel-item>
        <co-carousel-item style="height: 300px; background: #ea9131;"></co-carousel-item>
      </co-carousel>
    `
    }),
    { notes }
  )
  .add(
    "dots display outside",
    () => ({
      components: { CoCarousel, CoCarouselItem },
      template: `
      <co-carousel dots="outside">
        <co-carousel-item style="height: 300px; background: #93ea3c;"></co-carousel-item>
        <co-carousel-item style="height: 300px; background: #ea9131;"></co-carousel-item>
      </co-carousel>
    `
    }),
    { notes }
  )
  .add(
    "hover trigger",
    () => ({
      components: { CoCarousel, CoCarouselItem },
      template: `
      <co-carousel trigger="hover">
        <co-carousel-item style="height: 300px; background: #93ea3c;"></co-carousel-item>
        <co-carousel-item style="height: 300px; background: #ea9131;"></co-carousel-item>
      </co-carousel>
    `
    }),
    { notes }
  );
