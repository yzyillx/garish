<template>
  <el-container>
    <el-header
      style="text-align: center;height:330px;background: rgba(255,255,255,0);"
    >
      <el-row>
          <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="(item,index) in welcome" :key="index">
              <div :style="item.url">
                {{item.name}}
              </div>
            </el-carousel-item>
          </el-carousel>
      </el-row>
      <el-row type="flex" align="end">
        <el-col :span="22"></el-col>
        <el-col :span="2">
          <el-dropdown @command="exit" style="position: relative;z-index: 999999">
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
      <el-main style="background: rgba(241,225,225,0.3); height: 100vh; overflow: auto">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer
      style="background: chocolate; position: fixed; bottom: 0; width: 100%"
      >Footer</el-footer
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
      welcome: [
        {
          url: {
            backgroundImage: `url(${require("../../assets/亚索.jpeg")})`,
            height: '300px',
            backgroundRepeat: "no-repeat",
            backgroundSize: `100% 100%`,
            color: 'red'
          },
          name: '疾风剑豪-亚索'
        }, {
          url: {
            backgroundImage: `url(${require("../../assets/乐芙兰.jpeg")})`,
            height: '300px',
            backgroundRepeat: "no-repeat",
            backgroundSize: `100% 100%`,
            color: 'red'
          },
          name: '诡术妖姬-乐芙兰'
        },
        {
          url: {
            backgroundImage: `url(${require("../../assets/璐璐.jpeg")})`,
            height: '300px',
            backgroundRepeat: "no-repeat",
            backgroundSize: `100% 100%`,
            color: 'red'
          },
          name: '仙灵女巫-璐璐'
        },
        {
          url: {
            backgroundImage: `url(${require("../../assets/艾希.jpeg")})`,
            height: '300px',
            backgroundRepeat: "no-repeat",
            backgroundSize: `100% 100%`,
            color: 'red'
          },
          name: '寒冰射手-艾希'
        }, {
          url: {
            backgroundImage: `url(${require("../../assets/赵信.jpeg")})`,
            height: '300px',
            backgroundRepeat: "no-repeat",
            backgroundSize: `100% 100%`,
            color: 'red'
          },
          name: '德邦总管-赵信'
        }]
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
        this.$confirm("是否确认退出登录?", '尊敬的'+this.username, {
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
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
