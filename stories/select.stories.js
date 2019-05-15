import { storiesOf } from "@storybook/vue";
import { CoSelect, CoOption } from "../src/components/select";
import notes from "../src/components/select/README.md";

storiesOf("Select", module)
  .add(
    "baisc select",
    () => ({
      components: { CoSelect, CoOption },
      data() {
        return {
          select1: null,
          select2: null,
          select3: null
        };
      },
      template: `
      <div>
        <co-select v-model="select1" style="width: 150px;">
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B" disabled></co-option>
          <co-option value="3" label="Option C"></co-option>
        </co-select> 
        <co-select v-model="select2" style="width: 150px;" clearable placeholder="可清空选项下拉框">
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B" disabled></co-option>
          <co-option value="3" label="Option C"></co-option>
        </co-select> 
        <co-select v-model="select3" style="width: 150px;" disabled>
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B" disabled></co-option>
          <co-option value="3" label="Option C"></co-option>
        </co-select> 
        <p>{{select1}}</p>
        <p>{{select2}}</p>
        <p>{{select3}}</p>
      </div>
      `
    }),
    { notes }
  )
  .add(
    "different size",
    () => ({
      components: { CoSelect, CoOption },
      data() {
        return {
          select1: null,
          select2: null,
          select3: null
        };
      },
      template: `
      <div>
        <co-select v-model="select1" style="width: 150px;" clearable size="small">
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B"></co-option>
          <co-option value="3" label="Option C"></co-option>
        </co-select> 
        <co-select v-model="select2" style="width: 150px;" clearable>
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B"></co-option>
          <co-option value="3" label="Option C"></co-option>
        </co-select> 
        <co-select v-model="select3" style="width: 150px;" clearable size="large">
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B"></co-option>
          <co-option value="3" label="Option C"></co-option>
        </co-select> 
      </div>
      `
    }),
    { notes }
  );
