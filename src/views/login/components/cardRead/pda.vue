<template>
    <el-row :gutter="12"  type="flex" justify="center">
        <el-col :xs="24" :sm="24" :md="8">
            <el-card shadow="always">
                <!--<el-alert-->
                <!--title="该功能暂未开放"-->
                <!--type="error"-->
                <!--:closable="false"-->
                <!--center-->
                <!--show-icon>-->
                <!--</el-alert>-->
                <el-button  type="primary" @click="mWindow.JSCallBackId.prepare()">准备</el-button>
                <el-button type="primary" @click="mWindow.JSCallBackId.startReadCard()">开始读卡</el-button>
                <el-button type="primary" @click="mWindow.JSCallBackId.stopReadCard()">停止读卡</el-button>
                <el-button type="primary" @click="mWindow.JSCallBackId.close()">关闭资源</el-button>
            </el-card>
            <el-card shadow="always">
                <el-input
                        type="textarea"
                        :rows="8"
                        placeholder="内容"
                        v-model="content">
                </el-input>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'Pda',
  data () {
    return {
      content: '',
      mWindow: null
    }
  },
  mounted () {
    window.onStart = this.onStart
    window.onStop = this.onStop
    window.onRead = this.onRead
    this.mWindow = window
  },
  methods: {
    onStart (response) {
      if (response !== 'success') {
        this.$message({
          message: '开启读卡失败',
          type: 'error',
          center: true
        })
      }
    },
    onStop (response) {
      if (response !== 'success') {
        this.$message({
          message: '停止失败',
          type: 'error',
          center: true
        })
      }
    },
    onRead (response) {
      this.content = response
    }
  }
}
</script>

<style scoped>

</style>
