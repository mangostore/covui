<template>
  <co-modal
    v-if="!isMobile"
    :value="visiable"
    title="表格条件配置" 
    width="510"
    center
    @on-ok="onModalOk"
    @on-cancel="onModalCancel">
    <div class="co-table__condition">

      <div class="co-table__row">
        <div class="co-table__label">最大值前</div>
        <div class="co-table__input">
          <co-input-number 
            v-model="setting.maxCount"
            :min="0"></co-input-number>
        </div>
        <div class="co-table__unit">个</div>
        <div class="co-table__color-select">
          <co-color-select
            :colors="colors"
            v-model="setting.maxColorIndex"></co-color-select>
        </div>
      </div>

      <div class="co-table__row">
        <div class="co-table__label">最小值前</div>
        <div class="co-table__input">
          <co-input-number 
            v-model="setting.minCount"
            :min="0"></co-input-number>
        </div>
        <div class="co-table__unit">个</div>
        <div class="co-table__color-select">
          <co-color-select
            :colors="colors"
            v-model="setting.minColorIndex"></co-color-select>
        </div>
      </div>

      <div class="co-table__row">
        <div class="co-table__label">中位数</div>
        <div class="co-table__color-select">
          <co-color-select
            :colors="midColors"
            v-model="setting.midColorIndex"></co-color-select>
        </div>
      </div>

      <div class="co-table__row">
        <div class="co-table__label">分档设置</div>
        <div class="co-table__sections">
          <div 
            class="co-table__section"
            v-for="(section, index) in setting.sections">
            <div class="co-table__input">
              <co-select v-model="section.operator">
                <co-option
                  v-for="(operator, index) in operators"
                  :key="index"
                  :value="operator.key"
                  :label="operator.name"></co-option>
              </co-select>
            </div>
            <div class="co-table__input">
              <co-input v-model="section.operatorValue1"></co-input>
            </div>
            <div 
              class="co-table__input"
              v-if="section.operator === 'range'">
              <co-input v-model="section.operatorValue2"></co-input>
            </div>
            <div class="co-table__color-select">
              <co-color-select
                :colors="colors"
                v-model="section.secColorIndex"></co-color-select>
            </div>
            <div class="co-table__controls">
              <co-icon
                type="close-round"
                @click.native="removeSection(index)"></co-icon>
              <co-icon
                type="plus-round"
                @click.native="addSection"></co-icon> 
            </div>
          </div>
        </div>
      </div>
      
      <div class="co-table__row">
        <co-checkbox
          label="隐藏当前列"
          v-model="setting.hide"></co-checkbox>
      </div>

      <div class="co-table__row" v-if="showHide">
        <co-checkbox
          label="显示全部隐藏列"
          v-model="showAll"></co-checkbox>
      </div>
    </div>
  </co-modal>
</template>

<script>
  import cloneDeep from 'lodash/cloneDeep';
  import CoColorSelect from 'components/color-select/color-select';

  export default {
    name: 'co-table-condition',
    components: {
      CoColorSelect,
    },
    props: {
      isMobile: Boolean,
      visiable: Boolean,
      colors: Array,
      conditionSetting: Object,
      showHide: false,
    },
    data() {
      return {
        setting: null,
        showAll: false,
        operators: [{
          key: 'eq',
          name: '等于',
        }, {
          key: 'ne',
          name: '不等于',
        }, {
          key: 'gt',
          name: '大于',
        }, {
          key: 'ge',
          name: '大于等于',
        }, {
          key: 'lt',
          name: '小于',
        }, {
          key: 'le',
          name: '小于等于',
        }, {
          key: 'range',
          name: '区间',
        }],
      };
    },
    computed: {
      midColors() {
        let result = [''];
        result = result.concat(this.colors);
        return result;
      },
    },
    methods: {
      removeSection(index) {
        if (this.setting.sections.length > 1) {
          this.setting.sections.splice(index, 1);
        } else {
          this.setting.sections.splice(0, 1, {
            operator: '',
            operatorValue1: 0,
            operatorValue2: 0,
            secColorIndex: 0,
          });
        }
      },
      addSection() {
        this.setting.sections.push({
          operator: '',
          operatorValue1: 0,
          operatorValue2: 0,
          secColorIndex: 0,
        });
      },
      onModalOk() {
        this.$emit('modal-ok', {
          setting: this.setting,
          showAll: this.showAll,
        });
        this.showAll = false;
      },
      onModalCancel() {
        this.$emit('modal-cancel');
        this.setting = cloneDeep(this.snapshootSetting);
      },
    },
    watch: {
      conditionSetting: {
        deep: true,
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.setting = cloneDeep(newVal);
          } else {
            this.setting = {
              maxCount: 0,
              maxColorIndex: 0,
              minCount: 0,
              minColorIndex: 0,
              midColorIndex: -1,
              sections: [{
                operator: '',
                operatorValue1: 0,
                operatorValue2: 0,
                secColorIndex: 0,
              }],
              hide: false,
            };
          }
        },
      },
      visiable(newVal) {
        if (newVal) {
          this.snapshootSetting = cloneDeep(this.setting);
        }
      },
    },
  };
</script>

<style lang="less">
  .co-table {

    &__row {
      margin-bottom: 10px;
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }

    &__label {
      float: left;
      width: 60px;
      line-height: 26px;
    }

    &__input {
      width: 80px;
      margin-right: 10px;
      float: left;
    }

    &__unit {
      float: left;
      margin-right: 10px;
      line-height: 26px;
    }

    &__color-select {
      float: left;
      line-height: 0;
    }
    
    &__sections {
      float: left;
    }

    &__section {
      margin-bottom: 5px;
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }

    &__controls {
      float: left;
      padding-left: 5px;
      .co-icon {
        line-height: 26px;
        color: #dcdcdc;
        font-size: 16px;
        transform: scale(0.7);
        cursor: pointer;
        margin-left: 5px;
        &:hover {
          color: #333;
        }
      }
    }
  }
</style>
