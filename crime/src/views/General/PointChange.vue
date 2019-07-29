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
        <a-radio-group  v-model="leftletMap.visway">
          <a-radio :value="1">方式一</a-radio>
          <a-radio :value="2">方式二</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <a-button
      class="btnicon"
      shape="circle"
      :icon="leftletMap.play===true? 'pause': 'caret-right'"
      style="font-size:20px;float: left;margin-left: 14px;"
      @click="clickplay"
    ></a-button>
    <div style="height:60px">
      <a-button
        shape="circle"
        icon="retweet"
        style="font-size:20px;float: left;margin-left: 10px;"
        @click="leftletMap.replay=!leftletMap.replay;leftletMap.play=true;"
      ></a-button>
      <a-slider
        style="width:200px;float: left;margin-left: 20px;"
        v-model="persent"
        class="slider"
        :min="0"
        :max="100"
        :step="0.01"
        :tipFormatter="formatTooltip"
        @change="changeTimeline"
      />
    </div>

    <div style="margin-left: 15px;font-size: 14px;color: rgba(0, 0, 0, 0.85);">
      现在日期：
      <span style="font-size:20px">{{leftletMap.curtime}}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import L from "leaflet";
/* import styles from "../../less/icon.less"; */
export default {
  data() {
    this.dateFormat = "YYYY-MM-DD";
    return {
      radiovalue: 1,
      curdate: moment('2018-01-01', 'YYYY-MM-DD'),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
      },
      DateAll: [],
      persent: 0,
      leftletMap: {
        allGeogWithDateData: [],
        allGeogWithTimeData: null,
        geogWithDateData: null,
        geogWithTimeData: null,
        flag: false,
        visway: 1,
        play: false,
        replay: false,
        curtime: null
      },
      markers: [],
      deletedMarkers: [],
      groupLayer: null,
      addIntervals: [],
      deleteIntervals: [],
      myPersent: 0,
      status: 0 //0:第一次播放, 1:正常播放, 2：拖拽时间轴后播放
    };
  },
  created: function() {
    this.$root.eventHub.$on("timeline-changes", this.timelineChanges);
    this.$root.eventHub.$on("curtime-changes", this.curtimeChanges);
    this.$root.eventHub.$on("change-timeline", this.changeTimeline2);
  },
  mounted: function() {
    this.$nextTick(() => {
      axios
        .get("http://localhost:8086/point2018.txt")
        .then(response => {
          this.leftletMap.allGeogWithDateData = response.data.split("\n");
          this.leftletMap.allGeogWithTimeData = response.data.split("\n");
          this.leftletMap.geogWithDateData = this.leftletMap.allGeogWithDateData.filter(
            d =>
              new Date(d.substring(0, 10)).getTime() >=
              new Date(this.curdate).getTime()
          );
          this.leftletMap.geogWithTimeData = this.leftletMap.allGeogWithDateData.filter(
            d =>
              new Date(d.substring(0, 10)).getTime() >=
              new Date(this.curdate).getTime()
          );
          this.leftletMap.flag = true;
          this.leftletMap.curtime =
            this.leftletMap.geogWithTimeData[0].split(" ")[0] || "";
          //console.log(this.leftletMap.curtime);
        })
        .catch(error => {
          console.error(error);
        });
      this.addGroupLayer();
      this.clearMarkers();
    });
  },
  beforeDestroy() {
    this.$root.eventHub.$off("timeline-changes", this.timelineChanges);
    this.$root.eventHub.$off("curtime-changes", this.curtimeChanges);
    this.$root.eventHub.$off("change-timeline", this.changeTimeline2);
  },
  methods: {
    moment,
    onChange(dates, dateStrings) {},
    clickplay() {
      this.$store.state.map.flyTo([31.68, 118.49], 13);
      this.leftletMap.play = !this.leftletMap.play;
      this.addGroupLayer();
      /* console.log(moment(this.curdate).format("YYYY-MM-DD")) */
    },
    formatTooltip(val) {
      return val + "%";
    },
    changeTimeline(val) {
      //console.log("这是改变的："+val)
      this.persent = val;
      this.$root.eventHub.$emit("change-timeline", { persent: this.persent });
    },
    curtimeChanges(val) {
      this.leftletMap.curtime = val.curtime;
    },
    timelineChanges(val) {
      this.persent = val.persent;
    },
    addGroupLayer() {
      this.groupLayer = new L.LayerGroup();
      //console.log(this.map);
      this.$store.state.map.addLayer(this.groupLayer);
    },
    addMarkers(dataset) {
      let markers = [];
      dataset.forEach(d => {
        let arr = d.split(" ");
        let date = arr[0];
        let longitude = parseFloat(arr[1].split(",")[0]);
        let latitude = parseFloat(arr[1].split(",")[1]);
        let marker = L.circle([latitude, longitude], {
          color: "blue",
          opacity: 0.05,
          radius: 50
        });
        markers.push(marker);
        // this.groupLayer.addLayer(marker);
      });
      return markers;
    },
    // 将marker添加到layer
    addMarkersDirectToLayer(markers) {
      markers.forEach(d => {
        this.groupLayer.addLayer(d);
      });
    },
    // 直接根据原始数据创建marker，添加到markers中，再添加入layer中
    addMapLayersToLayer(dataset) {
      dataset.forEach(d => {
        let arr = d.split(" ");
        let date = arr[0];
        let longitude = parseFloat(arr[1].split(",")[0]);
        let latitude = parseFloat(arr[1].split(",")[1]);
        // console.log(longitude, latitude)
        // L.marker([longitude, latitude]).addTo(this.map);
        // L.circle([latitude, longitude], {
        //    color: 'blue',
        //    // fillColor: 'red',
        //    opacity: 0.05,
        //    radius: 50
        // }).addTo(this.map);
        let marker = L.circle([latitude, longitude], {
          color: "blue",
          opacity: 0.05,
          radius: 50
        });
        this.markers.push(marker);
        this.groupLayer.addLayer(marker);
      });
    },
    clearMarkers() {
      this.groupLayer.clearLayers();
      this.markers = [];
      this.deletedMarkers = [];
    },
    addMarkersWithTimeline(dataset, startIndex) {
      let size = dataset.length;
      let groupLayer = this.groupLayer;
      let markers = this.markers;

      let addInterval = setInterval(function() {
        if (startIndex === size) {
          clearInterval(addInterval);
          return;
        }
        //do whatever here...
        let d = dataset[startIndex];
        let arr = d.split(" ");
        let time = arr[0];
        let longitude = parseFloat(arr[1].split(",")[0]);
        let latitude = parseFloat(arr[1].split(",")[1]);
        let marker = L.circle([latitude, longitude], {
          color: "blue",
          opacity: 0.05,
          radius: 50
        });
        markers.push(marker);
        groupLayer.addLayer(marker);
        this.markers = markers;
        this.groupLayer = groupLayer;
        startIndex = startIndex + 1;
      }, 0.01);
      this.addIntervals.push(addInterval);
    },
    deleteMarkersWithTimeline(dataset, startIndex) {
      let size = dataset.length;
      let groupLayer = this.groupLayer;
      let markers = this.markers;
      let deletedMarkers = this.deletedMarkers;
      let deleteInterval = setInterval(function() {
        if (startIndex === size) {
          clearInterval(deleteInterval);
          return;
        }
        //do whatever here...
        if (deletedMarkers.length < markers.length) {
          groupLayer.removeLayer(markers[startIndex]);
          deletedMarkers.push(markers[startIndex]);
          this.deletedMarders = deletedMarkers;
          this.groupLayer = groupLayer;
          startIndex = startIndex + 1;
        }
      }, 0.015);
      this.deleteIntervals.push(deleteInterval);
      // console.log(deleteInterval);
    },
    sleep(n) {
      let start = new Date().getTime();
      let flag = true;
      //  console.log('休眠前：' + start);
      while (flag) {
        if (new Date().getTime() - start > n) {
          flag = false;
        }
      }
    },
    play(way) {
      let flag = true;
      while (flag) {
        if (
          this.datasetWithTime !== null &&
          this.datasetWithTime !== undefined
        ) {
          flag = false;
        }
      }
      let startIndex = 0;
      if (this.status === 0) {
        //第一次播放 this.markers.length === this.defaultData.length
        // 第一次Play，清空原始所有marker，开始播放
        this.status = 1;
        this.clearMarkers();
        this.addMarkersWithTimeline(this.datasetWithTime, startIndex);
        if (way === "2") {
          // console.log('addMarkers, deletedMarkers:' + startIndex + ',' + this.deletedMarkers.length);
          // 一段时间后开始删除点
          setTimeout(
            this.deleteMarkersWithTimeline,
            10000,
            this.datasetWithTime,
            this.deletedMarkers.length
          );
        }
      } else if (this.status === 1) {
        // 正常播放
        // 正常播放，不需要清除点, 立即添加或删除
        startIndex = this.markers.length;
        this.addMarkersWithTimeline(this.datasetWithTime, startIndex);
        if (way === "2") {
          console.log(
            "addMarkers, deletedMarkers:" +
              startIndex +
              "," +
              this.deletedMarkers.length
          );
          this.deleteMarkersWithTimeline(
            this.datasetWithTime,
            this.deletedMarkers.length
          );
        }
      } else if (this.status === 2) {
        //拖动timeline
        // 拖动timeline, 如果是way2, 5s后开始删除点
        this.status = 1;
        startIndex = this.markers.length;
        this.addMarkersWithTimeline(this.datasetWithTime, startIndex);
        if (way === "2") {
          // console.log('addMarkers, deletedMarkers:' + startIndex + ',' + this.deletedMarkers.length);
          setTimeout(
            this.deleteMarkersWithTimeline,
            10000,
            this.datasetWithTime,
            this.deletedMarkers.length
          );
        }
      }
    },
    // 暂停
    pause(way) {
      // 清空所有interval
      this.clearIntervals();
    },
    // 重播
    rePlay(way) {
      // 清空所有点和interval，开始播放
      this.clearMarkers();
      this.clearIntervals();
      let flag = true;
      while (flag) {
        if (
          this.datasetWithTime !== null &&
          this.datasetWithTime !== undefined
        ) {
          flag = false;
        }
      }
      this.addMarkersWithTimeline(this.datasetWithTime, 0);
      if (way === "2") {
        setTimeout(
          this.deleteMarkersWithTimeline,
          5000,
          this.datasetWithTime,
          0
        );
      }
    },
    // 清除所有interval
    clearIntervals() {
      console.log("interval:" + this.addIntervals + "|" + this.deleteIntervals);
      if (this.addIntervals) {
        this.addIntervals.forEach(d => {
          clearInterval(d);
        });
      }
      if (this.deleteIntervals) {
        this.deleteIntervals.forEach(d => {
          clearInterval(d);
        });
      }
      this.addIntervals = [];
      this.deleteIntervals = [];
    },
    // 拖拽时间轴
    changeTimeline2(val) {
      this.pause(this.leftletMap.visway); //暂停
      this.clearMarkers();
      let startIndex = Math.floor(
        parseFloat(val.persent / 100) * this.datasetWithTime.length
      );
      console.log(
        "changeTimeline: " + startIndex + "," + parseFloat(val.persent / 100)
      );
      if (this.visway === "1") {
        this.addMapLayersToLayer(this.datasetWithTime.slice(0, startIndex));
        // this.myPersent = val.persent;
      } else if (this.visway === "2") {
        this.markers = this.addMarkers(
          this.datasetWithTime.slice(0, startIndex)
        );
        this.deletedMarkers = this.addMarkers(
          this.datasetWithTime.slice(0, startIndex)
        );
      }
      this.status = 2; // 置于推拽状态
      if (this.leftletMap.isplay) {
        this.play(this.leftletMap.visway); //播放
      }
    }
  },
  computed: {
    defaultData: function() {
      return this.leftletMap.geogWithDateData;
    },
    datasetWithTime: function() {
      return this.leftletMap.geogWithTimeData;
    },
    isplay: function() {
      return this.leftletMap.play;
    },
    replay: function() {
      return this.leftletMap.replay;
    },
    visway: function() {
      return this.leftletMap.visway;
    }
  },
  watch: {
    curdate: function(newV, oldV) {
      this.leftletMap.geogWithDateData = this.leftletMap.allGeogWithDateData.filter(
        d =>
          new Date(d.substring(0, 10)).getTime() >=
          new Date(moment(newV).format("YYYY-MM-DD")).getTime()
      );
      this.leftletMap.geogWithTimeData = this.leftletMap.allGeogWithDateData.filter(
        d =>
          new Date(d.substring(0, 10)).getTime() >=
          new Date(moment(newV).format("YYYY-MM-DD")).getTime()
      );
    },

    defaultData: function(newV, oldV) {
      this.$store.state.map.eachLayer(function(layer) {
        if (!layer._container) {
          layer.remove();
        }
      });
      //console.log(newV.length);
      this.clearMarkers();
      //console.log("gaibian")
      //this.addMapLayersToLayer(newV);
    },
    datasetWithTime: function(newV, oldV) {
      // console.log(newV.length)
      this.status = 0;
    },
    isplay: function(newV, oldV) {
      console.log("isplay:" + newV);
      if (newV) {
        this.play(this.leftletMap.visway);
      } else {
        this.pause(this.leftletMap.visway);
      }
    },
    replay: function(newV, oldV) {
      console.log("replay:" + newV);
      this.rePlay(this.leftletMap.visway);
    },
    visway: function(newV, oldV) {
      this.clearMarkers();
      this.addMapLayersToLayer(this.leftletMap.geogWithDateData);
      this.clearIntervals();
      this.status = 0;
    },
    deleteIntervals: function(newV, oldV) {
      if (this.leftletMap.play === false && newV.length !== 0) {
        this.deleteIntervals.forEach(d => {
          clearInterval(d);
        });
      } else if (this.leftletMap.play === true && newV.length > 1) {
        this.deleteIntervals.forEach((d, i) => {
          if (i < newV.length - 1) {
            clearInterval(d);
          }
        });
      }
    },
    myPersent: function(newV, oldV) {
      // console.log("mypresent:", newV);
      this.$root.eventHub.$emit("timeline-changes", {
        persent: parseFloat(newV)
      });
    },
    // markers变化，更新curtime
    markers: function(newV, oldV) {
      //console.log("update marsers............");
      // 第一次播放，使时间轴值为0
      if (this.status === 0) {
        //console.log("first play....");
        this.myPersent = 0;
        if (this.datasetWithTime) {
          this.$root.eventHub.$emit("curtime-changes", {
            curtime: this.datasetWithTime[0].split(" ")[0] || ""
          });
        }
      } else {
        //newV.length !== this.datasetWithTime.length
        // 计算百分比，更新时间轴值和curtime
        let result = (newV.length / this.datasetWithTime.length) * 100;
        this.myPersent = result.toFixed(2);
        this.$root.eventHub.$emit("curtime-changes", {
          curtime: this.datasetWithTime[newV.length].split(" ")[0] || ""
        });
      }
    }
  }
};
</script>

<style>
</style>
