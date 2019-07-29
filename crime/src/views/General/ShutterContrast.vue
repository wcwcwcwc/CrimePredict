<template>
  <div>
    <div
      style="height:30px;line-height:30px; text-align:center;font-weight: bold;font-size: 18px"
    >勾选需要比对的地图组</div>
    <a-checkbox-group v-model="value">
      <ul style="list-style:none;display: table;margin-left: -46px;">
        <li class="liStyle" style="margin-top: 16px">
          <span>&nbsp;1</span>&nbsp;&nbsp;
          <a-checkbox value="A" style="font-weight: bold;font-size: 13px">2016年所有犯罪类型热点展示</a-checkbox>
        </li>
        <li class="liStyle">
          <span>&nbsp;2</span>&nbsp;&nbsp;
          <a-checkbox value="B" style="font-weight: bold;font-size: 13px">2017年所有犯罪类型热点展示</a-checkbox>
        </li>
        <li class="liStyle">
          <span>&nbsp;3</span>&nbsp;&nbsp;
          <a-checkbox value="C" style="font-weight: bold;font-size: 13px">2018年所有犯罪类型热点展示</a-checkbox>
        </li>
        <li class="liStyle">
          <span>&nbsp;4</span>&nbsp;&nbsp;
          <a-checkbox value="D" style="font-weight: bold;font-size: 13px">2016年入室盗窃犯罪热点展示</a-checkbox>
        </li>
        <li class="liStyle">
          <span>&nbsp;5</span>&nbsp;&nbsp;
          <a-checkbox value="E" style="font-weight: bold;font-size: 13px">2017年入室盗窃犯罪热点展示</a-checkbox>
        </li>
        <li class="liStyle">
          <span>&nbsp;6</span>&nbsp;&nbsp;
          <a-checkbox value="F" style="font-weight: bold;font-size: 13px">2018年入室盗窃犯罪热点展示</a-checkbox>
        </li>
      </ul>
    </a-checkbox-group>
    <a-button type="primary" style="left: 40%;" @click="start">开始比对</a-button>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as esri from "esri-leaflet";
