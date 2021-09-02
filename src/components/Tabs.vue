<template>
  <el-tabs @tab-click="handleClick" tab-position="left" v-model="activeName">
    <el-tab-pane v-for="(item,index) in channel" :label="item" :name="'a'+index" :key="index">
      <el-collapse accordion>
        <el-collapse-item v-for="(item,index) in news" :name="index" :key="index">
          <template slot="title">
            <strong>{{item.title}}</strong>
          </template>
          <div v-html="item.content" class="news"></div>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {instance} from "@/utils/instance";
export default {
  props:['channel'],
  name: "Tabs",
  data(){
    return{
      news:[],
      activeName:'a0'
    }
  },
  methods:{
    handleClick(tab){
      instance.get('/news/get',{
        params:{
          appkey:'652e5139788ab792',
          channel:tab.label
        }
      }).then(res=>{
          this.news=res.data.result.list
      })
    }
  },
  created(){
      instance.get('/news/get',{
        params:{
          appkey:'652e5139788ab792',
          channel:'头条'
        }
      }).then(res=>{
          this.news=res.data.result.list
      })
  }
}
</script>

<style scoped>
.news{
  height:60vh;
  overflow: auto;
}
</style>