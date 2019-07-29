<template>
  <div>
    <div style="padding-top: 10px;">
      <a-row>
        <a-col :style="{ marginBottom: '24px' }">
          <a-card style="height: 130px" :bordered="false">
            <a-row :gutter="24">
              <a-col :span="16">
                <div style="padding-top:10px">
                  <div style="float:left">
                    <a-avatar
                      :size="64"
                      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558452898455&di=080f63ea3ce4f4c4d4aa1e166fc3cf08&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FB%2FB5%2FB5BCD0CA7FF9D1511CA505CA5D47D7FE.jpg"
                    />
                  </div>
                  <div style="float:left；margin-left: 20px;position:absolute;left:100px">
                    <h2>早上好！王警官</h2>
                    <div style="color: rgba(0, 0, 0, 0.45);">空间信息作战部队 | 公安部</div>
                  </div>
                </div>
              </a-col>
              <a-col :span="8" style="padding-top:10px">
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-row>
                      <a-col style="color: rgba(0, 0, 0, 0.45);">管辖区</a-col>
                      <a-col style="color: rgba(0, 0, 0, 0.85);padding-top: 10px;font-size:24px">
                        <div>花山区</div>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="8">
                    <a-row>
                      <a-col style="color: rgba(0, 0, 0, 0.45);">录案数</a-col>
                      <a-col style="color: rgba(0, 0, 0, 0.85);font-size:24px;padding-top: 10px;">
                        <div>33</div>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="8">
                    <a-row>
                      <a-col style="color: rgba(0, 0, 0, 0.45);">访问量</a-col>
                      <a-col style="color: rgba(0, 0, 0, 0.85);font-size:24px;padding-top: 10px;">
                        <div>236</div>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form>
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item
              label="案件类型"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 16}, sm: {span: 17} }"
            >
              <a-select
                defaultValue="盗窃案"
                placeholder="请选择案件类型"
              >
                <a-select-option value="rushiCrime">盗窃案</a-select-option>
                <a-select-option value="otherCrime">其他犯罪</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="发生时间"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 17}, sm: {span: 17} }"
            >
              <a-range-picker
                :ranges="{ '今天': [moment(), moment()], '最近一月': [moment(), moment().startOf('month').subtract(1, 'months')],'最近一年':[moment('2018-01-01'), moment('2018-12-01')] }"
                @change="onChange"
              />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="案件地点"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 16}, sm: {span: 17} }"
            >
              <a-input
                v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入案件地点' }]}
          ]"
                name="name"
                placeholder="请输入案件地点"
              />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-button style="background:rgb(255,177,0)">查询</a-button>
            <a-button style="margin-left: 8px">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
      <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data">
        <a slot="action" slot-scope="text" href="javascript:;">查看详情</a>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import moment from "moment";
const columns = [
  {
    title: "案件编号",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "案件性质",
    dataIndex: "xinzhi",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "案件时间",
    dataIndex: "age"
  },
  {
    title: "案发地点",
    dataIndex: "address"
  },
    {
    title: '操作',
    key: 'operation',
    scopedSlots: { customRender: 'action' },
  },
];
const data = [
  {
    key: "1",
    name: "0985320",
    xinzhi: "入室盗窃",
    age: "2018-07-02",
    address: "安徽省马鞍山市含山县环峰镇*****"
  },
  {
    key: "2",
    name: "0952201",
    xinzhi: "入室盗窃",
    age: "2018-07-03",
    address: "益寿路香港城*****"
  },
  {
    key: "3",
    name: "0942320",
    xinzhi: "入室盗窃",
    age: "2018-07-12",
    address: "和县经济开发区*****"
  },
  {
    key: "4",
    name: "0987412",
    xinzhi: "入室盗窃",
    age: "2018-07-13",
    address: "历阳东路工商银行*****"
  }
];
export default {
  data() {
    return {
      data,
      columns
    };
  },
  methods: {
    moment
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  }
};
</script>

<style>
</style>