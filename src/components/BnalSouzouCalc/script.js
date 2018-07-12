import BngoSlot from '../BngoSlot';

export default {
  name: 'BnalSouzouCalc',
  components: { BngoSlot },
  data() {
    return {
      totalSlot: 4,
      spCurrent: 1,
    };
  },
  methods: {
    setSpCurrent(payload, e) {
      this.spCurrent = parseInt(payload);
    },
  },
};
