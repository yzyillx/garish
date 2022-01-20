<template>
  <div class="background" @click="showFonts">
      <el-card class="box-card">
        <h2>”死亡如风，常伴吾身“</h2>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="auto"
            class="demo-ruleForm"
        >
          <el-form-item prop="name" class="item">
            <el-input placeholder="英雄名" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="item">
            <el-input placeholder="英雄密码" v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="loginButton" @click="login">登录</el-button>
        <el-link :underline="false" @click="goRegister" class="register">没有账户?点此注册</el-link>
      </el-card>
  </div>
</template>

<script>
import {setToken} from "@/utils/token";
import {L2Dwidget} from "live2d-widget";
import $ from "jquery"
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
          { required: true, message: '请输入英雄名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入英雄密码', trigger: 'blur' },
        ],
      },
      arr:["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"],
      arrNum:0,
    };
  },
  created() {
    //初始化绘制画布
    this.drawCanvas()
    //加载人物动画
    setTimeout(()=>{
      this.loadModel()
    },1000)
  },
  methods: {
    login(){
      if(this.ruleForm.name&&this.ruleForm.password){
            //登录框动画
            $('.box-card').animate({
              borderRadius:'50%'
            },'slow').animate({
              with:'-=200px',
              height:'-=200px',
              left:'+=800px',
              top:'-=100px',
            },'slow',()=>{
              setToken('token')
              sessionStorage.setItem("user",this.ruleForm.name)
              setTimeout(()=>{
                this.$router.push('/')
              },1000)
            }).animate({
              opacity:'-=0.3'
            }).children().animate({
              opacity:'-=0.4'
            },'slow')
      }else{
        this.$message.error('请输入英雄名或密码');
      }
    },
    goRegister(){
      this.$router.push('/register')
    },
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
    //绘制画布函数
    drawCanvas(){
      //创建画布，并添加到body中
      var the_canvas = document.createElement("canvas"), //画布
          config = this.get_config_option(), //配置
          canvas_id = "c_n" + config.l, //canvas id
          context = the_canvas.getContext("2d"), canvas_width, canvas_height,
          frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (func) {
            window.setTimeout(func, 1000 / 45);
          }, random = Math.random,
          current_point = {
            x: null, //当前鼠标x
            y: null, //当前鼠标y
            max: 20000
          },
          all_array;
      the_canvas.id = canvas_id;
      the_canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + config.z + ";opacity:" + config.o;
      this.get_by_tagname("body")[0].appendChild(the_canvas);
      //开始绘制
      function draw_canvas(){
        context.clearRect(0, 0, canvas_width, canvas_height);
        //随机的线条和当前位置联合数组
        var e, i, d, x_dist, y_dist, dist; //临时节点
        //遍历处理每一个点
        random_lines.forEach(function (r, idx) {
          r.x += r.xa,
              r.y += r.ya, //移动
              r.xa *= r.x > canvas_width || r.x < 0 ? -1 : 1,
              r.ya *= r.y > canvas_height || r.y < 0 ? -1 : 1, //碰到边界，反向反弹
              context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点
          //从下一个点开始
          for (i = idx + 1; i < all_array.length; i++) {
            e = all_array[i];
            //不是当前点
            if (null !== e.x && null !== e.y) {
              x_dist = r.x - e.x, //x轴距离 l
                  y_dist = r.y - e.y, //y轴距离 n
                  dist = x_dist * x_dist + y_dist * y_dist; //总距离, m
              dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
                  d = (e.max - dist) / e.max,
                  context.beginPath(),
                  context.lineWidth = d / 2,
                  context.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")",
                  context.moveTo(r.x, r.y),
                  context.lineTo(e.x, e.y),
                  context.stroke());
            }
          }
        }), frame_func(draw_canvas);
      }

      //初始化画布大小
      canvas_width = the_canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      canvas_height = the_canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      , window.onresize = ()=>{
        canvas_width = the_canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        canvas_height = the_canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      };
      //当时鼠标位置存储，离开的时候，释放当前位置信息
      window.onmousemove =  e=> {
        e = e || e.event, current_point.x = e.clientX, current_point.y = e.clientY;
      }, window.onmouseout =  ()=>{
        current_point.x = null, current_point.y = null;
      };
      //随机生成config.n条线位置信息
      for (var random_lines = [], i = 0; config.n > i; i++) {
        var x = random() * canvas_width, //随机位置
            y = random() * canvas_height,
            xa = 2 * random() - 1, //随机运动方向
            ya = 2 * random() - 1;
        random_lines.push({
          x: x,
          y: y,
          xa: xa,
          ya: ya,
          max: 6000 //沾附距离
        });
      }
      all_array = random_lines.concat([current_point]);
      //0.1秒后绘制
      setTimeout( ()=> {
        draw_canvas();
      }, 100);
    },
    get_attribute(node, attr, default_value) {
      return node.getAttribute(attr) || default_value;
    },
    get_by_tagname(name) {
      return document.getElementsByTagName(name);
    },
    get_config_option() {
      var scripts = this.get_by_tagname("script"),
          script_len = scripts.length,
          script = scripts[script_len - 1]; //当前加载的script
      return {
        l: script_len, //长度，用于生成id用
        z: this.get_attribute(script, "zIndex", -1), //z-index
        o: this.get_attribute(script, "opacity", 0.5), //opacity
        c: this.get_attribute(script, "color", "0,0,0"), //color
        n: this.get_attribute(script, "count", 99) //count
      };
    },
    //初始化加载人物动画
    loadModel(){
      L2Dwidget.init({
        model: {
          jsonPath: 'https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json',
          scale: 1
        },
        dialog:{
          enable:true,
          hitokoto:true
        }
      })
    }
}
};
</script>

<style scoped lang="less">
.box-card{
  text-align: center;
  width: 450px;
  height: 450px;
  left: 40%;
  z-index: 999;
  position: absolute;
  padding-top: 30px;
}
.item{
  width: 80% !important;
  margin: 40px auto !important;
}
.loginButton{
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
.background{
  width: 100%;
  height:100vh;
  margin:0;
  padding-top: 300px;
}
</style>
