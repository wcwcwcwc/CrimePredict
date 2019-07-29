import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Button, Layout, Icon, Drawer, Radio, Menu, Card, Row, Col, Avatar, Tabs, Checkbox,Form, Select, Table, Switch, Popover, Tooltip, Slider, DatePicker,Input  } from "ant-design-vue";
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Avatar);
Vue.use(Tabs);
Vue.use(Checkbox);
Vue.use(Form);
Vue.use(Select);
Vue.use(Table);
Vue.use(Switch);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Slider);
Vue.use(DatePicker);
Vue.use(Input)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
}).$mount("#app");
