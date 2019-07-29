<template>
  <div>
    <a-drawer  placement="right" :closable="false" @close="onClose" :visible="visible" width="880">
      <template v-slot:handle>
        <div class="handle" @click="visible=!visible">
          <icon-font :type="visible? 'icon-close-circle': 'icon-shuqian'" style="font-size:24px;color:#fff"></icon-font>
        </div>
      </template>
      <div>
        <Calender />
      </div>
    </a-drawer>
  </div>
</template>
<script>
import * as d3 from "d3";
import styles from "../../less/drawer.less";
import Calender from "./Calender";
import { Icon } from "ant-design-vue";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1264069_6pldljw21t4.js"
});


export default {
  data() {
    return {
      visible: false
    };
  },
  mounted() {},
  methods: {
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    }
  },
  components: {
    Calender,
    IconFont
  }
};
</script>
<style >
.handle {
  position: absolute;
  top: 240px;
  right: 880px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 30px 0 0 30px;
  box-shadow: rgba(0, 21, 41, 0.35) 2px 0px;
}
.handle:hover {
  cursor: pointer;
}
</style>
