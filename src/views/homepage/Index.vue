<template>
  <el-card>

  </el-card>
    <tabs :channel="channel" style="text-align: center;"></tabs>
</template>

<script>
import Tabs from "@/components/Tabs";
import {instance} from "@/utils/instance";

export default {
  name: "Index",
  data() {
    return {
      channel:[]
    }
  },
  created() {
    instance.get('/news/channel', {
      params:{
        appkey: '652e5139788ab792'
      }
    }).then(res => {
      this.channel=res.data.result
    })
  },
  components:{
    Tabs
  }
}
</script>

<style scoped>

</style>