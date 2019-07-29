<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="changeTabs">
      <a-tab-pane tab="犯罪预测展示" key="1">
        <a-form v-show="this.$store.state.fanzuidianShow">
          <a-form-item v-bind="formItemLayout" label="请选择预测日期" has-feedback style="width:500px">
            <a-month-picker :defaultValue="moment('2015-06', 'YYYY-MM')" />
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
        <!-- <Showtable v-show="!this.$store.state.fanzuidianShow" /> -->
      </a-tab-pane>
      <a-tab-pane tab="案件预警" key="2" forceRender>
        <!-- <PointChange /> -->
        yuce
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import moment from "moment";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as esri from "esri-leaflet";
export default {
  data() {
    return {
      Catvalue: "rushiCrime",
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
      }
    };
  },
  methods: {
    moment,
    searchPoint() {
      this.$store.state.xiaoquuTest.addTo(this.$store.state.map);
    }
  }
};
</script>

<style>
</style>
