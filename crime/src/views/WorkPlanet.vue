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
    <div style="padding: 20px; padding-top:0;padding-bottom:0">
      <a-row :gutter="24">
        <a-col :style="{ marginBottom: '24px' }" :span="16" :xs="24" :md="16" :xl="16">
          <a-row>
            <a-col :style="{ marginBottom: '24px' }">
              <a-card style="height: 300px" title="本月犯罪动态" class="chart">
                <Chart :option="chartOption" style="height:260px" />
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col :style="{ marginBottom: 0 }">
              <a-card style="height: 400px" title="本月犯罪细目">
                <a-table
                  class="table"
                  :columns="columns"
                  :dataSource="data"
                  bordered
                  :pagination="pagination"
                  style="height:300px"
                  size="small"
                />
              </a-card>
            </a-col>
          </a-row>
        </a-col>
        <a-col :style="{ marginBottom: '24px' }" :span="8" :xs="24" :md="8" :xl="8">
          <a-row>
            <a-col :style="{ marginBottom: '24px' }">
              <a-card style="height: 150px" class="chart">
                <a-tabs defaultActiveKey="1" >
                  <a-tab-pane tab="入室盗窃" key="1">
                    <Chart :option="chartOption2" style="height:100px" />
                  </a-tab-pane>
                  <a-tab-pane tab="盗窃非机动车" key="2" forceRender>
                    <Chart :option="chartOption3" style="height:100px" />
                  </a-tab-pane>
                  <a-tab-pane tab="其他盗窃" key="3">
                    <Chart :option="chartOption1" style="height:100px" />
                  </a-tab-pane>
                  <a-tab-pane tab="其他" key="4">
                    <Chart :option="chartOption4" style="height:100px" />
                  </a-tab-pane>
                </a-tabs>
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col :style="{ marginBottom: '24px' }">
              <a-card style="height: 250px" title="高事发小区" class="chart">
                <rank-list :list="rankList" />
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col :style="{ marginBottom: '24px' }">
              <a-card style="height: 280px">
                <Chart :option="chartOption6" style="height:220px"/>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import Chart from "../layouts/Chart.vue";
