import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "layout" */ "./components/UserLayout.vue"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./users/Login.vue")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./users/Register.vue")
        }
      ]
    },
    {
      path: "/home",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/Home.vue"),
        children:[
          {
            path:"/home",
            redirect:"/home/homeData"
          },
          {
            path: "/home/homeData",
            component: () =>
              import(/* webpackChunkName: "user" */ "./views/WorkPlanet.vue")
          },
          {
            path: "/home/caseInput",
            component: () =>
              import(/* webpackChunkName: "user" */ "./views/CaseInput.vue")
          },
          {
            path: "/home/caseSearch",
            component: () =>
              import(/* webpackChunkName: "user" */ "./views/CaseSearch.vue")
          },
        ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout.vue"),
      children: [
        {
          path: "/",
          redirect: "/general/DataStatistics"
        },
        {
          path: "/general",
          name: "general",
          meta: { icon: "schedule", title: "警情概况" },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/general/DataStatistics",
              name: "DataStatistics",
              meta: { title: "警情信息统计", info: "" },
              component: () =>
                import(/* webpackChunkName: "layout" */ "./views/General/DataStatistics.vue"),
            },
            {
              path: "/general/caseAnalysis",
              name: "caseAnalysis",
              meta: { title: "警情信息分析", info: "" },
              component: () =>
                import(/* webpackChunkName: "layout" */ "./views/General/CaseAnalysis.vue"),
            }]
        },
        {
          path: "/predict",
          name: "predict",
          meta: { icon: "bulb", title: "犯罪预测与预警" },
          component: () =>
            import(/* webpackChunkName: "layout" */ "./views/TheftPredict.vue"),
        },
      ]
    },

  ]
});
