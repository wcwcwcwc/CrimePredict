<template>
  <div>
    <a-table
      class="fandianzuiTable"
      :columns="columns"
      :dataSource="data"
      :pagination="false"
      :loading="loading"
    ></a-table>
    <Chart :option="chartOption" style="height:220px" />
    <div style="position:relative;left:30%">
      <a-button type="primary" style @click="back">
        <a-icon type="left-circle" />
      </a-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "../../layouts/Chart";
//import * as d3 from 'd3';
export default {
  data() {
    return {
      data: [],
      loading: false,
      columns: [
        {
          title: "编号",
          width: 100,
          dataIndex: "num",
          key: "num"
        },
        {
          title: "盗窃类型",
          width: 100,
          dataIndex: "cata",
          key: "cata"
        },
        {
          title: "犯罪数目",
          width: 100,
          dataIndex: "number",
          key: "number"
        }
      ],
      chartOption: {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "20%",
          right: "20%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["扒窃", "入室盗窃", "盗窃非机动车", "其他盗窃"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "个"
          }
        ],
        series: [
          {
            name: "犯罪数量",
            type: "bar",
            barWidth: "60%",
            data: [502, 1426, 2410, 3042]
          }
        ]
      }
    };
  },
  mounted() {
    this.duqu();
  },
  methods: {
    showChart() {
    },
    back() {
      this.$store.state.fanzuidianShow = !this.$store.state.fanzuidianShow;
    },
    duqu() {
      axios.get("http://localhost:62654/api/Theft").then(response => {
        var paqie = 0,
          rushi = 0,
          feijidong = 0,
          qita = 0,
          riqi = [];
        for (let index = 0; index < response.data.length; index++) {
          riqi.push(response.data[index].CJSJ.substring(0, 10));
          var fanzuishuju = {
            Date: response.data[index].CJSJ.substring(0, 10),
            value: 1
          };
          this.$store.state.fanzuidateData.push(fanzuishuju);
          if (response.data[index].CRIME_TYPE == "扒窃") {
            paqie++;
          }
          if (response.data[index].CRIME_TYPE == "盗窃,入室盗窃") {
            rushi++;
          }
          if (response.data[index].CRIME_TYPE == "盗窃,其他盗窃") {
            qita++;
          }
          if (response.data[index].CRIME_TYPE == "盗窃,盗窃非机动车") {
            feijidong++;
          }
        }
        //console.log(riqi);
        //console.log(this.$store.state.fanzuidateData)
        for (let index = 0; index < riqi.length; index++) {
          var kk = riqi[index];
          if (!this.$store.state.chars[kk]) {
            this.$store.state.chars[kk] = 0;
          }

          this.$store.state.chars[kk]++;
        }
        var dataFanzui = this.$store.state.chars;
        var maxData = [];
        Object.keys(dataFanzui).forEach(function(key) {
          maxData.push(dataFanzui[key]);
        });
        this.data = [
          {
            key: 0,
            num: 1,
            cata: "扒窃",
            number: paqie
          },
          {
            key: 1,
            num: 2,
            cata: "入室盗窃",
            number: rushi
          },
          {
            key: 2,
            num: 3,
            cata: "盗窃非机动车",
            number: feijidong
          },
          {
            key: 3,
            num: 4,
            cata: "其他盗窃",
            number: qita
          }
        ];
        this.chartOption.series = [
          {
            name: "犯罪数量",
            type: "bar",
            barWidth: "60%",
            data: [paqie, rushi, feijidong, qita]
          }
        ];
        this.chartOption = { ...this.chartOption };
      });
    }
  },
  components: {
    Chart
  }
};
</script>

<style>
</style>
