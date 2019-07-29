<template>
  <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <a-icon v-if="menuInfo.meta.icon" :type="menuInfo.meta.icon" />
      <span>{{ menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
        @click="() => $router.push({ path: item.path, query: $route.query })"
      >
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        <a-tooltip placement="rightTop">
          <template slot="title">{{ item.meta.info }}</template>
          <span @click="showSlide">{{ item.meta.title }}</span>
        </a-tooltip>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
import { Menu } from "ant-design-vue";
export default {
  name: "SubMenu",
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    showSlide() {
      this.$store.state.showSlide = true;
      if (document.getElementById("map").style.display == "none") {
        this.$store.state.grey1 = false;
        document.getElementById("map").style.display = "block";
        document.getElementById("map2").style.display = "none";
        document.getElementById("map3").style.display = "none";
        document.getElementById("map4").style.display = "none";
        document.getElementById("map5").style.display = "none";
        document.getElementById("map6").style.display = "none";
        document.getElementById("map1").style.display = "none";
      }
      //console.log(this.$route)
    },
    showInfo() {
      /* console.log("这是信息") */
    }
  },
  watch: {
    $route(to, from) {
      this.$store.state.cardTitle = to.meta.title;
    }
  }
};
</script>