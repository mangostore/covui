import { storiesOf } from "@storybook/vue";
import CoModal from "../src/components/modal";
import { CoButton } from "../src/components/button";
import notes from "../src/components/modal/README.md";

storiesOf("Modal", module)
  .add(
    "basic modal",
    () => ({
      components: { CoModal, CoButton },
      data() {
        return {
          visible: false
        };
      },
      methods: {
        showModal() {
          this.visible = true;
        }
      },
      template: `
      <div>
        <co-button @click.native="showModal">Show Modal</co-button>
        <co-modal v-model="visible" title="User Agreement" width="500" center
          ok-text="agree" cancel-text="cancel" :mask-closeable="false" :scrollable="true">
          <p>
          This Stylesight Terms and Conditions document (the Agreement) is a legal contract between the subscriber
          organization or individual (Subscriber) identified in a STYLESIGHT order form (Order Form), and Stylesight, Inc.
          (STYLESIGHT), that governs your use of STYLESIGHT's online style services (and the applications available thereon)
          available at www.stylesight.com (Site). Your acceptance of the Order Form constitutes an application to subscribe
          to the Site pursuant to the terms of this Agreement, and by clicking the "agree" button, accessing or using the
          Site; you confirm your agreement to be bound hereby.
          </p>
        </co-modal>
      </div>
  `
    }),
    { notes }
  )
  .add(
    "custom modal",
    () => ({
      components: { CoModal, CoButton },
      data() {
        return {
          visible: false
        };
      },
      methods: {
        showModal() {
          this.visible = true;
        }
      },
      template: `
      <div>
        <co-button @click.native="showModal">Tips Modal</co-button>
        <co-modal v-model="visible">
          <div slot="header" style="color: red">Tips</div>
          <p>
          Today, the precipitation area is in eastern Northeast, southeastern Plateau Area and central
          and western part of the southern part to the Yangtze River. Rainfalls above 10mm for southern
          and northern Yunnan and northwestern Guizhou. Sunny for the rest part. </p>
          <p>
          Sunny to partly cloudy for us tomorrow with temps from 5 to 13 and humidity from 75 to 35%.
          It will be N at the speed of 20-38km/h.</p>
          <p>
          Sunny to partly cloudy for next week except more cloud on next Mon. No big changes in temps.
          The lows will be from 5 to 7 and the highs will be from 13 to 16.
          </p>
          <div slot="footer">
            <co-button @click.native="visible = false">cancel</co-button>
          </div>
        </co-modal>
      </div>
  `
    }),
    { notes }
  );
