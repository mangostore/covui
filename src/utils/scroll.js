import Vue from "vue";

let scrollBarWidth;

// 获取滚动条宽度,缓存结果方便下次获取
export function getScrollBarWidth() {
  if (Vue.prototype.$isServer) return 0;

  if (typeof scrollBarWidth === "undefined") {
    const outer = document.createElement("div");
    const inner = document.createElement("div");

    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.position = "absolute";
    outer.style.zIndex = "-999";
    outer.style.overflow = "scroll";

    inner.style.width = "100%";

    document.body.appendChild(outer);
    outer.appendChild(inner);

    const outerWidth = outer.offsetWidth;
    const innerWidth = inner.offsetWidth;

    document.body.removeChild(outer);
    scrollBarWidth = outerWidth - innerWidth;
  }

  return scrollBarWidth;
}
