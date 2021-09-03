<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card>
        <tabs :channel="channel" style="text-align: center;"></tabs>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-calendar v-model="value">
      </el-calendar>
    </el-col>
  </el-row>
</template>

<script>
import Tabs from "@/components/Tabs";
import {instance} from "@/utils/instance";

export default {
  name: "Index",
  data() {
    return {
      channel: [],
      value:new Date()
    }
  },
  created() {
    instance.get('/news/channel', {
      params: {
        appkey: '652e5139788ab792'
      }
    }).then(res => {
      this.channel = res.data.result
    })
  },
  components: {
    Tabs
  }
}
</script>

<style scoped>

</style>