<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>在这里，输入完快递单号之后，点击右侧的查询按钮，就可以查询快递信息，如果是顺丰快递，还需要提供手机号。</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="18">
          <el-input
            placeholder="请输入快递单号"
            prefix-icon="el-icon-search"
            v-model="number"
            @blur="mobileShow"
          >
          </el-input>
          <el-input
            placeholder="请输入手机号"
            prefix-icon="el-icon-phone"
            v-model="mobile"
            v-show="mobileInput"
          >
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" round @click="search">点击查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5">
          <img :src="expressLogo" />
        </el-col>
        <el-col :span="10" class="expressname">
          <strong>{{ expressName }}</strong>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe style="width: 100%" v-show="table">
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { instance } from "@/utils/instance";
export default {
  name: "Express",
  data() {
    return {
      number: "",
      expressName: "",
      expressLogo: "",
      tableData: [],
      table: false,
      mobile: "",
      mobileInput: false,
    };
  },
  created() {},
  methods: {
    search() {
      instance
        .get("/express/query", {
          params: {
            appkey: "652e5139788ab792",
            type: "auto",
            number: this.number,
            mobile: this.mobile,
          },
        })
        .then((res) => {
          if (res.data.result.list) {
            this.table = true;
            this.expressName = res.data.result.typename;
            this.expressLogo = res.data.result.logo;
            this.tableData = res.data.result.list;
          } else {
            this.$message.error("输入信息有误，请重新输入");
          }
        });
    },
    mobileShow() {
      if (this.number.indexOf("SF") !== -1) {
        this.mobileInput = true;
      }else{
        this.mobileInput=false
      }
    },
  },
};
</script>

<style scoped>
.expressname {
  display: flex;
  align-content: center;
}
.clearfix{
  text-align: center;
  font-size: 24px;
}
</style>