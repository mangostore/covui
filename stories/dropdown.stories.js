import { storiesOf } from "@storybook/vue";
import {
  CoDropdown,
  CoDropdownMenu,
  CoDropdownItem
} from "../src/components/dropdown";
import { CoButton } from "../src/components/button";
import CoIcon from "../src/components/icon";
import notes from "../src/components/dropdown/README.md";
import actions from "./actions";

storiesOf("Dropdown", module)
  .add(
    "basic dropdown",
    () => ({
      components: {
        CoDropdown,
        CoDropdownMenu,
        CoDropdownItem,
        CoButton,
        CoIcon
      },
      methods: actions,
      template: `
        <div>
          <co-dropdown @dropdown-click="dropdownClick">
            <co-button type="primary">
              Hover Dropdown
              <co-icon type="chevron-down"></co-icon>
            </co-button>
            <co-dropdown-menu slot="menu">
              <co-dropdown-item label="action 1" active>Action 1</co-dropdown-item>
              <co-dropdown-item label="action 2" disabled>Action 2</co-dropdown-item>
              <co-dropdown-item label="action 3" divided>Action 3</co-dropdown-item>
            </co-dropdown-menu>
          </co-dropdown> 
          <co-dropdown trigger="click" @dropdown-click="dropdownClick">
            <co-button type="primary">
              Click Dropdown
              <co-icon type="chevron-down"></co-icon>
            </co-button>
            <co-dropdown-menu slot="menu">
              <co-dropdown-item label="action 1">Action 1</co-dropdown-item>
              <co-dropdown-item label="action 2">Action 2</co-dropdown-item>
              <co-dropdown-item label="action 3">Action 3</co-dropdown-item>
            </co-dropdown-menu>
          </co-dropdown> 
        </div>
      `
    }),
    { notes }
  )
  .add(
    "custom dropdown",
    () => ({
      components: {
        CoDropdown,
        CoDropdownMenu,
        CoDropdownItem,
        CoButton,
        CoIcon
      },
      data() {
        return {
          show: true
        };
      },
      methods: {
        open() {
          this.show = true;
        },
        close() {
          this.show = false;
        }
      },
      template: `
        <co-dropdown trigger="custom" :show="show">
          <co-button type="primary" @click.native="open">
            Dropdown List
            <co-icon type="chevron-down"></co-icon>
          </co-button>
          <co-dropdown-menu slot="menu" style="padding: 10px;">
            <p>
            click Dropdown List to open dropdown, <br>
            and click close button to close.
            </p>
            <co-button @click.native="close">close</co-button>
          </co-dropdown-menu>
        </co-dropdown> 
      `
    }),
    { notes }
  )
  .add(
    "placements",
    () => ({
      components: {
        CoDropdown,
        CoDropdownMenu,
        CoDropdownItem,
        CoButton,
        CoIcon
      },
      data() {
        return {
          placement: "",
          placements: [
            "top",
            "top-start",
            "top-end",
            "right",
            "right-start",
            "right-end",
            "bottom",
            "bottom-start",
            "bottom-end",
            "left",
            "left-start",
            "left-end"
          ]
        };
      },
      methods: actions,
      template: `
        <div style="padding: 90px 120px">
          <co-dropdown
            v-for="placement in placements"
            :placement="placement"
            :key="placement"
            style="margin: 5px"
            @dropdown-click="dropdownClick">
            <co-button type="primary">
              Dropdown List - {{ placement }}
              <co-icon type="chevron-down"></co-icon>
            </co-button>
            <co-dropdown-menu slot="menu">
              <co-dropdown-item label="action 1">Action 1</co-dropdown-item>
              <co-dropdown-item label="action 2">Action 2</co-dropdown-item>
              <co-dropdown-item label="action 3">Action 3</co-dropdown-item>
            </co-dropdown-menu>
          </co-dropdown> 
        </div>
      `
    }),
    { notes }
  );
