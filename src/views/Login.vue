<template>
  <el-card class="box-card">
    <h2>一个花里胡哨的功能合集</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name" class="item">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="item">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="button" @click="login">登录</el-button>
    <el-link :underline="false" @click="goRegister" class="register">没有账户?点此注册</el-link>
  </el-card>
</template>

<script>
import {service} from "@/utils/http";
import {setToken} from "@/utils/token";
export default {
  name: "Index",
  data() {
    return {
      ruleForm: {
        name: '',
        password:''
      },
      rules:{
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    };
  },
  created() {
  },
  methods: {
    login(){
      if(this.ruleForm.name&&this.ruleForm.password){
        service.post('/',{
          name:this.ruleForm.name,
          password:this.ruleForm.password
        }).then(res=>{
          if(res.data.success){
            setToken(res.data.token)
            sessionStorage.setItem("user",this.ruleForm.name)
            this.$router.push('/')
          }else{
            this.$message.error('用户名或密码错误')
          }
        })
      }else{
        this.$message.error('请输入用户名或密码');
      }
    },
    goRegister(){
      this.$router.push('/register')
    }
  },
};
</script>

<style scoped lang="less">
.box-card{
  text-align: center;
  width: 600px;
  height: 400px;
  margin: 10% auto;
}
.item{
  width: 80% !important;
  margin: 30px auto !important;
}
.button{
  width: 80%;
  margin-top: 40px;
  margin-right: auto;
}
.register{
  display: block;
  margin-top: 50px;
  float: right;
  margin-right: 60px;
}
</style>