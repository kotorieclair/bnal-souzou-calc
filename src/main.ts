import 'core-js/fn/object/assign'
import 'core-js/fn/number/is-integer'
import 'core-js/fn/string/repeat'
import Vue from 'vue'
import Vuex,{ Store } from 'vuex'
import BnalSouzouCalc from 'components/BnalSouzouCalc/index.vue'
// import { starify, addSign } from './filters';
// import { slot, error } from './store/modules';
// import oldstore from './store/_index';
// import { bungo, cards } from './data';
// import store from './store'

declare function require(x: string): any
const style = require('./style');
const ogimage = require('./img/cover.png');

// Vue.filter('starify', starify);
// Vue.filter('addSign', addSign);

// oldstore.init({ bungo, cards });

const vm = new Vue({
  el: '#app',
  // store,
  components: { BnalSouzouCalc },
  render: h => h('BnalSouzouCalc'),
});
