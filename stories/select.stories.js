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
          select3: null,
          select4: null
        };
      },
      template: `
      <div>
        <co-select v-model="select1" style="width: 150px;">
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B" disabled></co-option>
          <co-option value="3" label="Option C"></co-option>
        </co-select> 
        <co-select v-model="select2" multiple placeholder="多选下拉框" style="width: 150px;">
          <co-option value="1" label="南县立达中学"></co-option>
          <co-option value="2" label="大通湖区第一中学" disabled></co-option>
          <co-option value="3" label="安化县实验高中"></co-option>
          <co-option value="4" label="安化县实验高级中学"></co-option>
          <co-option value="5" label="安化县第一中学"></co-option>
        </co-select>
        <co-select v-model="select3" style="width: 150px;" clearable placeholder="可清空选项下拉框">
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B" disabled></co-option>
          <co-option value="3" label="Option C"></co-option>
        </co-select> 
        <co-select v-model="select4" style="width: 150px;" disabled>
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B" disabled></co-option>
          <co-option value="3" label="Option C"></co-option>
        </co-select> 
        <p>{{select1}}</p>
        <p>{{select2}}</p>
        <p>{{select3}}</p>
        <p>{{select4}}</p>
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
  )
  .add(
    "custom select",
    () => ({
      components: { CoSelect, CoOption },
      data() {
        return {
          select1: null,
          select2: null,
          select3: null,
          filterFn: function (){
            console.log(1);
          }
        };
      },
      template: `
      <div>
        <co-select v-model="select1" style="width: 150px;">
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B"></co-option>
          <co-option value="3" label="Option C"></co-option>
        </co-select> 
        <co-select v-model="select2" multiple clearable checked-all filterable :filter-fn="filterFn" :append-body="false" style="width: 150px;">
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B"></co-option>
          <co-option value="3" label="Option C"></co-option>
          <co-option value="4" label="Option D"></co-option>
          <co-option value="5" label="Option E"></co-option>
          <co-option value="6" label="Option F"></co-option>
          <co-option value="7" label="Option G"></co-option>
          <co-option value="8" label="Option H"></co-option>
        </co-select>
        <co-select
          style="width: 150px;"
          v-model="select3"
          multiple
          :custom="{
            input: {background: 'rgb(1,6,36)', color: '#fff', border: '#2a65a9', icon: '#2a65a9', shadow: 'rgba(0, 0, 0, 0)'},
            dropdown: {background: '#00011b', color: '#dfe5f1', border: '#2a65a9', selected: '#7196fd', hover: '#000461'}
          }">
          <co-option value="1" label="Option A"></co-option>
          <co-option value="2" label="Option B"></co-option>
          <co-option value="3" label="Option C"></co-option>
        </co-select>
      </div>
      `
    }),
    { notes }
  );
