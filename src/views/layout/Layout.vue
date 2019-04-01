<template>
   <el-container>
        <el-header style="height:80px;background-color: #409EFF;">
            <app-header/>
        </el-header>
        <div class="banner hidden-xs-only">
            <img src="/static/images/timg.jpg" alt="住房专项维修资金使用业主投票系统" style="width:100%;">
        </div>
       <el-main>
           <app-main/>
       </el-main>
   </el-container>
</template>

<script>
import { AppMain, AppHeader } from './components'
import 'element-ui/lib/theme-chalk/display.css'
export default {
  name: 'Layout',
  components: {
    AppMain,
    AppHeader
  },
  data () {
    return {
      bannersrc: ''
    }
  }
}
</script>

<style>
.logo{
    line-height: 80px;
}
.logo h1{
    margin: 0px;
}
.logo h1 a span {
    color: #fff;
    border: 2px solid;
    text-align: center;
    line-height: 1em;
    font-weight: 800;
    margin-right: 8px;
    padding: 5px 12px 0;
    vertical-align: middle;
}
.logo h1 i {
    font-size: 1em;
    letter-spacing: 3px;
    font-weight: 500;
    font-style: normal;
    color: #fff;
}
.product_tit{
    color: rgb(64, 158, 255);
}
@media only screen and (max-width: 767px){
    .logo h1 a span{
        font-weight: normal;
        padding: 5px;
    }
    .logo h1 i{
        font-size: 14px;
    }
}
</style>
