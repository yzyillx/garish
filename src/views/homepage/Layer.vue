<template>
  <el-container>
    <el-header
      height="80px"
      style="background: darksalmon; text-align: center; line-height: 80px"
    >
      <el-row>
        <el-col :span="16">
          <h2 style="float: right">选择你想体验的功能</h2>
          <div style="clear: both"></div>
        </el-col>
        <el-col :span="8">
          <el-dropdown @command="exit">
            <span class="el-dropdown-link">
              欢迎您，<strong>{{ this.username }}</strong>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="250px" style="height: auto">
        <menu-list :menuList="menuList"></menu-list>
      </el-aside>
      <el-main style="background: antiquewhite; height: 100vh; overflow: auto">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer
      style="background: chocolate; position: fixed; bottom: 0; width: 100%"
      >这里是脚底</el-footer
    >
  </el-container>
</template>

<script>
import { service } from "@/utils/http";
import MenuList from "@/components/MenuList";

export default {
  name: "Index",
  data() {
    return {
      menuList: [],
      dialogVisible: false,
    };
  },
  created() {
    service.post("/menu").then((res) => {
      this.menuList = res.data;
    });
  },
  methods: {
    exit(command) {
      if (command === "a") {
        this.$confirm("是否确认退出登录?", "注意", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
        }).then(
          () => {
            sessionStorage.clear();
            this.$router.push("/login");
          },
          () => {
            console.log("退出取消");
          }
        );
      }
    },
  },
  computed: {
    username() {
      return sessionStorage.getItem("user");
    },
  },
  components: {
    MenuList,
  },
};
</script>

<style scoped>
</style>