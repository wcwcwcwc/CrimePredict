<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="changeTabs">
      <a-tab-pane tab="历史犯罪展示" key="1">
        <a-form v-show="this.$store.state.fanzuidianShow">
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
              v-model="Catvalue"
            >
              <a-select-option value="allCrime">所有犯罪类型</a-select-option>
              <a-select-option value="rushiCrime">盗窃案</a-select-option>
              <a-select-option value="otherCrime">其他犯罪</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 9 }">
            <a-button type="primary" html-type="submit" @click="searchPoint">
              <a-icon type="search" />立即搜索
            </a-button>
          </a-form-item>
        </a-form>
        <Showtable v-show="!this.$store.state.fanzuidianShow" />
      </a-tab-pane>
      <a-tab-pane tab="犯罪动态" key="2" forceRender>
        <PointChange />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import moment from "moment";
import styles from "../../less/table.less";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Showtable from "./Showtable";
import PointChange from "./PointChange"
export default {
  data() {
    return {
      Catvalue: "allCrime",
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
      }
    };
  },
  methods: {
    moment,
    onChange(dates, dateStrings) {
      this.$store.state.fanzuiTimeStart = dateStrings[0];
      this.$store.state.fanzuiTimeEnd = dateStrings[1];
    },
    searchPoint() {
      var point = [];
      this.$store.state.map.setView([31.67, 118.51], 17);
      this.$store.state.crimePoint.addTo(this.$store.state.map);
      setTimeout(() => {
        this.$store.state.test = !this.$store.state.test;
      }, 2000);
      this.$store.state.fanzuidianShow = !this.$store.state.fanzuidianShow;
      var date1 = new Date(this.$store.state.fanzuiTimeStart);
      var date2 = new Date(this.$store.state.fanzuiTimeStart);
    },
    changeTabs() {
      this.$store.state.map.eachLayer(function(layer) {
        if (!layer._container) {
          layer.remove();
        }
      });
      this.$store.state.test = false;
    }
  },
  components: {
    Showtable,
    PointChange
  }
};
</script>
