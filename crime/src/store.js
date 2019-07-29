import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showSlide: false,
    cardTitle: '数据统计',
    tooltipInfo: '',
    map: '',
    crimePoint: '',
    allManShan:'',
    fanzuidianShow: true,
    fanzuiTimeStart: '',
    fanzuiTimeEnd: '',
    showChartCard: false,
    fanzuidateData: [],
    chars: {},
    test: false,
    dongtaiRiqi:[],
    grey1:false,
    testtop:false,
  },
  mutations: {},
  actions: {}
});
