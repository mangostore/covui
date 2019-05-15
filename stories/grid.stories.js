import { storiesOf } from "@storybook/vue";
import { CoRow, CoCol } from "../src/components/grid";
import notes from "../src/components/grid/README.md";

storiesOf("Grid", module)
  .add(
    "basic layout",
    () => ({
      components: { CoRow, CoCol },
      template: `
      <div class="grid-wrapper">
        <co-row>
          <co-col :span="24"><div class="grid-content-dark"></div></co-col>
        </co-row>
        <co-row>
          <co-col :span="12"><div class="grid-content"></div></co-col>
          <co-col :span="12"><div class="grid-content-light"></div></co-col>
        </co-row>
        <co-row>
          <co-col :span="8"><div class="grid-content"></div></co-col>
          <co-col :span="8"><div class="grid-content-light"></div></co-col>
          <co-col :span="8"><div class="grid-content"></div></co-col>
        </co-row>
        <co-row :gutter="10">
          <co-col :span="8"><div class="grid-content"></div></co-col>
          <co-col :span="8"><div class="grid-content-light"></div></co-col>
          <co-col :span="8"><div class="grid-content"></div></co-col>
        </co-row>
        <co-row :gutter="10">
          <co-col :span="6"><div class="grid-content"></div></co-col>
          <co-col :span="6" offset="2"><div class="grid-content-light">offset</div></co-col>
          <co-col :span="6"><div class="grid-content"></div></co-col>
          <co-col :span="4"><div class="grid-content"></div></co-col>
        </co-row>
        <co-row :gutter="10">
          <co-col :span="6"><div class="grid-content"></div></co-col>
          <co-col :span="6" push="2"><div class="grid-content-light">push</div></co-col>
          <co-col :span="6"><div class="grid-content"></div></co-col>
          <co-col :span="4"><div class="grid-content"></div></co-col>
        </co-row>
        <co-row :gutter="10">
          <co-col :span="6"><div class="grid-content"></div></co-col>
          <co-col :span="6" pull="2"><div class="grid-content-light">pull</div></co-col>
          <co-col :span="6"><div class="grid-content"></div></co-col>
          <co-col :span="4"><div class="grid-content"></div></co-col>
        </co-row>
      </div> 
    `
    }),
    { notes }
  )
  .add(
    "flex layout",
    () => ({
      components: { CoRow, CoCol },
      template: `
      <div class="grid-wrapper">
        <co-row type="flex">
          <co-col :span="24"><div class="grid-content-dark"></div></co-col>
        </co-row>
        <co-row type="flex" justify="start">
          <co-col :span="6"><div class="grid-content">start</div></co-col>
          <co-col :span="6"><div class="grid-content-light"></div></co-col>
          <co-col :span="6"><div class="grid-content"></div></co-col>
        </co-row>
        <co-row type="flex" justify="end">
          <co-col :span="6"><div class="grid-content">end</div></co-col>
          <co-col :span="6"><div class="grid-content-light"></div></co-col>
          <co-col :span="6"><div class="grid-content"></div></co-col>
        </co-row>
        <co-row type="flex" justify="center">
          <co-col :span="6"><div class="grid-content">center</div></co-col>
          <co-col :span="6"><div class="grid-content-light"></div></co-col>
          <co-col :span="6"><div class="grid-content"></div></co-col>
        </co-row>
        <co-row type="flex" justify="space-round">
          <co-col :span="6"><div class="grid-content">space-round</div></co-col>
          <co-col :span="6"><div class="grid-content-light"></div></co-col>
          <co-col :span="6"><div class="grid-content"></div></co-col>
        </co-row>
        <co-row type="flex" justify="space-between">
          <co-col :span="6"><div class="grid-content">space-between</div></co-col>
          <co-col :span="6"><div class="grid-content-light"></div></co-col>
          <co-col :span="6"><div class="grid-content"></div></co-col>
        </co-row>
        <co-row type="flex" justify="space-between">
          <co-col :span="6" :order="2"><div class="grid-content">order 2</div></co-col>
          <co-col :span="6"><div class="grid-content-light"></div></co-col>
          <co-col :span="6" :order="1"><div class="grid-content">order 1</div></co-col>
        </co-row>
        <co-row>
          <co-col :span="8">
            <co-row type="flex" align="top" style="height: 90px; background: #f6f5fe">
              <co-col span="6"><div class="grid-content">top</div></co-col>
            </co-row>
          </co-col>
          <co-col :span="8">
            <co-row type="flex" align="middle" style="height: 90px; background: #f6f5fe">
              <co-col span="6"><div class="grid-content">middle</div></co-col>
            </co-row>
          </co-col>
          <co-col :span="8">
            <co-row type="flex" align="bottom" style="height: 90px; background: #f6f5fe">
              <co-col span="6"><div class="grid-content">bottom</div></co-col>
            </co-row>
          </co-col>
        </co-row>
      </div> 
    `
    }),
    { notes }
  )
  .add(
    "responsive layout",
    () => ({
      components: { CoRow, CoCol },
      template: `
      <div class="grid-wrapper">
        <co-row>
          <co-col :span="24"><div class="grid-content-dark"></div></co-col>
        </co-row>
        <co-row :gutter="10">
          <co-col :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom: 5px;">
            <div class="grid-content"></div>
          </co-col>
          <co-col :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom: 5px;">
            <div class="grid-content-light"></div>
          </co-col>
          <co-col :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom: 5px;">
            <div class="grid-content"></div>
          </co-col>
          <co-col :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom: 5px;">
            <div class="grid-content-light"></div>
          </co-col>
        </co-row>
        <co-row :gutter="10">
          <co-col
            :xs="{span: 20, offset: 4}"
            :sm="{span: 12, offset: 0}"
            :md="{span: 8, offset: 0}"
            :lg="{span: 6, offset: 0}"
            style="margin-bottom: 5px;">
            <div class="grid-content"></div>
          </co-col>
          <co-col
            :xs="{span: 20, offset: 4}"
            :sm="{span: 12, offset: 0}"
            :md="{span: 8, offset: 0}"
            :lg="{span: 6, offset: 0}"
            style="margin-bottom: 5px;">
            <div class="grid-content-light"></div>
          </co-col>
          <co-col
            :xs="{span: 20, offset: 4}"
            :sm="{span: 12, offset: 0}"
            :md="{span: 8, offset: 0}"
            :lg="{span: 6, offset: 0}"
            style="margin-bottom: 5px;">
            <div class="grid-content"></div>
          </co-col>
          <co-col
            :xs="{span: 20, offset: 4}"
            :sm="{span: 12, offset: 0}"
            :md="{span: 8, offset: 0}"
            :lg="{span: 6, offset: 0}"
            style="margin-bottom: 5px;">
            <div class="grid-content-light"></div>
          </co-col>
        </co-row>
      </div> 
    `
    }),
    { notes }
  );
