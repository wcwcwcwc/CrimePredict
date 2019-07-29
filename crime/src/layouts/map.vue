<template>
  <div>
    <div id="map" style="height:690px;"></div>
    <div id="map1"></div>
    <div
      id="greyDiv1"
      v-if="this.$store.state.grey1"
      style="width: 170px;
    height: 35px;
    z-index: 1000;
    background-color: rgba(245,245,245,0.9);
    position: absolute;
    left: 24.5%;
    top: 46%;
    border-radius: 8px;
    text-align: center;
    line-height: 35px;"
    >
      <span id="span1" style="font-size: 14px;
    font-weight: bold;">2016年所有犯罪类型</span>
    </div>
    <div
      id="greyDiv2"
      v-if="this.$store.state.grey1"
      style="    width: 170px;
    height: 35px;
    z-index: 1000;
    position: absolute;
    background-color: rgba(245, 245, 245, 0.9);
    top: 46%;
    left: 52.5%;
    border-radius: 8px;
    line-height: 35px;
    text-align: center;"
    >
      <span id="span1" style="font-size: 14px;
    font-weight: bold;">2017年所有犯罪类型</span>
    </div>
    <div
      id="greyDiv3"
      v-if="this.$store.state.grey1"
      style="    width: 170px;
    height: 35px;
    z-index: 1000;
    position: absolute;
    background-color: rgba(245, 245, 245, 0.9);
    top: 46%;
    left: 81.5%;
    border-radius: 8px;
    line-height: 35px;
    text-align: center;"
    >
      <span id="span1" style="font-size: 14px;
    font-weight: bold;">2018年所有犯罪类型</span>
    </div>
    <div
      id="greyDiv4"
      v-if="this.$store.state.grey1"
      style="    width: 170px;
    height: 35px;
    z-index: 1000;
    position: absolute;
    background-color: rgba(245, 245, 245, 0.9);
    top: 92%;
    left: 24.5%;
    border-radius: 8px;
    line-height: 35px;
    text-align: center;"
    >
      <span id="span1" style="font-size: 14px;
    font-weight: bold;">2016年入室盗窃类型</span>
    </div>
    <div
      id="greyDiv5"
      v-if="this.$store.state.grey1"
      style="    width: 170px;
    height: 35px;
    z-index: 1000;
    position: absolute;
    background-color: rgba(245, 245, 245, 0.9);
    top: 92%;
    left: 52.5%;
    border-radius: 8px;
    line-height: 35px;
    text-align: center;"
    >
      <span id="span1" style="font-size: 14px;
    font-weight: bold;">2017年入室盗窃类型</span>
    </div>
    <div
      id="greyDiv6"
      v-if="this.$store.state.grey1"
      style="    width: 170px;
    height: 35px;
    z-index: 1000;
    position: absolute;
    background-color: rgba(245, 245, 245, 0.9);
    top: 92%;
    left: 81.5%;
    border-radius: 8px;
    line-height: 35px;
    text-align: center;"
    >
      <span id="span1" style="font-size: 14px;
    font-weight: bold;">2018年入室盗窃类型</span>
    </div>
    <div id="map2"></div>
    <div id="map3"></div>
    <div id="map4"></div>
    <div id="map5"></div>
    <div id="map6"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "../less/table.less";
import * as esri from "esri-leaflet";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.loadMap();
    });
  },
  methods: {
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
      this.$store.state.crimePoint = esri.featureLayer({
        url:
          "",
        pointToLayer: function(geojson, latlng) {
          return L.circleMarker(latlng);
        },
        style: {
          color: "#5B7CBA",
          weight: 1,
          opacity: 0.85,
          fillOpacity: 0.5
        }
      });
      this.$store.state.allManShan = esri.featureLayer({
        url:
          ""
      });
      this.$store.state.xiaoquuTest = esri.featureLayer({
        url:
          "",
        simplifyFactor: 0.5,
        precision: 5,
        style: function(feature) {
          if (feature.properties.Predi >= 0 && feature.properties.Predi <= 20) {
            return { color: "grey", weight: 2 };
          } else if (
            feature.properties.Predi >= 21 &&
            feature.properties.Predi <= 50
          ) {
            return { color: "green", weight: 2 };
          } else if (
            feature.properties.Predi >= 101 &&
            feature.properties.Predi <= 150
          ) {
            return { color: "yellow", weight: 2 };
          } else {
            return { color: "red", weight: 2 };
          }
        }
      });
      this.$store.state.crimePoint.bindPopup(function(layer) {
        return L.Util.template(
          `犯罪日期：{OCCBEG_DAT}<br>犯罪类型: {CRIME_TYPE}<br>犯罪地点: {AFDD }`,
          layer.feature.properties
        );
      });
    }
  }
};
</script>

<style>
</style>
