<template>
  <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router=true
      style="height: 100%;width: 250px"
      :unique-opened=true
  >
    <template v-for="(item,index) in menuList">
      <el-submenu v-if="item.children" :key="index" :index="item.url">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <menus :menuList="item.children"></menus>
      </el-submenu>
      <el-menu-item v-else :key="index" :index="item.url">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import Menus from "@/components/Menus";
export default {
  props:['menuList'],
  name: "MenuList",
  data(){
    return{}
  },
  components:{
    Menus
  }
}
</script>

<style scoped>

</style>