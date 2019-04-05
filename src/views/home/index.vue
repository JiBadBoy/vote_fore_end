<template>
     <el-row :gutter="20" type="flex" justify="center">
        <el-col :xs="24" :xl="16" :sm="16">
            <h3 class="product_tit">请选择下列方式进行投票</h3>
           <el-row :gutter="20" type="flex" justify="center">
                <el-col :gutter="20" :xs="24" :xl="20" :sm="20">
                    <el-col :xs="24" :xl="12" :sm="12">
                        <div class="grid-content bg-purple">
                            <router-link to="/login/card">
                                <div class="agile_text_box">
                                    <i class="el-icon-info"></i>
                                    <h5>身份证认证投票</h5>
                                    <p>通过扫描身份证进行投票</p>
                                </div>
                            </router-link>
                        </div>
                    </el-col>
                    <el-col :xs="24" :xl="12" :sm="12">
                        <div class="grid-content bg-purple-light">
                            <router-link to="/login/mobile">
                                <div class="agile_text_box">
                                <i class="el-icon-mobile-phone"></i>
                                    <h5>手机认证投票</h5>
                                    <p>通过手机号码进行投票</p>
                                </div>
                            </router-link>
                        </div>
                    </el-col>
                    <!-- <el-col :xs="24" :xl="6" sm="6">
                        <div class="grid-content bg-purple"></div>
                    </el-col>
                    <el-col :xs="24" :xl="6" sm="6">
                        <div class="grid-content bg-purple"></div>
                    </el-col> -->
                </el-col>
           </el-row>
        </el-col>
     </el-row>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped  rel="stylesheet/scss" lang="scss">
/* main{
    background: url("/static/images/2.jpg");
    background-size: cover;
} */
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .bg-purple-dark {
    background: #bdd2f9;
  }
  .bg-purple {
    background: #bdd2f9;
  }
  .bg-purple-light {
    background: #faebd7;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .agile_text_box{
    padding: 40px;
    text-align: center;
  }
  .grid-content{
    -webkit-transition: .5s all;
    -moz-transition: .5s all;
    -o-transition: .5s all;
    -ms-transition: .5s all;
    transition: .5s all;
  }
  .grid-content:hover{
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    z-index: 9;
  }
  .agile_text_box i{
    color: rgb(245, 108, 108);
  }
  .agile_text_box h5{
    color: rgb(144, 147, 153);
  }
  .agile_text_box p{
    color: rgb(103, 194, 58);
  }
</style>
