<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span
        >这里是天气预报系统，你可以查询任意想要查询的城市的天气预报，包括了今日天气和近几天的预报</span
      >
    </div>
    <el-row :gutter="20" type="flex" justify="space-around">
      <el-col :span="10">
        <el-input
          placeholder="请输入想要查询的城市"
          prefix-icon="el-icon-search"
          v-model="city"
        >
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="search">点击查询</el-button>
      </el-col>
    </el-row>
    <div class="table" v-if="tableShow">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column :label="this.address" >
          <el-table-column
            prop="date"
            label="日期"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="dayweather"
            label="白天天气"
            width="180"
          ></el-table-column>
          <el-table-column prop="daytemp" label="白天温度/℃"></el-table-column>
          <el-table-column prop="daypower" label="白天风力"></el-table-column>
          <el-table-column prop="daywind" label="白天风向"></el-table-column>
          <el-table-column
            prop="nightweather"
            label="夜间天气"
          ></el-table-column>
          <el-table-column
            prop="nighttemp"
            label="夜间温度/℃"
          ></el-table-column>
          <el-table-column prop="nightpower" label="夜间风力"></el-table-column>
          <el-table-column prop="nightwind" label="夜间风向"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Weather",
  data() {
    return {
      city: "",
      tableData: [],
      address: "",
      tableShow:false
    };
  },
  methods: {
    search() {
      axios
        .get("https://restapi.amap.com/v3/weather/weatherInfo", {
          params: {
            key: "be890fb6333583832334ee7c9599739d",
            city: this.city,
            extensions: "all",
          },
        })
        .then((res) => {
          if (res.data.count) {
            this.tableShow=true
            this.tableData = res.data.forecasts[0].casts;
            this.address =
              res.data.forecasts[0].province + res.data.forecasts[0].city;
          }else{
            this.$message.error('请输入正确的城市信息');
          }
        });
    },
  },
};
</script>

<style scoped>
.clearfix {
  text-align: center;
  font-size: 24px;
}
.table{
  margin-top: 30px;
  text-align:center
}
</style>