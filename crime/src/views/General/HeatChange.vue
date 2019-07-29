<template>
  <div>
    <a-form>
      <a-form-item v-bind="formItemLayout" label="请选择开始日期" has-feedback style="width:500px">
        <a-date-picker
          @change="onChange"
          :defaultValue="moment('2018-01-01', dateFormat)"
          v-model="curdate"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="请选择动画方式" has-feedback style="width:500px">
        <a-radio-group v-model="radiovalue">
          <a-radio :value="1">方式一</a-radio>
          <a-radio :value="2">方式二</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <a-button
      class="btnicon"
      shape="circle"
      :icon="player===true? 'pause': 'caret-right'"
      style="font-size:20px;float: left;margin-left: 14px;"
      @click="clickplay"
    ></a-button>

    <div style="margin-left: 15px;font-size: 14px;color: rgba(0, 0, 0, 0.85);">
      现在日期：
      <span style="font-size:20px">{{curtime}}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import * as esri from "esri-leaflet";
import "leaflet.heat";
import "esri-leaflet-heatmap";
import { clearInterval, setTimeout, setInterval } from "timers";
export default {
  data() {
    this.dateFormat = "YYYY-MM-DD";
    return {
      id: "",
      id2:'',
      id3:'',
      all: [],
      data1: [],
      data2: [],
      allDate: [],
      allDate2:[],
      date2: [],
      date3: [],
      date4: [],
      date5: [],
      date6: [],
      date7: [],
      date8: [],
      date9: [],
      date10: [],
      date11: [],
      date12: [],
      indexx: 0,
      radiovalue: 1,
      curdate: moment("2018-01-01", "YYYY-MM-DD"),
      curtime:"2018-01-01",
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
      },
      player: false
    };
  },
  mounted() {
    axios.get("http://localhost:62654/all161718").then(response => {
      var mdata1 = [];
      for (let index = 0; index < response.data.length; index++) {
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-01") {
          this.data1.push([response.data[index].LAT, response.data[index].LNG]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG,
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-02") {
          this.date2.push([response.data[index].LAT, response.data[index].LNG]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-03") {
          this.date3.push([response.data[index].LAT, response.data[index].LNG]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-04") {
          this.date4.push([response.data[index].LAT, response.data[index].LNG]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-05") {
          this.date5.push([response.data[index].LAT, response.data[index].LNG]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-06") {
          this.date6.push([response.data[index].LAT, response.data[index].LNG]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-07") {
          this.date7.push([response.data[index].LAT, response.data[index].LNG]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-08") {
          this.date8.push([response.data[index].LAT, response.data[index].LNG]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-09") {
          this.date9.push([response.data[index].LAT, response.data[index].LNG]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-10") {
          this.date10.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-11") {
          this.date11.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
        if (response.data[index].OCCBEG_DAT.substring(0, 7) == "2018-12") {
          this.date12.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate.push([
            response.data[index].LAT,
            response.data[index].LNG
          ]);
          this.allDate2.push(response.data[index].OCCBEG_DAT.substring(0, 10))
        }
      }
    });
    //this.allDate.push(this.da)

    
  },
  methods: {
    moment,
    // 暂停
    pause() {
      // 清空所有interval
      this.clearIntervals();
    },
    clearIntervals() {
      clearInterval(this.id);
      clearInterval(this.id2);
      clearInterval(this.id3);
    },

    clickplay() {
      console.log(this.allDate);
      this.player = !this.player;
      if (this.radiovalue == 1) {
        this.$store.state.map.eachLayer(function(layer) {
          if (!layer._container) {
            layer.remove();
          }
        });
        var heat = L.heatLayer([], {
          radius: 40,
          opacity: 0.8,
          gradient: {
            0.45: "rgb(0,0,255)",
            0.55: "rgb(0,255,255)",
            0.65: "rgb(0,255,0)",
            0.95: "rgb(255,255,0)",
            1.0: "rgb(255,0,0)"
          }
        }).addTo(this.$store.state.map);

        var index = 0;
        this.id = setInterval(
          () => {
            heat.addLatLng(this.allDate[index]);
            //console.log(this.curtime);
            this.curtime=this.allDate2[index]
            index++;
            if (index >= this.allDate.length - 1) {
              clearInterval(id);
            }
          },
          2,
          this.id2=setTimeout(() => {
            this.id3=setInterval(() => {
              //console.log(index)
              heat.setLatLngs(this.allDate.slice(index - 750, index - 1));
            }, 2);
          }, 10000)
        );
      }
    },
    play() {
      this.$store.state.map.eachLayer(function(layer) {
        if (!layer._container) {
          layer.remove();
        }
      });
      var heat = L.heatLayer([], {
        radius: 40,
        opacity: 0.8,
        gradient: {
          0.45: "rgb(0,0,255)",
          0.55: "rgb(0,255,255)",
          0.65: "rgb(0,255,0)",
          0.95: "rgb(255,255,0)",
          1.0: "rgb(255,0,0)"
        }
      }).addTo(this.$store.state.map);
      heat.setLatLngs(this.data1);
      setTimeout(() => {
        heat.setLatLngs(this.date2);
      }, 200);
      setTimeout(() => {
        heat.setLatLngs(this.date3);
      }, 400);
      setTimeout(() => {
        heat.setLatLngs(this.date4);
      }, 600);
      setTimeout(() => {
        heat.setLatLngs(this.date5);
      }, 800);
      setTimeout(() => {
        heat.setLatLngs(this.date6);
      }, 1000);
      setTimeout(() => {
        heat.setLatLngs(this.date7);
      }, 1200);
      setTimeout(() => {
        heat.setLatLngs(this.date8);
      }, 1400);
      setTimeout(() => {
        heat.setLatLngs(this.date9);
      }, 1600);
      setTimeout(() => {
        heat.setLatLngs(this.date10);
      }, 1800);
      setTimeout(() => {
        heat.setLatLngs(this.date11);
      }, 2000);
      setTimeout(() => {
        heat.setLatLngs(this.date12);
      }, 2200);
    },
    play2() {
      this.$store.state.map.eachLayer(function(layer) {
        if (!layer._container) {
          layer.remove();
        }
      });
      var heat = L.heatLayer([], {
        radius: 40,
        opacity: 0.8,
        gradient: {
          0.45: "rgb(0,0,255)",
          0.55: "rgb(0,255,255)",
          0.65: "rgb(0,255,0)",
          0.95: "rgb(255,255,0)",
          1.0: "rgb(255,0,0)"
        }
      }).addTo(this.$store.state.map);

      var index = 0;
      var id = setInterval(
        () => {
          heat.addLatLng(this.allDate[index]);
          index++;
          if (index >= this.allDate.length - 1) {
            clearInterval(id);
          }
        },
        2,
        setTimeout(() => {
          setInterval(() => {
            //console.log(index)
            heat.setLatLngs(this.allDate.slice(index - 750, index - 1));
          }, 2);
        }, 10000)
      );
    }
  },
  computed: {
    isplay: function() {
      return this.player;
    }
  },
  watch:{
    isplay: function(newV, oldV) {
      //console.log(oldV)
      if(newV==false){
        //console.log("ddddd")
        this.pause()
      }
    }
  }

};
</script>

<style>
</style>
