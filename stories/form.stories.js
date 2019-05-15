import { storiesOf } from "@storybook/vue";
import { CoForm, CoFormItem } from "../src/components/form";
import CoInput from "../src/components/input";
import CoInputNumber from "../src/components/input-number";
import { CoSelect, CoOption } from "../src/components/select";
import { CoCheckbox, CoCheckboxGroup } from "../src/components/checkbox";
import { CoRadio, CoRadioGroup } from "../src/components/radio";
import { CoButton } from "../src/components/button";
import notes from "../src/components/form/README.md";

storiesOf("Form", module)
  .add(
    "basic form",
    () => ({
      components: {
        CoForm,
        CoFormItem,
        CoInput,
        CoInputNumber,
        CoButton,
        CoSelect,
        CoOption,
        CoCheckbox,
        CoCheckboxGroup
      },
      data() {
        return {
          form: {
            email: null,
            sex: null,
            age: 1,
            favorite: []
          },
          rules: {
            email: [
              {
                type: "email",
                required: true,
                message: "Please input email",
                trigger: "blur"
              }
            ],
            sex: [
              {
                required: true,
                message: "Please select sex",
                trigger: "change"
              }
            ],
            age: [
              {
                type: "number",
                required: true,
                message: "Please input age",
                trigger: "blur"
              },
              {
                type: "number",
                min: 1,
                max: 150,
                message: "Please input correct age",
                trigger: "blur"
              }
            ]
          }
        };
      },
      methods: {
        onRegister() {
          this.$refs.form.validate(valid => {
            if (valid) {
              console.log("submit");
            } else {
              console.log("error submit");
              return false;
            }
          });
        }
      },
      template: `
        <div style="width: 300px;">
          <co-form :model="form" :rules="rules" :label-width="60" ref="form">
            <co-form-item prop="email" label="Email:">
              <co-input type="email" v-model="form.email"></co-input>
            </co-form-item>
            <co-form-item prop="sex" label="Sex:">
              <co-select v-model="form.sex">
                <co-option label="male" value="male"></co-option>
                <co-option label="female" value="female"></co-option>
              </co-select>
            </co-form-item>
            <co-form-item prop="age" label="Age:">
              <co-input-number v-model="form.age"></co-input-number>
            </co-form-item>
            <co-form-item prop="favorite" label="Favorite:">
              <co-checkbox-group v-model="form.favorite">
                <co-checkbox label="apple"></co-checkbox>
                <co-checkbox label="banner"></co-checkbox>
                <co-checkbox label="watermelon"></co-checkbox>
              </co-checkbox-group>
            </co-form-item>
            <co-button type="primary" @click.native="onRegister">
              Register
            </co-button>
          </co-form>
        </div>
      `
    }),
    { notes }
  )
  .add(
    "inline form",
    () => ({
      components: { CoForm, CoFormItem, CoInput, CoButton },
      data() {
        return {
          form: {
            user: "",
            password: ""
          }
        };
      },
      template: `
        <co-form :model="form" :label-width="60" inline>
          <co-form-item label="email">
            <co-input v-model="form.user"></co-input>
          </co-form-item>
          <co-form-item label="password">
            <co-input v-model="form.password"></co-input>
          </co-form-item>
          <co-button type="primary">Submit</co-button>
        </co-form>
       `
    }),
    { notes }
  )
  .add(
    "alignment",
    () => ({
      components: { CoForm, CoFormItem, CoInput, CoButton, CoRadio, CoRadioGroup },
      data() {
        return {
          labelPosition: "right",
          form: {
            user: "",
            password: ""
          }
        };
      },
      template: `
        <div style="width: 300px;">
          <co-radio-group v-model="labelPosition" type="button" style="margin-bottom: 20px;">
            <co-radio label="left"></co-radio>
            <co-radio label="right"></co-radio>
            <co-radio label="top"></co-radio>
          </co-radio-group>
          <co-form :model="form" :label-width="labelPosition === 'top' ? 0 : 60" :labelPosition="labelPosition">
            <co-form-item label="email">
              <co-input v-model="form.user"></co-input>
            </co-form-item>
            <co-form-item label="password">
              <co-input v-model="form.password"></co-input>
            </co-form-item>
            <co-button type="primary">Submit</co-button>
          </co-form>
        </div>
       `
    }),
    { notes }
  );
