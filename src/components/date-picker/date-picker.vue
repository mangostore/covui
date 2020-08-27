<template>
  <div class="calendar-root">
    <div
      class="input-wrap"
      @mouseenter="closeBtnHover = true"
      @mouseleave="closeBtnHover = false"
    >
      <input
        class="input-date" :class="{'input-value': inputValueResult}"
        :style="inputStyles"
        @click="toggleCalendar()"
        @focus="closeBtnBlur = true"
        @blur="closeBtnBlur = false"
        :value="inputValueResult"
        placeholder="选择日期" readonly/>
      <div class="input-icon-wrap">
        <co-icon class="input-date-icon" :style="inputIconStyles" type="calendar" v-if="!closeBtnShow"/>
        <co-icon class="input-date-icon icon-close" :style="inputIconStyles" type="x-circle"
                 @click.native.stop.prevent="emptyValue(true)" v-else/>
      </div>
    </div>
    <div
      class="calendar"
      :class="{'calendar-right-to-left': isRighttoLeft}"
      :style="datePickerStyles"
      v-if="isOpen">
      <div class="calendar-container">
        <ul class="calendar_preset" :style="leftBtnListStyles">
          <li
            class="calendar_preset-ranges"
            v-for="(item, idx) in finalPresetRanges" :key="idx"
            @click="updatePreset(item)"
            @mouseenter="leftBtnHover = item.label"
            @mouseleave="leftBtnHover = ''"
            :style="{backgroundColor: leftBtnHover === item.label || presetActive === item.label ? (custom.picker && custom.picker.leftSelect || '') : 'transparent', borderColor: (custom.picker && custom.picker.border || '')}"
            :class="{'active-preset': presetActive === item.label}">
            {{ item.label }}
          </li>
        </ul>

        <div class="calendar-wrap">
          <div class="calendar_month_left" v-if="showMonth">
            <div class="months-text" :style="{borderColor: (custom.picker && custom.picker.border || '')}">
              <div class="months-icon" @click="goPrevMonth">
                <co-icon
                  class="icon" :style="{stroke: (custom.picker && custom.picker.week || '')}"
                  type="chevron-left"/>
              </div>
              <div class="text">
                {{ activeYearStart + "年" + monthsLocale[activeMonthStart] }}
              </div>
            </div>

            <div class="calendar-list-wrap">
              <ul :class="s.daysWeeks">
                <li
                  :style="{color: (custom.picker && custom.picker.week || '')}"
                  v-for="item in shortDaysLocale" :key="item">{{ item }}
                </li>
              </ul>
              <ul v-for="r in 6" :class="[s.days]" :key="r">
                <li
                  :style="{
                    backgroundColor: isDateSelected(r, i, 'first', startMonthDay, endMonthDate) ? (custom.picker && custom.picker.select || '') : isDateInRange(r, i, 'first', startMonthDay, endMonthDate) || dateHover === ('left' + r + i) ? (custom.picker && custom.picker.selectLight || '') : '',
                    color: isDateSelected(r, i, 'first', startMonthDay, endMonthDate) ? (custom.picker && custom.picker.btnFont || '') : ''
                  }"
                  :class="[{
                      [s.daysSelected]: isDateSelected(r, i, 'first', startMonthDay, endMonthDate),
                      [s.daysInRange]: isDateInRange(r, i, 'first', startMonthDay, endMonthDate),
                      [s.dateDisabled]: isDateDisabled(r, i, startMonthDay, endMonthDate)
                    }]"
                  @mouseenter="dateHover = 'left' + r + i"
                  @mouseleave="dateHover = ''"
                  v-for="i in numOfDays" :key="i"
                  v-html="getDayCell(r, i, startMonthDay, endMonthDate)"
                  @click="selectFirstItem(r, i)"></li>
              </ul>
            </div>
          </div>

          <div class="calendar_month_right">
            <div class="months-text" :style="{borderColor: (custom.picker && custom.picker.border || '')}">
              <div class="text">
                {{ activeYearEnd + "年" + monthsLocale[startNextActiveMonth] }}
              </div>
              <div class="months-icon" @click="goNextMonth">
                <co-icon
                  class="icon" :style="{stroke: (custom.picker && custom.picker.week || '')}"
                  type="chevron-right"/>
              </div>
            </div>

            <div class="calendar-list-wrap">
              <ul :class="s.daysWeeks">
                <li
                  :style="{color: (custom.picker && custom.picker.week || '')}"
                  v-for="item in shortDaysLocale" :key="item"
                >{{ item }}
                </li>
              </ul>
              <ul v-for="r in 6" :class="[s.days]" :key="r">
                <li
                  :style="{
                    backgroundColor: isDateSelected(r, i, 'second', startNextMonthDay, endNextMonthDate) ? (custom.picker && custom.picker.select || '') : isDateInRange(r, i, 'second', startNextMonthDay, endNextMonthDate) || dateHover === ('right' + r + i) ? (custom.picker && custom.picker.selectLight || '') : '',
                    color: isDateSelected(r, i, 'second', startNextMonthDay, endNextMonthDate) ? (custom.picker && custom.picker.btnFont || '') : ''
                  }"
                  :class="[{
                      [s.daysSelected]: isDateSelected(r, i, 'second', startNextMonthDay, endNextMonthDate),
                      [s.daysInRange]: isDateInRange(r, i, 'second', startNextMonthDay, endNextMonthDate),
                      [s.dateDisabled]: isDateDisabled(r, i, startNextMonthDay, endNextMonthDate)
                    }]"
                  @mouseenter="dateHover = 'right' + r + i"
                  @mouseleave="dateHover = ''"
                  v-for="i in numOfDays" :key="i"
                  v-html="getDayCell(r, i, startNextMonthDay, endNextMonthDate)"
                  @click="selectSecondItem(r, i)"></li>
              </ul>
            </div>
          </div>

        </div>

      </div>
      <div class="calendar-btn-wrap" :style="{borderColor: (custom.picker && custom.picker.border || '')}">
        <div
          class="calendar-btn calendar-btn-empty"
          :style="{borderColor: (custom.picker && custom.picker.border || '')}"
          @click="emptyValue(false)">{{ captions.empty_button }}
        </div>
        <div class="calendar-btn calendar-btn-apply" :style="confirmBtnStyles" @click="setDateValue()">
          {{ captions.ok_button }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fecha from "fecha";
import CoIcon from "../../components/icon";

const defaultConfig = {};
const defaultI18n = "ZH";
const availableMonths = {
  EN: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ID: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
  ZH: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
};

const availableShortDays = {
  EN: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  ID: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  ZH: ["日", "一", "二", "三", "四", "五", "六"]
};

const presetRangeLabel = {
  EN: {
    today: "Today",
    thisMonth: "This Month",
    lastSevenDays: "Last 7 Days",
    lastThirtyDays: "Last 30 Days"
  },
  ID: {
    today: "Hari ini",
    thisMonth: "Bulan ini",
    lastSevenDays: "7 Hari Terakhir",
    lastThirtyDays: "30 Hari Terakhir"
  },
  ZH: {
    today: "今天",
    thisMonth: "这个月",
    lastSevenDays: "最近7天",
    lastThirtyDays: "最近30天"
  }
};

const defaultCaptions = {
  empty_button: "清空",
  ok_button: "确定"
};

const defaultStyle = {
  daysWeeks: "calendar_weeks",
  days: "calendar_days",
  daysSelected: "calendar_days_selected",
  daysInRange: "calendar_days_in-range",
  firstDate: "calendar_month_left",
  secondDate: "calendar_month_right",
  presetRanges: "calendar_preset-ranges",
  dateDisabled: "calendar_days--disabled"
};

const defaultPresets = function (i18n = defaultI18n) {
  return {
    today: function () {
      const n = new Date();
      const today = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0));
      return {
        label: presetRangeLabel[i18n].today,
        active: false,
        dateRange: {
          start: today,
          end: today
        }
      };
    },
    thisMonth: function () {
      const n = new Date();
      const startMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth(), 1));
      const endMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth() + 1, 0));
      return {
        label: presetRangeLabel[i18n].thisMonth,
        active: false,
        dateRange: {
          start: startMonth,
          end: endMonth
        }
      };
    },
    last7days: function () {
      const n = new Date();
      const start = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - 6));
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
      return {
        label: presetRangeLabel[i18n].lastSevenDays,
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      };
    },
    last30days: function () {
      const n = new Date();
      const start = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - 30));
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
      return {
        label: presetRangeLabel[i18n].lastThirtyDays,
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      };
    }
  };
};

