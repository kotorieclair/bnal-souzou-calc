import 'core-js/fn/object/assign'
import 'core-js/fn/number/is-integer'
import 'core-js/fn/string/repeat'

import Vue from 'vue'
import BnalSouzouCalc from './components/BnalSouzouCalc'
import { starify, addSign } from './filters'
import Store from './store'
// eslint-disable-next-line no-unused-vars
import style from './style'
// eslint-disable-next-line no-unused-vars
import ogimage from './img/cover.png'
import { bungo, cards } from './data'

Vue.filter('starify', starify)
Vue.filter('addSign', addSign)

Store.init({ bungo, cards })

new Vue({
  el: '#app',
  components: { BnalSouzouCalc },
  render: h => h('BnalSouzouCalc'),
})
