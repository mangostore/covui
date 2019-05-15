import { storiesOf } from "@storybook/vue";
import CoInput from "../src/components/input";
import notes from "../src/components/input/README.md";

storiesOf("Input", module)
  .add(
    "basic input",
    () => ({
      components: { CoInput },
      data() {
        return {
          input: "",
          textarea: ""
        };
      },
      template: `
      <div>
        <co-input placeholder="please input" v-model="input" style="margin-bottom: 10px;"></co-input>
        <co-input type="textarea" :row="3" placeholder="please input" v-model="textarea"></co-input>
      </div>
      `
    }),
    { notes }
  )
  .add(
    "native input type",
    () => ({
      components: { CoInput },
      template: `
       <div class="input-type">
         <co-input type="text" placeholder="text"></co-input>
         <co-input type="button" placeholder="button"></co-input>
         <co-input type="checkbox" placeholder="checkbox"></co-input>
         <co-input type="color" placeholder="color"></co-input>
         <co-input type="date" placeholder="date"></co-input>
         <co-input type="datetime-local" placeholder="datetime-local"></co-input>
         <co-input type="email" placeholder="email"></co-input>
         <co-input type="file" placeholder="file"></co-input>
         <co-input type="hidden" placeholder="hidden"></co-input>
         <co-input type="image" placeholder="image"></co-input>
         <co-input type="month" placeholder="month"></co-input>
         <co-input type="number" placeholder="number"></co-input>
         <co-input type="password" placeholder="password"></co-input>
         <co-input type="radio" placeholder="radio"></co-input>
         <co-input type="range" placeholder="range"></co-input>
         <co-input type="reset" placeholder="reset"></co-input>
         <co-input type="search" placeholder="search"></co-input>
         <co-input type="submit" placeholder="submit"></co-input>
         <co-input type="tel" placeholder="tel"></co-input>
         <co-input type="time" placeholder="time"></co-input>
         <co-input type="url" placeholder="url"></co-input>
         <co-input type="week" placeholder="week"></co-input>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "different size",
    () => ({
      components: { CoInput },
      template: `
      <div>
        <co-input size="small" placeholder="small size input" style="width: 150px"></co-input> 
        <co-input placeholder="small size input" style="width: 150px"></co-input>
        <co-input size="large" placeholder="large size input" style="width: 150px"></co-input>
      </div>
      `
    }),
    { notes }
  )
  .add(
    "input with icon",
    () => ({
      components: { CoInput },
      template: `
      <div>
        <co-input icon="mail" placeholder="please input email" style="width: 150px"></co-input>
        <co-input size="small" icon="phone" placeholder="please input phone" style="width: 150px"></co-input>
        <co-input size="large" icon="lock" placeholder="please input password" style="width: 150px"></co-input>
      </div>
      `
    }),
    { notes }
  )
  .add(
    "native attribute",
    () => ({
      components: { CoInput },
      template: `
      <div>
        <co-input :readonly="true" placeholder="input readonly" style="width: 150px" value="readonly"></co-input>
        <co-input :autofocus="true" placeholder="input autofocus" style="width: 150px"></co-input>
        <co-input :disabled="true" placeholder="input disabled" style="width: 150px"></co-input>
        <co-input autocomplete="on" placeholder="input autocomplete" style="width: 150px"></co-input>
      </div>
      `
    }),
    { notes }
  );
