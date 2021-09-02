<template>
  <div>
    <template v-for="(item,index) in menuList">
      <el-submenu v-if="item.children" :key="index" :index="item.url">
        <menus></menus>
      </el-submenu>
      <el-menu-item v-else :key="index" :index="item.url">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  props:['menuList'],
  name: "Menus"
}
</script>

<style scoped>

</style>