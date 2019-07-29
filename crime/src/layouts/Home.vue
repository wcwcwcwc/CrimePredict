<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header" style="position:sticky;top:0;z-index:1002">
      <icon-font type="icon-shenggonganting-copy" style="font-size:44px;margin-top: 10px;" />
      <span
        style="position:absolute;float:left;color:#ccc; font-size:24px;font-weight:500"
      >犯罪时空分析预测系统</span>
      <a-menu
        theme="dark"
        mode="horizontal"
        style="position:absolute;z-index:1002;top:8px; left:35%"
      >
        <a-menu-item key="1" @click="goHome">
          <icon-font type="icon-zhuye1" style="font-size:20px;color:#fff" />首页
        </a-menu-item>
        <a-menu-item key="2" @click="caseInput">
          <icon-font type="icon-luru" style="font-size:20px;color:#fff" />案情录入
        </a-menu-item>
        <a-menu-item key="3" @click="caseSearch">
          <icon-font type="icon-jiansuo1" style="font-size:20px;color:#fff" />案情检索
        </a-menu-item>
        <a-menu-item key="4">
          <icon-font type="icon-yonghuguanli" style="font-size:20px;color:#fff" />用户管理
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        class="sidebar"
        v-if="navLayout==='left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="236px"
        style="box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);"
      >
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-content :style="{margin: 0, minHeight: '280px' }">
          <router-view></router-view>
          <transition name="slide-fade">
            <a-card
              class="card"
              :title="this.$store.state.cardTitle"
              :bordered="true"
              style="width: 450px;position:absolute;z-index:1000;top:70px;margin-left:8px"
              v-if="this.$store.state.showSlide"
              headStyle="height:56px"
            >
              <template class="ant-card-actions" slot="actions">
                <a-icon type="caret-left" @click="test" />
              </template>
              <router-view></router-view>
            </a-card>
          </transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import SiderMenu from "./SiderMenu";
import WorkPlanet from "../views/WorkPlanet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "ant-design-vue";
import styles from "../less/table.less";
var esri = require("esri-leaflet");


const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1264069_aov6xwzko7r.js"
});

export default {
  data() {
    return {
      collapsed: false,
      resolutions: null,
      value: "天地图影像",
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.loadMap();
      /* this.clickmap(); */
      //this.gotomap();
    });
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "light";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  methods: {
    goHome() {
      this.$store.state.showSlide = false;
      this.$router.push({ path: "/home/homeData" });
    },
    caseInput() {
      this.$store.state.showSlide = false;
      this.$router.push({ path: "/home/caseInput" });
    },
    caseSearch() {
      this.$store.state.showSlide = false;
      this.$router.push({ path: "/home/caseSearch" });
    },
    test() {
      this.$store.state.showSlide = !this.$store.state.showSlide;
    },
    loadMap: function() {

      var normal = esri.tiledMapLayer({
        url:
          "http://119.3.89.251:6080/arcgis/rest/services/CrimePredict/mas_tilemap/MapServer"
      });
      var light = esri.tiledMapLayer({
        url:
          "	http://119.3.89.251:6080/arcgis/rest/services/CrimePredict/mas_tilemap_black/MapServer"
      });
      var baseLayers = {
        矢量图: normal,
        夜景图: light
      };
      this.$store.state.map = L.map("map", {
        center: [31.77, 118.61],
        zoom: 11,
        layers: [normal],
        continuousWorld: true,
        worldCopyJump: false,
        zoomControl: false
      });

      L.control.layers(baseLayers).addTo(this.$store.state.map);
    }
  },
  components: {
    SiderMenu,
    IconFont,
    WorkPlanet
  }
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-to {
  transform: translateX(-450px);
  transform: 0;
}
.slide-fade-enter {
  transform: translateX(-450px);
  transform: 200px;
}
.header .anticon {
  margin-right: 6px;
  font-size: 55px;
  line-height: px;
  margin-top: 6px;
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.ant-card-actions {
  position: absolute;
  top: 5px;
  right: 0;
}
</style>