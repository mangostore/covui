import { storiesOf } from "@storybook/vue";
import { CoDatePicker } from "../src/components/date-picker";
import notes from "../src/components/date-picker/README.md";

storiesOf("DatePicker", module)
  .add(
    "different size",
    () => ({
      components: { CoDatePicker },
      data() {
        return {
          select1: null,
          select2: null,
          select3: null,
        };
      },
      template: `
        <div>
          <co-date-picker v-model="select1" size="small" style="width: 180px;"/>
          <co-date-picker v-model="select2" style="width: 180px;"/>
          <co-date-picker v-model="select3" size="large" style="width: 180px;"/>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "custom date picker",
    () => ({
      components: { CoDatePicker },
      data() {
        return {
          select: null,
          select1: null,
        };
      },
      template: `
        <div>
          <co-date-picker
            style="width: 180px; margin-bottom: 10px;"
            v-model="select"
            :custom="{
              input: {
                background: '#000',
                color: '#fff',
                border: '#333',
                icon: '#ccc',
                shadow: 'rgba(0, 0, 0, .2)'
              },
              picker: {
                shadow: 'rgba(255, 255, 255, .2)',
                border: '#3e3e3e',
                background: '#000',
                leftBg: '#323232',
                leftSelect: '#999',
                font: '#fff',
                week: '#ccc',
                selectLight: '#999',
                select: '#ddd',
                btnFont: '#333'
              }
            }"
          />

          <div style="width: 200px; background: #020b5a; padding: 10px">
            <co-date-picker
              style="width: 180px;"
              v-model="select1"
              :custom="{
                input: {
                  background: 'transparent',
                  color: '#fff',
                  border: '#2a65a9',
                  icon: '#2a65a9',
                  shadow: ''
                },
                picker: {
                  shadow: 'rgba(255, 255, 255, .2)',
                  border: '#2a65a9',
                  background: '#011a48',
                  leftBg: '#2a65a9',
                  leftSelect: '#03b5e1',
                  font: '#fff',
                  week: '#ccc',
                  selectLight: '#03b5e1',
                  select: '#61e0ff',
                  btnFont: '#333'
                }
              }"
            />
          </div>
        </div>
      `
    }),
    { notes }
  );
