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
                <el-button type="primary" @click="startReadCard()">开始读卡</el-button>
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
  name: 'Pc',
  data () {
    return {
      content: '',
      mWindow: null
    }
  },
  methods: {
    startReadCard () {
      this.content = '411381199203153510'
    }
  }
}
</script>

<style scoped>

</style>
