import Vue from "vue";
import PopperJs from "popper.js";

const isServer = Vue.prototype.$isServer;
const Popper = isServer ? () => {} : PopperJs;

const placementValues = [
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
];

export default {
  props: {
    // popper 出现的位置
    placement: {
      type: String,
      default: "bottom",
      validator(value) {
        return placementValues.includes(value);
      }
    },
    // popper options
    options: {
      type: Object,
      default() {
        return {
          modifiers: {
            computeStyle: {
              gpuAcceleration: false
            }
          }
        };
      }
    },
    // popper 是否插入到 body 尾部
    appendBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      popperJS: null,
      popperElm: null,
      appendToBody: this.appendBody
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.updatePopper();
      } else {
        this.destroyPopper();
      }
    }
  },
  beforeDestroy() {
    if (this.popperJS) {
      this.popperJS.destroy();
      this.popperJS = null;
    }
  },
  methods: {
    createPopper() {
      if (isServer) return;

      const popper = this.popper || this.$refs.popper;
      const reference = this.reference || this.$refs.reference;
      const options = Object.assign({}, this.options, {
        placement: this.placement,
        onCreate: () => {
          this.resetTransformOrigin();
          this.$nextTick(this.updatePopper);
        }
      });

      if (this.appendToBody) {
        document.body.appendChild(popper);
      }

      this.popperElm = popper;
      this.popperJS = new Popper(reference, popper, options);

      if (this.$options.name === "co-select") {
        this.width = this.$el.getBoundingClientRect().width;
      }
    },
    updatePopper() {
      if (this.popperJS) {
        this.popperJS.update();
      } else {
        this.createPopper();
      }
    },
    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },
    resetTransformOrigin() {
      const placementMap = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      };
      const placement = this.popperJS.popper
        .getAttribute("x-placement")
        .split("-");
      const origin = placementMap[placement[0]];
      const popperElm = this.popperJS.popper;
      const axis = placement[1];

      if (["top", "bottom"].indexOf(origin) !== -1) {
        const map = {
          start: "left",
          end: "right"
        };

        popperElm.style.transformOrigin = `${
          axis ? map[axis] : "center"
        } ${origin}`;
      } else {
        const map = {
          start: "top",
          end: "bottom"
        };

        popperElm.style.transformOrigin = `${origin} ${
          axis ? map[axis] : "center"
        }`;
      }
    },
    findInput() {
      const reference = this.$refs.reference;
      const inputElm = reference.querySelector("input");
      const textareaElm = reference.querySelector("textarea");
      let elm = null;

      if (inputElm) {
        elm = inputElm;
      } else if (textareaElm) {
        elm = textareaElm;
      }

      return elm;
    }
  }
};
