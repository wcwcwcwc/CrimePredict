<template>
  <div ref="chartDom" style="height:400px"></div>
</template>

<script>
import echarts from "echarts";
//resize-detector这个东西是自动调整图表大小的
import { addListener, removeListener } from "resize-detector";
//debounce函数防抖
import debounce from "lodash/debounce";
export default {
    //option是从父组件传到子组件然后进行渲染的
  props: {
    option: {
      type: Object,
      default:()=>{}
    }
  },
  watch:{
      option(val){
          this.Chart.setOption(val);
      }
      //下面是深度监听，性能不太好
/*       option:{
          handler(val){
              this.Chart.setOption(val);
          },
          deep:true
      } */

  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.Chart.dispose();
    this.Chart = null;
  },
  methods: {
    resize() {
      //console.log("kk");
      this.Chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.Chart = echarts.init(this.$refs.chartDom);
      this.Chart.setOption(this.option);
    }
  }
};
</script>

<style>
</style>
