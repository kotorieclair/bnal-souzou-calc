import Vue from 'vue';
// import BngoSlot from '../BngoSlot/index.vue';
// import ErrorMessage from '../ErrorMessage/index.vue';

const BnalSouzouCalc = Vue.extend({
  name: 'BnalSouzouCalc',
  // components: { BngoSlot, ErrorMessage },
  data() {
    return {
      totalSlot: 4,
      spCurrent: 1,
    };
  },
  methods: {
    setSpCurrent(payload: string, e: object) {
      this.spCurrent = parseInt(payload);
    },
  },
})

export default BnalSouzouCalc
