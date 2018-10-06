import BngoSlot from '../BngoSlot';
import ErrorMessage from '../ErrorMessage';

export default {
  name: 'BnalSouzouCalc',
  components: { BngoSlot, ErrorMessage },
  data() {
    return {
      totalSlot: 4,
      spCurrent: 1,
    };
  },
  methods: {
    setSpCurrent(payload) {
      this.spCurrent = parseInt(payload);
    },
  },
};
