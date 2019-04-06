<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :xs="24" :xl="16" :sm="16">
           <el-row>
                <el-col :xs="15" :xl="21" :sm="21">
                    <h3 class="product_tit">投票列表</h3>
                </el-col>
                <el-col :xs="9" :xl="3" :sm="3">
                    <el-button type="info" plain class="vote_list_btn">
                        <router-link  to="/vote/list_done">
                            查看已投选项
                        </router-link>
                    </el-button>
                </el-col>
           </el-row>
             <el-collapse v-model="activeName" accordion>
                <el-collapse-item
                        v-for="(item, index) in list"
                        v-bind:title="item.Tuse_content"
                        v-bind:name="index"
                        v-bind:key="index"
                        >
                    <el-tag type="success">维修金额：{{item.Tuse_hezhunAmount}}</el-tag>
                    <el-tag type="success">维修范围：{{item.Tuse_fentanHouse}}</el-tag>
                    <el-tag type="success">分摊金额：{{item.TuseHouse_sumAmount}}</el-tag>
                    <el-tag type="success">现金分摊：{{item.TuseHouse_XJfentan}}</el-tag>
                    <el-button type="danger" plain @click="openDialog(item)" class="vote_list_btn">点击投票</el-button>
                </el-collapse-item>
            </el-collapse>
        </el-col>
        <el-dialog title="请选择投票" :visible.sync="dialogFormVisible" custom-class="vote_list_dialog" center>
            <el-form :model="voteForm" :rules="voteFormRules" ref="voteForm">
                <el-form-item label="选项" prop="agree">
                    <el-radio-group v-model="voteForm.agree">
                    <el-radio label="1">同意</el-radio>
                    <el-radio label="0">不同意</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('voteForm')">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
import {fetchList, doVote} from '@/api/vote'
import {getUser} from '@/utils/auth'

export default {
  name: 'VoteList',
  inject: ['reload'],
  data () {
    return {
      activeName: [0],
      list: null,
      id: '',
      loginType: '',
      item: null,
      dialogFormVisible: false,
      voteForm: {
        agree: ''
      },
      voteFormRules: {
        agree: [
          { required: true, message: '请选择是否同意', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      const userInfo = getUser()
      this.id = userInfo.uid
      this.loginType = userInfo.loginType
      fetchList(userInfo.uid).then(response => {
        this.list = response.list
      })
    },
    openDialog (item) {
      this.voteForm.agree = ''
      this.dialogFormVisible = true
      this.item = item
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          let way = 1
          switch (this.loginType) {
            case 'card':
              way = 1
              break
            case 'mobile':
              way = 2
              break
            case 'wx':
              way = 3
              break
            case 'msg':
              way = 4
              break
          }
          const data = {
            TuseHouse_id: this.item.TuseHouse_id,
            TuseVote_value: this.agree,
            TuseVote_way: way,
            TuseVote_wayCode: this.id,
            TuseVote_man: this.item.Taccount_name
          }
          doVote(data).then(response => {
            const data = response
            if (data.code === 200) {
              this.$message({
                message: '投票成功',
                type: 'success',
                center: true
              })
              this.reload()
            } else {
              this.$message({
                message: '投票失败，请重试',
                type: 'error',
                center: true
              })
            }
          })
        } else {
          this.$message({
            message: '请选择是否同意！',
            type: 'error',
            center: true
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
    .vote_list_btn{
        float: right;
        margin-top: 5px;
    }
    .el-collapse-item__header{
        font-size: 16px;
    }
    .el-collapse-item__content span{
        margin-bottom: 8px;
    }
    @media only screen and (max-width: 767px){
        .vote_list_dialog {
            width: 75% !important;
        }
    }
</style>
