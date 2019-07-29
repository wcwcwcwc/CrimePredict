<template>
  <div>
    <a-drawer
      placement="bottom"
      :closable="false"
      @close="onClose"
      :visible="visible"
      height="300"
      :mask="false"
    >
      <template v-slot:handle>
        <div class="handle2" @click="visible=!visible">
          <icon-font
            :type="visible? 'icon-close-circle': 'icon-zhifeiji'"
            style="font-size:24px;color:#fff"
          ></icon-font>
        </div>
      </template>
      <div>
        <Chart :option="chartOption" style="height:280px" />
      </div>
    </a-drawer>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as esri from "esri-leaflet";
import * as d3 from "d3";
import styles from "../../less/drawer.less";
import { Icon } from "ant-design-vue";
import Chart from "../../layouts/Chart";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1264069_d6q7qtqopzb.js"
});

export default {
  data() {
    return {
      visible: false,
      chartOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "0",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "2018-01",
              "2018-02",
              "2018-04",
              "2018-05",
              "2018-07",
              "2018-06",
              "2018-10",
              "2018-09",
              "2018-08",
              "2018-11",
              "2018-12",
              "2019-01"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "月盗窃数",
            type: "bar",
            data: [4, 2, 4, 3, 8, 3, 3, 4, 3, 4, 10, 1],
            itemStyle: {
              normal: {
                color: function(params) {
                  var index_color = parseInt(((params.data / 49) * 100) / 2);
                  if (index_color == 1) {
                    return "#FFF0F5";
                  }
                  if (index_color == 2) {
                    return "#FFEBCD";
                  }
                  if (index_color == 3) {
                    return "#FFE4B5";
                  }
                  if (index_color == 4) {
                    return "#FFD700";
                  }
                  if (index_color == 5) {
                    return "#FFC0CB";
                  }
                  if (index_color == 6) {
                    return "#FFB5C5";
                  }
                  if (index_color == 7) {
                    return "#FFA07A";
                  }
                  if (index_color == 8) {
                    return "#FF82AB";
                  }
                  if (index_color == 9) {
                    return "#FF7F00";
                  }
                  if (index_color == 10) {
                    return "#FF69B4";
                  }
                  if (index_color == 11) {
                    return "#FF3E96";
                  }
                  if (index_color == 12) {
                    return "#FF00FF";
                  }
                }
              }
            },
            barWidth: "60%"
          }
        ]
      },
      pointArr: [],
      pointArr2: {},
      riqiKey2: [],
      pointValue2: []
    };
  },
  mounted() {
    this.testMethod();
    this.$store.state.map.on("zoom move", this.testMethod);
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    },
    testMethod() {
      var pointarr = [];
      this.pointArr2 = {};
      this.$store.state.crimePoint.eachActiveFeature(function(e) {
        pointarr.push(e.feature.properties.BZSJ.substring(0, 7));
      });
      this.pointArr = pointarr;
      for (let index = 0; index < this.pointArr.length; index++) {
        var kk = this.pointArr[index];
        if (!this.pointArr2[kk]) {
          this.pointArr2[kk] = 0;
        }
        this.pointArr2[kk]++;
      }
      var riqiKey = [],
        pointValue = [],
        testPoint = this.pointArr2;
      Object.keys(testPoint).forEach(function(key) {
        riqiKey.push(key);
        pointValue.push(testPoint[key]);
        //console.log(dataFanzui[key]);
      });
      this.riqiKey2 = riqiKey;
      this.pointValue2 = pointValue;
      var s = 0;
      for (var i = 0; i < pointValue.length; i++) {
        s += pointValue[i];
      }
      this.chartOption.xAxis = [
        {
          type: "category",
          data: riqiKey,
          axisTick: {
            alignWithLabel: true
          }
        }
      ];
      this.chartOption.series = [
        {
          name: "月盗窃数",
          type: "bar",
          barWidth: "60%",
          data: pointValue,
          itemStyle: {
            normal: {
              color: function(params) {
                var index_color = parseInt(((params.data / s) * 100) / 2);
                if (index_color == 1) {
                  return "#FFF0F5";
                }
                if (index_color == 2) {
                  return "#FFEBCD";
                }
                if (index_color == 3) {
                  return "#FFE4B5";
                }
                if (index_color == 4) {
                  return "#FFD700";
                }
                if (index_color == 5) {
                  return "#FFC0CB";
                }
                if (index_color == 6) {
                  return "#FFB5C5";
                }
                if (index_color == 7) {
                  return "#FFA07A";
                }
                if (index_color == 8) {
                  return "#FF82AB";
                }
                if (index_color == 9) {
                  return "#FF7F00";
                }
                if (index_color == 10) {
                  return "#FF69B4";
                }
                if (index_color == 11) {
                  return "#FF3E96";
                }
                if (index_color == 12) {
                  return "#FF00FF";
                }
                if (index_color > 12) {
                  return "#FF00FF";
                }
              }
            }
          }
        }
      ];
      this.chartOption = { ...this.chartOption };
    },
    test() {
      console.log("1");
    }
  },
  components: {
    IconFont,
    Chart
  }
};
</script>
<style >
.handle2 {
  position: absolute;
  bottom: 300px;
  right: 60px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 30px 30px 0 0;
  -webkit-box-shadow: rgba(0, 21, 41, 0.35) 2px 0px;
  box-shadow: rgba(0, 21, 41, 0.35) 2px 0px;
}
.handle2:hover {
  cursor: pointer;
}
</style>
