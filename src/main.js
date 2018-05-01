import Vue from 'vue';
import BnalSouzouCalc from './components/BnalSouzouCalc';
import { starify, addSign } from './filters';
import style from './style';

Vue.filter('starify', starify);
Vue.filter('addSign', addSign);

const vm = new Vue({
  el: '#app',
  components: { BnalSouzouCalc },
  render: h => h('BnalSouzouCalc'),
});
