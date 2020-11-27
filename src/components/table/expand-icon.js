import CoIcon from '../icon';
import emitter from '../../mixins/emitter';

export default {
  name: 'expand-icon',
  mixins: [emitter],
  props: {
    row: Object,
    expandable: Boolean,
    isNeedIndent: Boolean,
    expanded: Boolean,
  },
  computed:{
    table() {
      return this.$parent.$parent;
    },
  },
  methods: {
    onClick(e) {
        let obj={};
        obj.row=this.row;
        obj.flag=this.expanded
      if (e.target !== e.currentTarget) return;
        console.log("看看row",obj)
      e.stopPropagation();
      this.dispatch('table-body', 'on-expanded', !this.expanded, this.row);
      this.table.$emit('iconClick',obj)
    },
  },
  render() {
    const { expandable, isNeedIndent, expanded } = this;
    const iconType = expanded ? 'chevron-down' : 'chevron-right';

    if (expandable) {
      return (
        <co-icon
          class="co-table__expand"
          type={iconType}
          nativeOnClick={this.onClick}></co-icon>
      );
    } else if (isNeedIndent) {
      return <span class="co-table__expand co-table__expand--space">.</span>;
    }

    return null;
  },
  components: {
    CoIcon,
  },
};