export default {
  name: "co-date-picker",
  components: { CoIcon },
  props: {
    // 默认值
    value: {
      type: Array,
      default: () => []
    },
    // 主题色调
    custom: {
      type: Object,
      default: () => {
        return {
          input: {
            border: "#dcdee2", // 输入框默认状态
            hover: "#575ff3", // 输入框鼠标放上去
            blur: "rgba(45, 140, 240, .2)", // 输入框获取焦点
            icon: "#808695", // 输入框上icon
            font: "#515a6e", // 输入的文字
            background: "#fff" // 输入框的背景颜色
          },
          picker: {
            shadow: "#ccc", // 弹窗阴影
            border: "#e8eaec", // 线条边框等
            background: "#fff", // 整体背景
            leftBg: "#f8f8f9", // 左侧快捷键背景
            leftSelect: "#e8eaec", // 快捷键鼠标移上去及选中指示
            font: "#333", // 显示文字
            week: "#c5c8ce", // 周、左右按钮等不重要文字
            selectLight: "#e1f0fe", // 标记日期的辅助色
            select: "#2d8cf0", // 标记的日期，按钮等凸显
            btnFont: "#fff" // 凸显按钮上的文字
          }
        };
      }
    },
    configs: {
      type: Object,
      default: () => defaultConfig
    },
    i18n: {
      type: String,
      default: defaultI18n
    },
    months: {
      type: Array,
      default: () => null
    },
    shortDays: {
      type: Array,
      default: () => null
    },
    captions: {
      type: Object,
      default: () => defaultCaptions
    },
    format: {
      type: String,
      default: "YYYY-MM-DD"
    },
    styles: {
      type: Object,
      default: () => {
      }
    },
    initRange: {
      type: Object,
      default: () => null
    },
    startActiveMonth: {
      type: Number,
      default: new Date().getMonth()
    },
    startActiveYear: {
      type: Number,
      default: new Date().getFullYear()
    },
    presetRanges: {
      type: Object,
      default: () => null
    },
    righttoleft: {
      type: String,
      default: "false"
    }
  },
  data() {
    return {
      dateRange: {},
      numOfDays: 7,
      isFirstChoice: true, // 是否第一次点击
      isOpen: false,
      presetActive: "",
      showMonth: false,
      activeMonthStart: this.startActiveMonth,
      activeYearStart: this.startActiveYear,
      activeYearEnd: this.startActiveYear,
      closeBtnHover: false, // 鼠标在input框上
      closeBtnBlur: false, // input获取焦点
      leftBtnHover: "", // 鼠标在左侧某个快捷键上
      dateHover: "" // 鼠标在某个日历项上
    };
  },
  created() {
    if (this.activeMonthStart === 11) this.activeYearEnd = this.activeYearStart + 1;
  },
  watch: {
    // 检测初始值
    value: {
      handler(val) {
        if (val) {
          let start = "";
          if (val[0]) start = new Date(val[0]);
          let end = "";
          if (val[1]) end = new Date(val[1]);
          this.dateRange = {
            start,
            end
          };
        }
      },
      immediate: true
    },
    startNextActiveMonth: function (value) {
      if (value === 0) this.activeYearEnd = this.activeYearStart + 1;
    }
  },
  computed: {
    // 隐藏显示关闭icon
    closeBtnShow() {
      return !!(this.closeBtnHover && this.inputValueResult);
    },
    // 选中的值
    inputValueResult() {
      let value = "";
      if (this.dateRange.start) {
        value += this.getDateString(this.dateRange.start);
      }
      if (this.dateRange.end) {
        value += " - " + this.getDateString(this.dateRange.end);
      }
      return value;
    },
    monthsLocale: function () {
      return this.months || availableMonths[this.i18n];
    },
    shortDaysLocale: function () {
      return this.shortDays || availableShortDays[this.i18n];
    },
    s: function () {
      return Object.assign({}, defaultStyle, this.style);
    },
    startMonthDay: function () {
      return new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 1)).getDay();
    },
    startNextMonthDay: function () {
      return new Date(Date.UTC(this.activeYearStart, this.startNextActiveMonth, 1)).getDay();
    },
    endMonthDate: function () {
      return new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 0)).getDate();
    },
    endNextMonthDate: function () {
      return new Date(Date.UTC(this.activeYearEnd, this.activeMonthStart + 2, 0)).getDate();
    },
    startNextActiveMonth: function () {
      return this.activeMonthStart >= 11 ? 0 : this.activeMonthStart + 1;
    },
    // 左侧快捷方式列表数据
    finalPresetRanges: function () {
      const tmp = {};
      const presets = this.presetRanges || defaultPresets(this.i18n);
      for (const i in presets) {
        const item = presets[i];
        let plainItem = item;
        if (typeof item === "function") {
          plainItem = item();
        }
        tmp[i] = plainItem;
      }
      return tmp;
    },
    // 为true靠右悬浮，默认为false靠左
    isRighttoLeft: function () {
      return this.righttoleft === "true";
    },
    // input的样式
    inputStyles() {
      const style = {
        backgroundColor: this.custom.input && this.custom.input.background || "",
        borderColor: this.custom.input && this.custom.input.border || "",
        color: this.custom.input && this.custom.input.font || "",
        boxShadow: ""
      };
      if (this.closeBtnHover) {
        style.borderColor = this.custom.input && this.custom.input.hover || "";
      }
      if (this.closeBtnBlur) {
        style.boxShadow = `0 0 0 2px ${this.custom.input && this.custom.input.blur || ""}`;
      }

      return style;
    },
    // input上Icon的样式
    inputIconStyles() {
      return {
        stroke: this.custom.input && this.custom.input.icon || ""
      };
    },
    // 日期弹窗样式
    datePickerStyles() {
      return {
        boxShadow: `-3px 4px 12px -1px ${this.custom.picker && this.custom.picker.shadow || ""}`,
        color: this.custom.picker && this.custom.picker.font || "",
        backgroundColor: this.custom.picker && this.custom.picker.background || ""
      };
    },
    // 左侧快捷键的样式
    leftBtnListStyles() {
      return {
        backgroundColor: this.custom.picker && this.custom.picker.leftBg || "",
        borderRightColor: this.custom.picker && this.custom.picker.border || ""
      };
    },
    // 确定按钮样式
    confirmBtnStyles() {
      return {
        backgroundColor: this.custom.picker && this.custom.picker.select || "",
        color: this.custom.picker && this.custom.picker.btnFont || ""
      };
    }
  },
  methods: {
    toggleCalendar: function () {
      this.isOpen = !this.isOpen;
      this.showMonth = !this.showMonth;
      return;
    },
    getDateString: function (date, format = this.format) {
      if (!date) {
        return null;
      }
      const dateparse = new Date(Date.parse(date));
      return fecha.format(new Date(Date.UTC(dateparse.getFullYear(), dateparse.getMonth(), dateparse.getDate())), format);
    },
    // 计算这天在这个月的第几位
    getDayIndexInMonth: function (r, i, startMonthDay) {
      const date = (this.numOfDays * (r - 1)) + i;
      return date - startMonthDay;
    },
    getDayCell(r, i, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay);
      // bound by > 0 and < last day of month
      return result > 0 && result <= endMonthDate ? result : "&nbsp;";
    },
    getNewDateRange(result, activeMonth, activeYear) {
      const newData = {};
      let key = "start";
      if (!this.isFirstChoice) {
        key = "end";
      } else {
        newData["end"] = null;
      }
      const resultDate = new Date(Date.UTC(activeYear, activeMonth, result));
      if (!this.isFirstChoice && resultDate < this.dateRange.start) {
        this.isFirstChoice = false;
        return { start: resultDate };
      }

      // toggle first choice
      this.isFirstChoice = !this.isFirstChoice;
      newData[key] = resultDate;
      return newData;
    },
    // 点击左侧日历天
    selectFirstItem(r, i) {
      const result = this.getDayIndexInMonth(r, i, this.startMonthDay);
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.activeMonthStart,
        this.activeYearStart));
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = "";
      }
    },
    // 点击右侧日历天
    selectSecondItem(r, i) {
      const result = this.getDayIndexInMonth(r, i, this.startNextMonthDay);
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.startNextActiveMonth,
        this.activeYearEnd));
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = "";
      }
    },
    // 选中的起止值
    isDateSelected(r, i, key, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay);
      if (result < 1 || result > endMonthDate) return false;

      let currDate = null;
      if (key === "first") {
        currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result));
      } else {
        currDate = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, result));
      }
      return (this.dateRange.start && this.dateRange.start.getTime() === currDate.getTime()) ||
        (this.dateRange.end && this.dateRange.end.getTime() === currDate.getTime());
    },
    // 选中的中间值
    isDateInRange(r, i, key, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay);
      if (result < 1 || result > endMonthDate) return false;
      let currDate = null;
      if (key === "first") {
        currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result));
      } else {
        currDate = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, result));
      }
      return (this.dateRange.start && this.dateRange.start.getTime() < currDate.getTime()) &&
        (this.dateRange.end && this.dateRange.end.getTime() > currDate.getTime());
    },
    isDateDisabled(r, i, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay);
      // bound by > 0 and < last day of month
      return !(result > 0 && result <= endMonthDate);
    },
    goPrevMonth() {
      const prevMonth = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 0));
      this.activeMonthStart = prevMonth.getMonth();
      this.activeYearStart = prevMonth.getFullYear();
      this.activeYearEnd = prevMonth.getFullYear();
    },
    goNextMonth() {
      const nextMonth = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 1));
      this.activeMonthStart = nextMonth.getMonth();
      this.activeYearStart = nextMonth.getFullYear();
      this.activeYearEnd = nextMonth.getFullYear();
    },
    updatePreset(item) {
      this.presetActive = item.label;
      this.dateRange = item.dateRange;
      // update start active month
      this.activeMonthStart = this.dateRange.start.getMonth();
      this.activeYearStart = this.dateRange.start.getFullYear();
      this.activeYearEnd = this.dateRange.end.getFullYear();
    },
    // 清空
    emptyValue(close) {
      this.dateRange = {};
      this.isFirstChoice = true;
      if (close) {
        this.setDateValue();
      }
    },
    // 通知父组件并关闭
    setDateValue() {
      // 格式转化
      const startStr = this.getDateString(this.dateRange.start) || "";
      const endStr = this.getDateString(this.dateRange.end) || "";
      const arr = [];
      if (startStr || endStr) arr.push(startStr);
      if (endStr) arr.push(endStr);
      this.$emit("input", arr);
      if (this.isOpen) this.toggleCalendar();
    }
  }
};
</script>

