import BngoSlot from '../BngoSlot';

export default {
  name: 'BnalSouzouCalc',
  components: { BngoSlot },
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
  },
};