import RankList from "../components/RankList.vue";
require("echarts-wordcloud");
import styles from "../less/chart.less";
const rankList = [
  {
    name: "安粮城市广场",
    total: 16
  },
  {
    name: "半山花园",
    total: 14
  },
  {
    name: "碧桂嘉苑",
    total: 11
  },
  {
    name: "春晖家园-西区",
    total: 8
  },
  {
    name: "慈湖马巷口",
    total: 6
  }
];
export default {
  data() {
    return {
      rankList,
      chartOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["其他", "其他盗窃", "入室盗窃", "盗窃非机动车"],
          x: "30"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "20190501",
              "20190502",
              "20190503",
              "20190504",
              "20190505",
              "20190506",
              "20190507",
              "20190508",
              "20190509",
              "20190510",
              "20190511",
              "20190512",
              "20190513",
              "20190514",
              "20190515",
              "20190516",
              "20190517",
              "20190518",
              "20190519",
              "20190520",
              "20190521",
              "20190522",
              "20190523",
              "20190524",
              "20190525",
              "20190526",
              "20190527",
              "20190528",
              "20190529",
              "20190530",
              "20190531"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "其他",
            type: "bar",
            stack: "广告",
            data: [
              4,
              4,
              1,
              4,
              4,
              2,
              5,
              4,
              5,
              4,
              3,
              1,
              4,
              4,
              2,
              5,
              6,
              4,
              2,
              0,
              5,
              4,
              4,
              4,
              2,
              5,
              3,
              4,
              4,
              2,
              5
            ]
          },
          {
            name: "其他盗窃",
            type: "bar",
            stack: "广告",
            data: [
              6,
              5,
              5,
              3,
              6,
              5,
              3,
              5,
              5,
              5,
              4,
              5,
              0,
              5,
              5,
              4,
              2,
              5,
              2,
              5,
              5,
              4,
              5,
              3,
              4,
              0,
              4,
              2,
              4,
              5,
              5
            ]
          },
          {
            name: "入室盗窃",
            type: "bar",
            stack: "广告",
            data: [
              0,
              1,
              0,
              2,
              0,
              0,
              0,
              0,
              1,
              0,
              2,
              0,
              2,
              2,
              2,
              0,
              0,
              1,
              0,
              2,
              0,
              1,
              1,
              0,
              1,
              2,
              2,
              1,
              1,
              0,
              1
            ]
          },
          {
            name: "盗窃非机动车",
            type: "bar",
            stack: "广告",
            data: [
              1,
              1,
              1,
              2,
              1,
              0,
              1,
              2,
              0,
              1,
              0,
              0,
              2,
              0,
              0,
              0,
              2,
              1,
              2,
              0,
              0,
              1,
              1,
              1,
              0,
              2,
              0,
              2,
              2,
              2,
              1
            ]
          }
        ]
      },
      chartOption1: {
        /*         title: {
          text: "折线图堆叠"
        }, */
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: 6,
          right: 10,
          bottom: 8,
          left: 10,
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "20190501",
            "20190502",
            "20190503",
            "20190504",
            "20190505",
            "20190506",
            "20190507",
            "20190508",
            "20190509",
            "20190510",
            "20190511",
            "20190512",
            "20190513",
            "20190514",
            "20190515",
            "20190516",
            "20190517",
            "20190518",
            "20190519",
            "20190520",
            "20190521",
            "20190522",
            "20190523",
            "20190524",
            "20190525",
            "20190526",
            "20190527",
            "20190528",
            "20190529",
            "20190530",
            "20190531"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "其他盗窃",
            type: "line",
            stack: "总量",
            data: [
              6,
              5,
              5,
              3,
              6,
              5,
              3,
              5,
              5,
              5,
              4,
              5,
              0,
              5,
              5,
              4,
              2,
              5,
              2,
              5,
              5,
              4,
              5,
              3,
              4,
              0,
              4,
              2,
              4,
              5,
              5
            ],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#2F4554",
                  width: 4,
                  shadowColor: "grey",
                  shadowBlur: 5,
                  shadowOffsetY: 7
                }
              }
            }
          }
        ]
      },
      chartOption2: {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: 6,
          right: 10,
          bottom: 8,
          left: 10,
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "20190501",
            "20190502",
            "20190503",
            "20190504",
            "20190505",
            "20190506",
            "20190507",
            "20190508",
            "20190509",
            "20190510",
            "20190511",
            "20190512",
            "20190513",
            "20190514",
            "20190515",
            "20190516",
            "20190517",
            "20190518",
            "20190519",
            "20190520",
            "20190521",
            "20190522",
            "20190523",
            "20190524",
            "20190525",
            "20190526",
            "20190527",
            "20190528",
            "20190529",
            "20190530",
            "20190531"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "入室盗窃",
            type: "line",
            stack: "总量",
            data: [
              0,
              1,
              0,
              2,
              0,
              0,
              0,
              0,
              1,
              0,
              2,
              0,
              2,
              2,
              2,
              0,
              0,
              1,
              0,
              2,
              0,
              1,
              1,
              0,
              1,
              2,
              2,
              1,
              1,
              0,
              1
            ],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#61A0A8",
                  width: 4,
                  shadowColor: "grey",
                  shadowBlur: 5,
                  shadowOffsetY: 7
                }
              }
            }
          }
        ]
      },
      chartOption3: {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: 6,
          right: 10,
          bottom: 8,
          left: 10,
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "20190501",
            "20190502",
            "20190503",
            "20190504",
            "20190505",
            "20190506",
            "20190507",
            "20190508",
            "20190509",
            "20190510",
            "20190511",
            "20190512",
            "20190513",
            "20190514",
            "20190515",
            "20190516",
            "20190517",
            "20190518",
            "20190519",
            "20190520",
            "20190521",
            "20190522",
            "20190523",
            "20190524",
            "20190525",
            "20190526",
            "20190527",
            "20190528",
            "20190529",
            "20190530",
            "20190531"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "盗窃非机动车",
            type: "line",
            stack: "总量",
            data: [
              1,
              1,
              1,
              2,
              1,
              0,
              1,
              2,
              0,
              1,
              0,
              0,
              2,
              0,
              0,
              0,
              2,
              1,
              2,
              0,
              0,
              1,
              1,
              1,
              0,
              2,
              0,
              2,
              2,
              2,
              1
            ],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#D48265",
                  width: 4,
                  shadowColor: "grey",
                  shadowBlur: 5,
                  shadowOffsetY: 7
                }
              }
            }
          }
        ]
      },
      chartOption4: {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: 6,
          right: 10,
          bottom: 8,
          left: 10,
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "20190501",
            "20190502",
            "20190503",
            "20190504",
            "20190505",
            "20190506",
            "20190507",
            "20190508",
            "20190509",
            "20190510",
            "20190511",
            "20190512",
            "20190513",
            "20190514",
            "20190515",
            "20190516",
            "20190517",
            "20190518",
            "20190519",
            "20190520",
            "20190521",
            "20190522",
            "20190523",
            "20190524",
            "20190525",
            "20190526",
            "20190527",
            "20190528",
            "20190529",
            "20190530",
            "20190531"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "其他",
            type: "line",
            stack: "总量",
            data: [
              4,
              4,
              1,
              4,
              4,
              2,
              5,
              4,
              5,
              4,
              3,
              1,
              4,
              4,
              2,
              5,
              6,
              4,
              2,
              0,
              5,
              4,
              4,
              4,
              2,
              5,
              3,
              4,
              4,
              2,
              5
            ],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#C23531",
                  width: 4,
                  shadowColor: "grey",
                  shadowBlur: 5,
                  shadowOffsetY: 7
                }
              }
            }
          }
        ]
      },
      chartOption6: {
        tooltip: {},
        series: [
          {
            type: "wordCloud",
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            shape: "pentagon",
            width: 500,
            height: 200,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: [
              {
                name: "安粮城市广场",
                value: 10000,
                textStyle: {
                  normal: {
                    color: "black"
                  },
                  emphasis: {
                    color: "red"
                  }
                }
              },
              {
                name: "半山花园",
                value: 6181
              },
              {
                name: "碧桂嘉苑",
                value: 4386
              },
              {
                name: "滨江郡",
                value: 4055
              },
              {
                name: "春晖家园-西区",
                value: 2467
              },
              {
                name: "慈湖马巷口",
                value: 2244
              },
              {
                name: "东城花园-四村",
                value: 1898
              },
              {
                name: "红旗村",
                value: 1484
              },
              {
                name: "湖北东路197-1号",
                value: 1112
              },
              {
                name: "汇成上东",
                value: 965
              },
              {
                name: "金瑞新城",
                value: 847
              },
              {
                name: "锦绣园",
                value: 582
              },
              {
                name: "康泰佳苑",
                value: 555
              },
              {
                name: "老站村",
                value: 550
              },
              {
                name: "玫瑰园",
                value: 462
              },
              {
                name: "平南四村",
                value: 366
              },
              {
                name: "桥山佳苑东区",
                value: 360
              },
              {
                name: "四季路283号",
                value: 282
              },
              {
                name: "西塘名苑",
                value: 273
              },
              {
                name: "中冶设计院小区",
                value: 265
              }
            ]
          }
        ]
      },
      columns: [
        {
          title: "犯罪时间",
          width: 100,
          dataIndex: "time",
          key: "time"
        },
        {
          title: "入室盗窃",
          width: 100,
          dataIndex: "rushi",
          key: "rushi"
        },
        {
          title: "盗窃非机动车",
          dataIndex: "fiejidong",
          key: "fiejidong",
          width: 100
        },
        { title: "其他盗窃", dataIndex: "qitadao", key: "qitadao", width: 100 },
        { title: "其他", dataIndex: "other", key: "other", width: 100 }
      ],
      data: [
        {
          key: "1",
          time: "20190501",
          rushi: "0",
          fiejidong: "1",
          qitadao: "6",
          other: "4"
        },
        {
          key: "2",
          time: "20190502",
          rushi: "1",
          fiejidong: "1",
          qitadao: "5",
          other: "4"
        },
        {
          key: "3",
          time: "20190503",
          rushi: "0",
          fiejidong: "1",
          qitadao: "5",
          other: "1"
        },
        {
          key: "4",
          time: "20190504",
          rushi: "2",
          fiejidong: "2",
          qitadao: "3",
          other: "4"
        },
        {
          key: "5",
          time: "20190505",
          rushi: "0",
          fiejidong: "1",
          qitadao: "6",
          other: "4"
        },
        {
          key: "6",
          time: "20190506",
          rushi: "0",
          fiejidong: "0",
          qitadao: "5",
          other: "2"
        },
        {
          key: "7",
          time: "20190507",
          rushi: "0",
          fiejidong: "1",
          qitadao: "3",
          other: "5"
        },
        {
          key: "8",
          time: "20190508",
          rushi: "0",
          fiejidong: "2",
          qitadao: "5",
          other: "4"
        },
        {
          key: "9",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "10",
          time: "20190510",
          rushi: "0",
          fiejidong: "1",
          qitadao: "5",
          other: "4"
        },
        {
          key: "11",
          time: "20190512",
          rushi: "2",
          fiejidong: "0",
          qitadao: "4",
          other: "3"
        },
        {
          key: "12",
          time: "20190512",
          rushi: "0",
          fiejidong: "0",
          qitadao: "5",
          other: "1"
        },
        {
          key: "13",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "14",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "15",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "16",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "17",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "18",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "19",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "20",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "21",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "22",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "23",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "24",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "25",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "26",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "27",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "28",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "29",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "30",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "31",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "32",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "33",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "34",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "35",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        },
        {
          key: "36",
          time: "20190509",
          rushi: "1",
          fiejidong: "0",
          qitadao: "5",
          other: "5"
        }
      ],
      pagination: {
        defaultPageSize: 6
      }
    };
  },
  components: {
    Chart,
    RankList
  }
};
</script>

<style>
</style>