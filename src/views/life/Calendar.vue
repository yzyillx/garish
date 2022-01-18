<template>
<div>
  <el-calendar>
  <template
      slot="dateCell"
      slot-scope="{date, data}"
  >
    <p :class="data.isSelected ? 'is-selected' : ''">
      {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
    </p>
  </template>
</el-calendar>
</div>
</template>

<script>
// import {instance} from "@/utils/instance";
export default {
  name: "Calendar",
  data(){
    return {
      dataA:''
    }
  },
  // created() {
  //   instance.get('/calendar/query',{
  //     params:{
  //       appkey:'652e5139788ab792',
  //       data:'2020-12-18'
  //     }
  //   }).then(res=>{
  //     console.log(res.data)
  //   })
  // }
  methods:{

  }
}
</script>

<style scoped>
.is-selected {
  color: #1989FA;
}
</style>
