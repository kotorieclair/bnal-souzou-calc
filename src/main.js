import Vue from 'vue';
import BnalSouzouCalc from './components/BnalSouzouCalc';
import { starify, addSign } from './filters';
import style from './style';
import ogimage from './img/cover.png'

Vue.filter('starify', starify);
Vue.filter('addSign', addSign);

const eventHub = new Vue();

const vm = new Vue({
  el: '#app',
  components: { BnalSouzouCalc },
  render: h => h('BnalSouzouCalc'),
});
