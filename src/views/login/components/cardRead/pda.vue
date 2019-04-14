<template>
    <el-row :gutter="12"  type="flex" justify="center">
        <el-col :xs="24" :sm="24" :md="8">
            <el-card shadow="always">
                <el-row :gutter="12"  type="flex" justify="space-around">
                    <el-button  :span="12" :offset="6" type="primary" @click="mWindow.JSCallBackId.startReadCard()">开始读卡</el-button>
                    <el-button  :span="12" :offset="6" type="primary" @click="onReadSuccess()">确认成功</el-button>
                </el-row>
            </el-card>
            <el-card shadow="always">
                <el-form :model="pdaForm" status-icon  ref="pdaForm" >
                <el-form-item label="姓名:">
                    <el-input v-model="pdaForm.userName" readonly></el-input>
                </el-form-item>
                <el-form-item label="身份证号:">
                    <el-input v-model="pdaForm.cardId" readonly></el-input>
                </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import {isCardID} from '@/utils/validate'
export default {
  name: 'Pda',
  data () {
    return {
      mWindow: null,
      pdaForm: {
        userName: '',
        cardId: ''
      }
    }
  },
  mounted () {
    window.onStart = this.onStart
    window.onStop = this.onStop
    window.onRead = this.onRead
    this.mWindow = window
  },
  methods: {
    startReadCard () {
      this.onRead(JSON.stringify({name: 'jifeihu', cardId: '411381199203153511', code: 200}))
    },
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
      response = JSON.parse(response)
      if (response.code === 200) {
        if (isCardID(response.cardId)) {
          this.pdaForm.userName = response.name
          this.pdaForm.cardId = response.cardId
        } else {
          this.$message({
            message: '身份证卡号错误！',
            type: 'error',
            center: true
          })
        }
      } else {
        this.$message({
          message: '读取失败，请重试！',
          type: 'error',
          center: true
        })
      }
    },
    onReadSuccess () {
      if (this.pdaForm.cardId !== '') {
        this.$store.dispatch('Login', {uid: this.pdaForm.cardId, type: '1'}).then(() => {
          this.$router.push({ path: '/vote/list' })
        })
      } else {
        this.$message({
          message: '请先读卡',
          type: 'error',
          center: true
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
