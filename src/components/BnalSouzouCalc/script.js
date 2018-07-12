import BngoSlot from '../BngoSlot';
import ErrorMessage from '../ErrorMessage';

export default {
  name: 'BnalSouzouCalc',
  components: { BngoSlot, ErrorMessage },
  data() {
    return {
      slotNum: 4,
      spCurrent: 1,
    };
  },
  methods: {
    setSpCurrent(payload, e) {
      this.spCurrent = parseInt(payload);
    },
    testtoggle() {
      console.log('testtoggle');
      this.$root.$emit('displayError', 'aaa');
    }
  },
};
