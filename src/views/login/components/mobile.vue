<template>
<el-row :gutter="20" type="flex" justify="center">
  <el-col :xs="24" :xl="8" :sm="8" v-if="this.$route.params.type == 'mobile'">
    <el-form :model="mobileForm" status-icon :rules="mobileFromRules" ref="mobileForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号" prop="mobile">
           <el-col :span="17">
            <el-input  v-model="mobileForm.mobile"></el-input>
           </el-col>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-col :span="11">
             <el-input v-model.number="mobileForm.code"></el-input>
          </el-col>
          <el-col :span="2">
          </el-col>
           <el-col :span="11">
              <el-button type="button" @click="sendCode('mobileForm')" :disabled="disabled" v-if="disabled===false">获取验证码
            </el-button>
            <el-button type="button" @click="sendCode('mobileForm')" :disabled="disabled" v-if="disabled===true">{{btnTxt}}
            </el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('mobileForm')">提交</el-button>
            <el-button @click="resetForm('mobileForm')">重置</el-button>
        </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
import {isMobile} from '@/utils/validate'
import {sendMsg} from '@/api/login'
export default {
  data () {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空！'))
      }

      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }
    var validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!isMobile(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    return {
      mobileForm: {
        mobile: '',
        code: ''
      },
      mobileFromRules: {
        mobile: [
          {required: true, message: '请输入手机号', trigger: ['blur', 'change']},
          {validator: validateMobile, trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: ['blur', 'change']},
          { validator: checkCode, trigger: 'blur' }
        ]
      },
      disabled: false,
      time: 0,
      btnTxt: '重新发送',
      validateCode: 0
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.mobileForm.code === this.validateCode) {
            this.$store.dispatch('Login', {uid: this.mobileForm.mobile, type: 'mobile'}).then(() => {
              this.$router.push({ path: '/vote/list/' + this.mobileForm.mobile })
            })
          } else {
            this.$message({
              message: '验证码错误',
              type: 'error',
              center: true
            })
          }
        } else {
          this.$message({
            message: '请确认填写内容是否有误！',
            type: 'error',
            center: true
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    sendCode (formName) {
      this.$refs[formName].validateField('mobile', (errorMessage) => {
        if (errorMessage) {
          this.$message({
            message: errorMessage,
            type: 'error',
            center: true
          })
        } else {
          sendMsg(this.mobileForm.mobile).then(response => {
            const data = response
            if (data.code === 200) {
              this.$message({
                message: '发送成功',
                type: 'success',
                center: true
              })
              this.validateCode = data.data.code
            } else {
              this.$message({
                message: '发送失败，请重试',
                type: 'error',
                center: true
              })
            }
          })
          this.time = 60
          this.disabled = true
          this.timer()
        }
      })
    },
    timer () {
      if (this.time > 0) {
        this.time--
        this.btnTxt = this.time + 's后重新获取'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.btnTxt = '获取验证码'
        this.disabled = false
      }
    }
  }
}
</script>