import "leaflet.heat";
import "esri-leaflet-heatmap";
var sideBySide = require("leaflet-side-by-side");
require("leaflet.sync");
export default {
  data() {
    return {
      value: ["A", "B", "C", "D", "E", "F"],
      value1: true,
      value2: true,
      value3: false,
      value4: false,
      date1: "2018-01-01",
      date2: "2018-12-31",
      date3: "2017-01-01",
      date4: "2017-12-31"
    };
  },
  methods: {
    start() {
      this.$store.state.showSlide = false;
      document.getElementById("map2").style.display = "block";
      document.getElementById("map3").style.display = "block";
      document.getElementById("map4").style.display = "block";
      document.getElementById("map5").style.display = "block";
      document.getElementById("map6").style.display = "block";
      document.getElementById("map1").style.display = "block";
      document.getElementById("map").style.display = "none";
      document.getElementById("map1").style.width = "33.3%";
      document.getElementById("map1").style.height = "345px";
      document.getElementById("map1").style.float = "left";
      document.getElementById("map1").style.boxSizing = "border-box";
      document.getElementById("map1").style.borderRight = "2px dashed blue";
      document.getElementById("map1").style.borderBottom = "2px dashed blue";
      document.getElementById("map2").style.height = "345px";
      document.getElementById("map2").style.width = "33.3%";
      document.getElementById("map2").style.float = "left";
      document.getElementById("map2").style.boxSizing = "border-box";
      document.getElementById("map2").style.borderRight = "2px dashed blue";
      document.getElementById("map2").style.borderBottom = "2px dashed blue";
      document.getElementById("map3").style.height = "345px";
      document.getElementById("map3").style.width = "33.3%";
      document.getElementById("map3").style.float = "left";
      document.getElementById("map3").style.boxSizing = "border-box";
      document.getElementById("map3").style.borderBottom = "2px dashed blue";
      document.getElementById("map4").style.height = "345px";
      document.getElementById("map4").style.width = "33.3%";
      document.getElementById("map4").style.float = "left";
      document.getElementById("map4").style.boxSizing = "border-box";
      document.getElementById("map4").style.borderRight = "2px dashed blue";
      document.getElementById("map5").style.height = "345px";
      document.getElementById("map5").style.width = "33.3%";
      document.getElementById("map5").style.float = "left";
      document.getElementById("map5").style.boxSizing = "border-box";
      document.getElementById("map5").style.borderRight = "2px dashed blue";
      document.getElementById("map6").style.height = "345px";
      document.getElementById("map6").style.width = "33.3%";
      document.getElementById("map6").style.float = "left";
      document.getElementById("map5").style.boxSizing = "border-box";
      document.getElementById("map5").style.borderRight = "2px dashed blue";
      this.$store.state.grey1 = true;
      let map1 = L.map("map1", {
        center: [31.67, 118.51],
        zoom: 12,
        zoomControl: false
      });
      var base2 = esri
        .tiledMapLayer({
          url:
            ""
        })
        .addTo(map1);
      let map2 = L.map("map2", {
        center: [31.67, 118.51],
        zoom: 12,
        zoomControl: false
      });
      var base2 = esri
        .tiledMapLayer({
          url:
            ""
        })
        .addTo(map2);
      let map3 = L.map("map3", {
        center: [31.67, 118.51],
        zoom: 12,
        zoomControl: false
      });
      var base2 = esri
        .tiledMapLayer({
          url:
            ""
        })
        .addTo(map3);
      let map4 = L.map("map4", {
        center: [31.67, 118.51],
        zoom: 12,
        zoomControl: false
      });
      var base2 = esri
        .tiledMapLayer({
          url:
            ""
        })
        .addTo(map4);
      let map5 = L.map("map5", {
        center: [31.67, 118.51],
        zoom: 12,
        zoomControl: false
      });
      var base2 = esri
        .tiledMapLayer({
          url:
            ""
        })
        .addTo(map5);
      let map6 = L.map("map6", {
        center: [31.67, 118.51],
        zoom: 12,
        zoomControl: false
      });
      var base2 = esri
        .tiledMapLayer({
          url:
            ""
        })
        .addTo(map6);

      //热力图
      var hot1 = esri
        .featureLayer({
          url:
            ""
        })
        .query()
        .where("OCCBEG_DAT > '2016-01-01' and OCCBEG_DAT<'2016-12-31'")
        .run((error, featureCollection) => {
          L.heatLayer(
            featureCollection.features.map(e => {
              return e.geometry.coordinates.reverse();
            }),
            { radius: 40 }
          ).addTo(map1);
        });
      var hot2 = esri
        .featureLayer({
          url:
            ""
        })
        .query()
        .where("OCCBEG_DAT > '2017-01-01' and OCCBEG_DAT<'2017-12-31'")
        .run((error, featureCollection) => {
          L.heatLayer(
            featureCollection.features.map(e => {
              return e.geometry.coordinates.reverse();
            }),
            { radius: 40 }
          ).addTo(map2);
        });
      var hot3 = esri
        .featureLayer({
          url:
            ""
        })
        .query()
        .where("OCCBEG_DAT > '2018-01-01' and OCCBEG_DAT<'2018-12-31'")
        .run((error, featureCollection) => {
          L.heatLayer(
            featureCollection.features.map(e => {
              return e.geometry.coordinates.reverse();
            }),
            { radius: 40 }
          ).addTo(map3);
        });
      var hot4 = esri
        .featureLayer({
          url:
            ""
        })
        .query()
        .where(
          "OCCBEG_DAT > '2016-01-01' and OCCBEG_DAT<'2016-12-31' and CRIME_TYPE='盗窃,入室盗窃'"
        )
        .run((error, featureCollection) => {
          L.heatLayer(
            featureCollection.features.map(e => {
              return e.geometry.coordinates.reverse();
            }),
            { radius: 40 }
          ).addTo(map4);
        });
      var hot5 = esri
        .featureLayer({
          url:
            ""
        })
        .query()
        .where(
          "OCCBEG_DAT > '2017-01-01' and OCCBEG_DAT<'2017-12-31' and CRIME_TYPE='盗窃,入室盗窃'"
        )
        .run((error, featureCollection) => {
          L.heatLayer(
            featureCollection.features.map(e => {
              return e.geometry.coordinates.reverse();
            }),
            { radius: 40 }
          ).addTo(map5);
        });
      var hot6 = esri
        .featureLayer({
          url:
            ""
        })
        .query()
        .where(
          "OCCBEG_DAT > '2018-01-01' and OCCBEG_DAT<'2018-12-31' and CRIME_TYPE='盗窃,入户盗窃'"
        )
        .run((error, featureCollection) => {
          L.heatLayer(
            featureCollection.features.map(e => {
              return e.geometry.coordinates.reverse();
            }),
            { radius: 40 }
          ).addTo(map6);
        });
      /*       var maps = [map1, map2, map3, map4, map5, map6];
      function maplink(e) {
        var _this = this;
        maps.map(function(t) {
          t.setView(_this.getCenter(), _this.getZoom());
        });
      }

      maps.map(function(t) {
        t.on({ drag: maplink, zoom: maplink });
      }); */
      map1.sync(map2, { syncCursor: true });
      map1.sync(map3, { syncCursor: true });
      map1.sync(map4, { syncCursor: true });
      map1.sync(map5, { syncCursor: true });
      map1.sync(map6, { syncCursor: true });
      map2.sync(map1, { syncCursor: true });
      map2.sync(map3, { syncCursor: true });
      map2.sync(map4, { syncCursor: true });
      map2.sync(map5, { syncCursor: true });
      map2.sync(map6, { syncCursor: true });
      map3.sync(map1, { syncCursor: true });
      map3.sync(map2, { syncCursor: true });
      map3.sync(map4, { syncCursor: true });
      map3.sync(map5, { syncCursor: true });
      map3.sync(map6, { syncCursor: true });
      map4.sync(map1, { syncCursor: true });
      map4.sync(map2, { syncCursor: true });
      map4.sync(map3, { syncCursor: true });
      map4.sync(map5, { syncCursor: true });
      map4.sync(map6, { syncCursor: true });
      map5.sync(map1, { syncCursor: true });
      map5.sync(map2, { syncCursor: true });
      map5.sync(map3, { syncCursor: true });
      map5.sync(map4, { syncCursor: true });
      map5.sync(map6, { syncCursor: true });
      map6.sync(map1, { syncCursor: true });
      map6.sync(map2, { syncCursor: true });
      map6.sync(map3, { syncCursor: true });
      map6.sync(map4, { syncCursor: true });
      map6.sync(map5, { syncCursor: true });
    },
    clear() {
      this.$store.state.grey1 = false;
      document.getElementById("map").style.display = "block";
      document.getElementById("map2").style.display = "none";
      document.getElementById("map3").style.display = "none";
      document.getElementById("map4").style.display = "none";
      document.getElementById("map5").style.display = "none";
      document.getElementById("map6").style.display = "none";
      document.getElementById("map1").style.display = "none";
    },
    showHeat(arr) {}
  },
  beforeDestory() {}
};
</script>

<style scoped>
.liStyle {
  height: 30px;
  background-color: #ddd;
  line-height: 30px;
  border-radius: 8px;
  margin: 6px;
  width: 400px;
}
</style>
