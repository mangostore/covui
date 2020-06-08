import { storiesOf } from "@storybook/vue";
import CoTree from "../src/components/tree";
import notes from "../src/components/tree/README.md";

storiesOf("Tree", module)
  .add(
    "basic usage",
    () => ({
      components: { CoTree },
      data() {
        return {
          data: [
            {
              label: "一级 1",
              children: [
                {
                  label: "二级 1-1",
                  children: [
                    {
                      label: "三级 1-1-1"
                    }
                  ]
                }
              ]
            },
            {
              label: "一级 2",
              children: [
                {
                  label: "二级 2-1",
                  children: [
                    {
                      label: "三级 2-1-1"
                    }
                  ]
                },
                {
                  label: "二级 2-2",
                  children: [
                    {
                      label: "三级 2-2-1"
                    }
                  ]
                }
              ]
            },
            {
              label: "一级 3",
              children: [
                {
                  label: "二级 3-1",
                  children: [
                    {
                      label: "三级 3-1-1"
                    }
                  ]
                },
                {
                  label: "二级 3-2",
                  children: [
                    {
                      label: "三级 3-2-1"
                    }
                  ]
                }
              ]
            }
          ],
          props: {
            children: "children",
            label: "label",
            disabled: "disabled"
          }
        };
      },
      template: `
        <div>
          <co-tree :data="data" :props="props" :expand-on-click-node="false"></co-tree>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "highlight current",
    () => ({
      components: { CoTree },
      data() {
        return {
          data: [
            {
              label: "一级 1",
              children: [
                {
                  label: "二级 1-1",
                  children: [
                    {
                      label: "三级 1-1-1"
                    }
                  ]
                }
              ]
            },
            {
              label: "一级 2",
              children: [
                {
                  label: "二级 2-1",
                  children: [
                    {
                      label: "三级 2-1-1"
                    }
                  ]
                },
                {
                  label: "二级 2-2",
                  children: [
                    {
                      label: "三级 2-2-1"
                    }
                  ]
                }
              ]
            },
            {
              label: "一级 3",
              children: [
                {
                  label: "二级 3-1",
                  children: [
                    {
                      label: "三级 3-1-1"
                    }
                  ]
                },
                {
                  label: "二级 3-2",
                  children: [
                    {
                      label: "三级 3-2-1"
                    }
                  ]
                }
              ]
            }
          ],
          props: {
            children: "children",
            label: "label",
            disabled: "disabled"
          }
        };
      },
      template: `
        <div>
          <co-tree
            node-key="label"
            highlight-current
            current-node-key="二级 1-1"
            :data="data"
            :props="props"
            :expand-on-click-node="false"
          ></co-tree>
        </div>
      `
    }),
    { notes }
  );