<style lang="css" scoped>
.calendar-root {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.calendar-root * {
  user-select: none;
}

.calendar-root ul,
.calendar-root li {
  margin: 0;
  padding: 0;
}

.input-wrap {
  position: relative;
  width: 200px;
}

.input-wrap .input-date {
  display: flex;
  align-items: center;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  padding: 5px 23px 5px 7px;
  font-size: 14px;
  width: 200px;
}

.input-wrap .input-date::-webkit-input-placeholder {
  color: #ccc;
}

.input-wrap .input-date:focus, .input-date:hover {
  border-color: #57a3f3;
}

.input-wrap .input-date:focus {
  outline: 0;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
}

.input-wrap .input-icon-wrap {
  position: absolute;
  top: 0;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
}

.input-wrap .input-date-icon {
  width: 16px;
  height: 16px;
  stroke: #808695;
}

.input-wrap .input-date-icon.icon-close {
  cursor: pointer;
}

.calendar {
  display: block;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  box-shadow: -3px 4px 12px -1px #ccc;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: absolute;
  z-index: 9;
}

.calendar ul {
  list-style-type: none;
}

.calendar .calendar-container {
  display: flex;
}

.calendar_preset {
  margin: 0;
  padding: 0;
  background: #f8f8f9;
  border-right: 1px solid #e8eaec;
  border-radius: 4px 0 0 4px;
  overflow: auto;
}

.calendar_preset .calendar_preset-ranges {
  line-height: normal;
  padding: 6px 16px;
  transition: all .2s ease-in-out;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.calendar_preset .calendar_preset-ranges:hover {
  background: #e8eaec;
}

.calendar_preset .active-preset {
  background: #e8eaec;
}

.calendar-wrap {
  display: flex;
}

.calendar-wrap .months-text {
  display: flex;
  align-items: center;
  text-align: center;
  height: 32px;
  padding: 0 8px;
  box-sizing: border-box;
  border-bottom: 1px solid #e8eaec
}

.calendar-wrap .months-icon {
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.calendar-wrap .months-icon .icon {
  stroke: #c5c8ce;
}

.calendar-wrap .months-icon:hover .icon {
  stroke: #2d8cf0;
}

.calendar-wrap .months-text .text {
  text-align: center;
  width: 1px;
  flex-grow: 1;
}

.calendar-list-wrap {
  margin: 10px;
}

.calendar-list-wrap .calendar_weeks {
  display: flex;
}

.calendar-list-wrap .calendar_weeks li,
.calendar-list-wrap .calendar_days li {
  display: inline-block;
  margin: 2px;
  text-align: center;
  line-height: 24px;
  width: 24px;
  height: 24px;
}

.calendar-list-wrap .calendar_weeks li {
  color: #c5c8ce;
}

.calendar-list-wrap .calendar_days li {
  cursor: pointer;
}

.calendar-list-wrap .calendar_days li:hover {
  background: #e1f0fe;
  color: #000;
}

.calendar-list-wrap li.calendar_days--disabled {
  pointer-events: none;
}

.calendar-list-wrap li.calendar_days_selected {
  background: #2d8cf0;
  color: #fff;
}

.calendar-list-wrap li.calendar_days_in-range {
  background: #e1f0fe;
}

.calendar-btn-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  border-top: 1px solid #e8eaec;
}

.calendar-btn-wrap .calendar-btn {
  margin-right: 4px;
  line-height: 24px;
  height: 24px;
  padding: 0 7px;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;
}

.calendar-btn-wrap .calendar-btn.calendar-btn-empty {
  border: 1px solid #dcdee2;
}

.calendar-btn-wrap .calendar-btn.calendar-btn-apply {
  background: #2d8cf0;
  color: #fff;
}
</style>
