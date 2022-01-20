<template>
<div class="background" @click="showFonts">
  <el-card class="box-card">
    <div><h1>注册</h1></div>
    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
    >
      <el-form-item label="请输入用户名" prop="name" class="item">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="请输入密码" prop="password" class="item">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="请确认密码" prop="password2" class="item">
        <el-input v-model="ruleForm.password2" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="button">注册</el-button>
  </el-card>
</div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Register",
  data(){
    const regName=/^[a-zA-Z][a-zA-Z0-9]{3,9}$/
    const checkName=(rule,value,callback)=>{
      if(value ===''){
        callback(new Error('用户名不能为空'))
      }else{
        if(regName.test(value)){
          callback()
        }else{
          callback(new Error('用户名必须为4-1位字母和数字的组合,且以字母开头'))
        }
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password2 !== '') {
          this.$refs.ruleForm.validateField('password2');
        }
        callback();
      }
    };
    const checkPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      ruleForm: {
        name: '',
        password:'',
        password2: ''
      },
      rules:{
        name: [
          { validator:checkName,trigger: 'blur' },
        ],
        password: [
          { validator:checkPassword, trigger: 'blur' },
        ],
        password2: [
          { validator:checkPassword2, trigger: 'blur' },
        ],
      },
      arr:["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"],
      arrNum:0,
    }
  },
  methods:{
    //点击背景，展现精神文明建设
    showFonts(e){
      let r = Math.random() * 255;
      let g = Math.random() * 255;
      let b = Math.random() * 255;
      var color = "rgb(" + r + "," + g + "," + b + ")";
      var $i
      if(this.arrNum<12){
        $i= $("<span></span>").text(this.arr[this.arrNum]);
      }else{
        $i= $("<span></span>").text(this.arr[this.arrNum%12]);
      }
      this.arrNum=this.arrNum+1
      var x = e.pageX,
          y = e.pageY;
      var size = Math.random() * 10 + 8 + "px";
      $i.css({
        "z-index": 99999,
        "top": y - 20,
        "left": x,
        "position": "absolute",
        "font-weight": "800",
        "font-size": size,
        "color": color
      });
      $("body").append($i);
      $i.animate({ "top": y - 200, "opacity": 0 }, 1500, function () {
        $i.remove();
      });
    },
  }
}
</script>

<style scoped>
.box-card{
  text-align: center;
  width: 600px;
  height: 400px;
  margin: 10% auto;
}
.button{
  width: 68%;
  margin-top: 20px;
  margin-right: auto;
}
.item{
  width: 80% !important;
  margin: 30px auto !important;
}
.background{
  width: 100%;
  height:100vh;
  margin:0;
  padding-top: 300px;
}
</style>
