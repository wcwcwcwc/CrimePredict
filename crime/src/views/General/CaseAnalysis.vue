<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="changeTabs">
      <a-tab-pane tab="热点分析" key="1">
        <a-form>
          <a-form-item v-bind="formItemLayout" label="请选择日期范围" has-feedback style="width:500px">
            <a-range-picker
              :ranges="{ '今天': [moment(), moment()], '最近一月': [moment(), moment().startOf('month').subtract(1, 'months')],'最近一年':[moment('2018-01-01'), moment('2018-12-01')] }"
              @change="onChange"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="请选择犯罪类型" has-feedback style="width:500px">
            <a-select
              defaultValue="所有犯罪类型"
              style="width:200px"
              v-decorator="[
          'select',
          {rules: [{ required: true, message: '请选择犯罪类型' }]}
        ]"
              placeholder="请选择犯罪类型"
              v-model="value"
            >
              <a-select-option value="allCrime">所有犯罪类型</a-select-option>
              <a-select-option value="盗窃,入户盗窃">盗窃,入户盗窃</a-select-option>
              <a-select-option value="其他案件">其他案件</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="请选择分析类型" has-feedback style="width:500px">
            <a-radio-group v-model="value2">
              <a-radio :value="1">热力图</a-radio>
              <a-radio :value="2">聚类分析</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 9 }">
            <a-button type="primary" html-type="submit" @click="searchPoint">
              <a-icon type="search" />立即搜索
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="对比分析" key="2" forceRender>
        <ShutterContrast />
      </a-tab-pane>
      <a-tab-pane tab="热点动态" key="3" forceRender>
        <testChange/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import moment from "moment";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import * as esri from "esri-leaflet";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster";
import "esri-leaflet-cluster";
import "leaflet.heat";
import "esri-leaflet-heatmap";
import ShutterContrast from "./ShutterContrast";
import testChange from './testChange'
export default {
  data() {
    return {
      value: "allCrime",
      value2: 1,
      date1: "",
      date2: "",
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
      }
    };
  },
  methods: {
    moment,
    onChange(dates, dateStrings) {
      //console.log(dateStrings[0], dateStrings[1]);
      this.date1 = dateStrings[0];
      this.date2 = dateStrings[1];
      //console.log(this.date1,this.date2);
    },
    searchPoint() {
      this.$store.state.grey1 = false;
      document.getElementById("map").style.display = "block";
      document.getElementById("map2").style.display = "none";
      document.getElementById("map3").style.display = "none";
      document.getElementById("map4").style.display = "none";
      document.getElementById("map5").style.display = "none";
      document.getElementById("map6").style.display = "none";
      document.getElementById("map1").style.display = "none";
      this.$store.state.map.setView([31.68, 118.19], 10);
      this.$store.state.map.eachLayer(function(layer) {
        if (!layer._container) {
          layer.remove();
        }
      });
      let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
      });
      L.Marker.prototype.options.icon = DefaultIcon;
      var markers = L.markerClusterGroup();
      console.log(this.date1, this.date2, this.value, this.value2);
      if (this.value2 == 1) {
        if (this.value == "allCrime") {
          esri
            .featureLayer({
              url:
                ""
            })
            .query()
            .where(
              "OCCBEG_DAT>'" +
                this.date1 +
                "' and OCCBEG_DAT<'" +
                this.date2 +
                "'"
            )
            .run((error, featureCollection) => {
              L.heatLayer(
                featureCollection.features.map(e => {             
                  return e.geometry.coordinates.reverse();
                }),
                { radius: 40 }
              ).addTo(this.$store.state.map);
            });
        } else {
          esri
            .featureLayer({
              url:
                ""
            })
            .query()
            .where(
              "OCCBEG_DAT>'" +
                this.date1 +
                "' and OCCBEG_DAT<'" +
                this.date2 +
                "' and CRIME_TYPE='" +
                this.value +
                "'"
            )
            .run((error, featureCollection) => {
              L.heatLayer(
                featureCollection.features.map(e => {
                  return e.geometry.coordinates.reverse();
                })
              ).addTo(this.$store.state.map);
            });
        }
      }
      if (this.value2 == 2) {
        if (this.value == "allCrime") {
          esri
            .featureLayer({
              url:
                ""
            })
            .query()
            .where(
              "OCCBEG_DAT>'" +
                this.date1 +
                "' and OCCBEG_DAT<'" +
                this.date2 +
                "'"
            )
            .run((error, featureCollection) => {
              console.log(featureCollection);
              featureCollection.features.map(e => {
                //var title = e.properties.OCCBEG_DAT;
                var title = {
                  time: e.properties.OCCBEG_DAT,
                  type: e.properties.CRIME_TYPE,
                  area: e.properties.AFDD
                };
                var marker = L.marker(
                  new L.LatLng(
                    e.geometry.coordinates[1],
                    e.geometry.coordinates[0]
                  ),
                  { title: title }
                );
                marker.bindPopup(
                  "犯罪时间：" +
                    title.time +
                    "<br/>" +
                    "犯罪类型：" +
                    title.type +
                    "<br/>" +
                    "犯罪地点：" +
                    title.area
                );
                markers.addLayer(marker);
              });
            });
          this.$store.state.map.addLayer(markers);
        } else {
          esri
            .featureLayer({
              url:
                ""
            })
            .query()
            .where(
              "OCCBEG_DAT>'" +
                this.date1 +
                "' and OCCBEG_DAT<'" +
                this.date2 +
                "' and CRIME_TYPE='" +
                this.value +
                "'"
            )
            .run((error, featureCollection) => {
              console.log(featureCollection);
              featureCollection.features.map(e => {
                var title = {
                  time: e.properties.OCCBEG_DAT,
                  type: e.properties.CRIME_TYPE,
                  area: e.properties.AFDD
                };
                var marker = L.marker(
                  new L.LatLng(
                    e.geometry.coordinates[1],
                    e.geometry.coordinates[0]
                  ),
                  { title: title }
                );
                marker.bindPopup(
                  "犯罪时间：" +
                    title.time +
                    "<br/>" +
                    "犯罪类型：" +
                    title.type +
                    "<br/>" +
                    "犯罪地点：" +
                    title.area
                );
                markers.addLayer(marker);
              });
            });
          this.$store.state.map.addLayer(markers);
        }
      }
    },
    changeTabs() {
      if (document.getElementById("map").style.display == "none") {
        this.$store.state.grey1 = false;
        document.getElementById("map").style.display = "block";
        document.getElementById("map2").style.display = "none";
        document.getElementById("map3").style.display = "none";
        document.getElementById("map4").style.display = "none";
        document.getElementById("map5").style.display = "none";
        document.getElementById("map6").style.display = "none";
        document.getElementById("map1").style.display = "none";
      }
      this.$store.state.map.eachLayer(function(layer) {
        if (!layer._container) {
          layer.remove();
        }
      });
    }
  },
  components: {
    ShutterContrast,
    testChange
  }
};
</script>
