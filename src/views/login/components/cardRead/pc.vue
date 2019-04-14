<template>
    <el-row :gutter="12"  type="flex" justify="center">
        <el-col :xs="24" :sm="24" :md="8">
            <object id="CertCtl" type="application/cert-reader" width="0" height="0" ref="CertCtl">
                <el-alert
                        title="控件不可用，可能未正确安装控件及驱动，或者控件未启用。"
                        type="error"
                        show-icon>
                </el-alert>
            </object>
            <el-card shadow="always">
                <el-row :gutter="12"  type="flex" justify="space-around">
                    <el-button  :span="12" :offset="6" type="primary" :disabled="disable" @click="startReadCard()">开始读卡</el-button>
                    <el-button  :span="12" :offset="6" type="primary" :disabled="disable" @click="onReadSuccess()">确认成功</el-button>
                </el-row>
            </el-card>
            <el-card shadow="always">
                <el-form :model="pcForm" status-icon  ref="pcForm" >
                    <el-form-item label="姓名:">
                        <el-input v-model="pcForm.userName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号:">
                        <el-input v-model="pcForm.cardId" readonly></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
// import {isCardID} from '@/utils/validate'
export default {
  name: 'Pc',
  data () {
    return {
      disable: false,
      pcForm: {
        userName: '',
        cardId: ''
      }
    }
  },
  mounted () {
    try {
      let response = this.$refs['CertCtl'].connect()
      response = JSON.parse(response)
      if (response.resultFlag !== 0) {
        this.$message({
          message: '身份证读卡器连接失败',
          type: 'error',
          center: true
        })
      }
    } catch (e) {
      this.disable = true
      this.$message({
        message: '身份证读卡器插件未安装',
        type: 'error',
        center: true
      })
    }
  },
  methods: {
    startReadCard () {
      let response = this.$refs['CertCtl'].readCert()
      response = JSON.parse(response)
      if (response.resultFlag !== 0) {
        this.$message({
          message: response.errorMsg,
          type: 'error',
          center: true
        })
      } else {
        this.pcForm.cardId = response.resultContent.certNumber
        this.pcForm.userName = response.resultContent.partyName
      }
    },
    onReadSuccess () {
      if (this.pcForm.cardId !== '') {
        this.$store.dispatch('Login', {uid: this.pcForm.cardId, type: '1'}).then(() => {
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
