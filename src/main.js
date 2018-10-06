import 'core-js/fn/object/assign'
import 'core-js/fn/number/is-integer'
import 'core-js/fn/string/repeat'
import Vue from 'vue'
import BnalSouzouCalc from 'components/BnalSouzouCalc'
import { starify, addSign } from 'filters'
// import { slot, error } from './store/modules';
import oldstore from 'store/_index'
// eslint-disable-next-line no-unused-vars
import style from 'style'
// eslint-disable-next-line no-unused-vars
import ogimage from 'img/cover.png'
import { bungo, cards } from 'data'
import store from 'store'

Vue.filter('starify', starify)
Vue.filter('addSign', addSign)

oldstore.init({ bungo, cards })

new Vue({
  el: '#app',
  store,
  components: { BnalSouzouCalc },
  render: h => h('BnalSouzouCalc'),
})
